from http.server import BaseHTTPRequestHandler
import json
import random
import requests
from bs4 import BeautifulSoup
import pandas as pd
from io import StringIO


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            team1 = data.get('team1')
            team2 = data.get('team2')
            prediction_type = data.get('prediction_type', 'basic')
            
            if not team1 or not team2:
                raise ValueError("Both teams must be specified")
            
            if team1 == team2:
                raise ValueError("Teams must be different")
            
            # Create prediction with real data (fallback to mock if needed)
            result = self.create_prediction_with_real_data(team1, team2, prediction_type)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())
            
        except Exception as e:
            error_result = {
                "success": False,
                "error": str(e),
                "teams": [team1 if 'team1' in locals() else "", team2 if 'team2' in locals() else ""],
                "prediction_type": prediction_type if 'prediction_type' in locals() else "basic"
            }
            
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(error_result).encode())

    def get_real_team_data(self):
        """Scrape real Premier League team data from FBref."""
        try:
            # Use requests with headers to avoid being blocked
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            
            url = "https://fbref.com/en/comps/9/passing/Premier-League-Stats"
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            
            # Parse with pandas
            dfs = pd.read_html(StringIO(response.text), match="Squad")
            if not dfs:
                return None
                
            df = dfs[0]
            
            # Handle multi-level columns
            if isinstance(df.columns, pd.MultiIndex):
                # Flatten multi-index columns
                df.columns = ['_'.join(col).strip() if isinstance(col, tuple) else col for col in df.columns]
            
            # Clean column names
            rename_map = {}
            for col in df.columns:
                if 'Squad' in col and 'Unnamed' in col:
                    rename_map[col] = 'Squad'
                elif 'Cmp%' in col and 'Total' in col:
                    rename_map[col] = 'Passing_Accuracy'
                elif 'Ast' in col and 'Unnamed' in col:
                    rename_map[col] = 'Assists'
                elif 'PrgP' in col and 'Unnamed' in col:
                    rename_map[col] = 'Progressive_Passes'
                elif 'Cmp' in col and 'Total' in col:
                    rename_map[col] = 'Completed_Passes'
            
            df = df.rename(columns=rename_map)
            
            # Convert numeric columns
            numeric_cols = ['Passing_Accuracy', 'Assists', 'Progressive_Passes', 'Completed_Passes']
            for col in numeric_cols:
                if col in df.columns:
                    df[col] = pd.to_numeric(df[col], errors='coerce')
            
            return df
            
        except Exception as e:
            print(f"Error scraping data: {e}")
            return None

    def find_team_match(self, team_name, df):
        """Find team name in DataFrame with fuzzy matching."""
        if df is None or 'Squad' not in df.columns:
            return None
            
        team_name_lower = team_name.lower()
        
        # Try exact match first
        exact_match = df[df['Squad'].str.lower() == team_name_lower]
        if not exact_match.empty:
            return exact_match.iloc[0]
        
        # Try partial match
        partial_match = df[df['Squad'].str.lower().str.contains(team_name_lower, na=False)]
        if not partial_match.empty:
            return partial_match.iloc[0]
        
        # Common team name mappings
        name_mappings = {
            'man city': 'Manchester City',
            'man utd': 'Manchester Utd',
            'man united': 'Manchester Utd',
            'tottenham': 'Tottenham',
            'spurs': 'Tottenham',
            'arsenal': 'Arsenal',
            'chelsea': 'Chelsea',
            'liverpool': 'Liverpool',
            'brighton': 'Brighton',
            'newcastle': 'Newcastle Utd',
            'west ham': 'West Ham',
            'aston villa': 'Aston Villa',
            'crystal palace': 'Crystal Palace',
            'fulham': 'Fulham',
            'wolves': 'Wolves',
            'everton': 'Everton',
            'brentford': 'Brentford',
            'nottingham forest': "Nott'ham Forest",
            'forest': "Nott'ham Forest",
            'luton': 'Luton Town',
            'burnley': 'Burnley',
            'sheffield united': 'Sheffield Utd',
            'sheffield utd': 'Sheffield Utd'
        }
        
        mapped_name = name_mappings.get(team_name_lower)
        if mapped_name:
            mapped_match = df[df['Squad'].str.lower() == mapped_name.lower()]
            if not mapped_match.empty:
                return mapped_match.iloc[0]
        
        return None

    def create_prediction_with_real_data(self, team1, team2, prediction_type):
        """Create prediction using real data, fallback to mock if needed."""
        
        # Try to get real data
        df = self.get_real_team_data()
        
        if df is not None:
            team1_data = self.find_team_match(team1, df)
            team2_data = self.find_team_match(team2, df)
            
            if team1_data is not None and team2_data is not None:
                return self.create_real_prediction(team1, team2, team1_data, team2_data, prediction_type)
        
        # Fallback to mock data
        return self.create_mock_prediction(team1, team2, prediction_type)

    def create_real_prediction(self, team1, team2, team1_data, team2_data, prediction_type):
        """Create prediction using real team data."""
        
        comparisons = []
        team1_score = 0
        team2_score = 0
        
        # Basic prediction metrics
        basic_metrics = {
            'Passing_Accuracy': 'Passing Accuracy (%)',
            'Progressive_Passes': 'Progressive Passes',
            'Assists': 'Assists'
        }
        
        # Advanced prediction includes more metrics
        if prediction_type == 'advanced':
            metrics_to_use = basic_metrics
        else:
            metrics_to_use = {k: v for k, v in basic_metrics.items() if k in ['Passing_Accuracy', 'Progressive_Passes']}
        
        # Compare teams on each metric
        for metric_key, metric_name in metrics_to_use.items():
            if metric_key in team1_data and metric_key in team2_data:
                team1_val = float(team1_data[metric_key]) if pd.notna(team1_data[metric_key]) else 0
                team2_val = float(team2_data[metric_key]) if pd.notna(team2_data[metric_key]) else 0
                
                if team1_val > team2_val:
                    winner = team1
                    team1_score += 1
                elif team2_val > team1_val:
                    winner = team2
                    team2_score += 1
                else:
                    winner = "Draw"
                
                comparisons.append({
                    "metric": metric_name,
                    "team1_value": round(team1_val, 1),
                    "team2_value": round(team2_val, 1),
                    "winner": winner
                })
        
        # Determine overall winner
        if team1_score > team2_score:
            predicted_winner = team1
            final_team1_score = 2.1
            final_team2_score = 1.0
        elif team2_score > team1_score:
            predicted_winner = team2
            final_team1_score = 1.0
            final_team2_score = 2.1
        else:
            predicted_winner = "Draw"
            final_team1_score = 1.5
            final_team2_score = 1.5
        
        # Create stats summary
        stats_summary = []
        for team_name, team_data in [(team1, team1_data), (team2, team2_data)]:
            team_stats = {"Squad": team_name}
            for metric_key, metric_name in basic_metrics.items():
                if metric_key in team_data:
                    val = team_data[metric_key]
                    team_stats[metric_key] = float(val) if pd.notna(val) else 0
            stats_summary.append(team_stats)
        
        return {
            "success": True,
            "prediction_type": prediction_type,
            "teams": [team1, team2],
            "predicted_winner": predicted_winner,
            "team1_score": final_team1_score,
            "team2_score": final_team2_score,
            "comparisons": comparisons,
            "stats_summary": stats_summary,
            "disclaimer": "Prediction based on current Premier League season statistics from FBref.com. Results are for entertainment purposes only."
        }

    def create_mock_prediction(self, team1, team2, prediction_type):
        """Create a mock prediction result as fallback."""
        
        # Set random seed based on team names for consistency
        seed_value = hash(f"{team1.lower()}{team2.lower()}{prediction_type}") % 1000000
        random.seed(seed_value)
        
        # Generate consistent scores based on seed
        team1_score = round(random.uniform(0.5, 3.0), 1)
        team2_score = round(random.uniform(0.5, 3.0), 1)
        
        # Determine winner
        if team1_score > team2_score:
            predicted_winner = team1
        elif team2_score > team1_score:
            predicted_winner = team2
        else:
            predicted_winner = "Draw"
        
        # Create mock comparisons
        if prediction_type == 'basic':
            comparisons = [
                {
                    "metric": "Passing Accuracy",
                    "team1_value": round(random.uniform(70, 90), 1),
                    "team2_value": round(random.uniform(70, 90), 1),
                    "winner": random.choice([team1, team2])
                },
                {
                    "metric": "Progressive Passes",
                    "team1_value": round(random.uniform(50, 120), 1),
                    "team2_value": round(random.uniform(50, 120), 1),
                    "winner": random.choice([team1, team2])
                }
            ]
        else:  # advanced
            comparisons = [
                {
                    "metric": "Passing Accuracy",
                    "team1_value": round(random.uniform(70, 90), 1),
                    "team2_value": round(random.uniform(70, 90), 1),
                    "winner": random.choice([team1, team2])
                },
                {
                    "metric": "Progressive Passes",
                    "team1_value": round(random.uniform(50, 120), 1),
                    "team2_value": round(random.uniform(50, 120), 1),
                    "winner": random.choice([team1, team2])
                },
                {
                    "metric": "Assists",
                    "team1_value": round(random.uniform(10, 25), 1),
                    "team2_value": round(random.uniform(10, 25), 1),
                    "winner": random.choice([team1, team2])
                }
            ]
        
        # Mock stats summary
        stats_summary = [
            {
                "Squad": team1,
                "Passing_Accuracy": round(random.uniform(75, 90), 1),
                "Progressive_Passes": round(random.uniform(60, 100), 0),
                "Assists": round(random.uniform(12, 20), 1)
            },
            {
                "Squad": team2,
                "Passing_Accuracy": round(random.uniform(75, 90), 1),
                "Progressive_Passes": round(random.uniform(60, 100), 0),
                "Assists": round(random.uniform(12, 20), 1)
            }
        ]
        
        # Reset random seed
        random.seed()
        
        return {
            "success": True,
            "prediction_type": prediction_type,
            "teams": [team1, team2],
            "predicted_winner": predicted_winner,
            "team1_score": team1_score,
            "team2_score": team2_score,
            "comparisons": comparisons,
            "stats_summary": stats_summary,
            "disclaimer": "This is a demonstration using mock data. Real predictions would require current Premier League statistics."
        }