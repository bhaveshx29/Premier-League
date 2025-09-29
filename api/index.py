from http.server import BaseHTTPRequestHandler
import json
import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

from predictor import PremierLeaguePredictor

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = {"status": "healthy", "message": "Premier League Predictor API"}
            self.wfile.write(json.dumps(response).encode())
            
        elif self.path == '/api/teams':
            self.handle_teams()
            
        elif self.path.startswith('/api/predict/'):
            self.handle_prediction_get()
            
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

    def do_POST(self):
        if self.path == '/api/predict':
            self.handle_prediction_post()
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def handle_teams(self):
        try:
            predictor = PremierLeaguePredictor()
            result = predictor.get_available_teams()
            
            # If scraping failed, use fallback teams
            if not result.get('success', False):
                raise Exception("Scraping failed, using fallback")
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())
            
        except Exception as e:
            # Fallback teams list
            fallback_teams = [
                'Arsenal', 'Aston Villa', 'Brighton', 'Burnley', 'Chelsea', 
                'Crystal Palace', 'Everton', 'Fulham', 'Liverpool', 'Luton Town',
                'Manchester City', 'Manchester Utd', 'Newcastle Utd', 'Nottingham Forest',
                'Sheffield Utd', 'Tottenham', 'West Ham', 'Wolves', 'Bournemouth', 'Brentford'
            ]
            
            result = {"success": True, "teams": fallback_teams}
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())

    def handle_prediction_post(self):
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
            
            # Create mock prediction since web scraping doesn't work in Vercel
            result = self.create_mock_prediction(team1, team2, prediction_type)
            
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

    def handle_prediction_get(self):
        try:
            # Parse URL like /api/predict/basic/team1/team2 or /api/predict/advanced/team1/team2
            path_parts = self.path.split('/')
            if len(path_parts) < 6:
                raise ValueError("Invalid URL format")
            
            prediction_type = path_parts[3]  # basic or advanced
            team1 = path_parts[4].replace('%20', ' ')
            team2 = path_parts[5].replace('%20', ' ')
            
            predictor = PremierLeaguePredictor()
            
            if prediction_type == 'basic':
                result = predictor.basic_prediction([team1, team2])
            else:
                result = predictor.advanced_prediction([team1, team2])
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())
            
        except Exception as e:
            error_result = {
                "success": False,
                "error": str(e)
            }
            
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(error_result).encode())

    def create_mock_prediction(self, team1, team2, prediction_type):
        """Create a mock prediction result since web scraping doesn't work in Vercel."""
        import random
        
        # Generate mock scores
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
                    "metric": "Tackles Won",
                    "team1_value": round(random.uniform(10, 25), 1),
                    "team2_value": round(random.uniform(10, 25), 1),
                    "winner": random.choice([team1, team2])
                },
                {
                    "metric": "Saves",
                    "team1_value": round(random.uniform(2, 8), 1),
                    "team2_value": round(random.uniform(2, 8), 1),
                    "winner": random.choice([team1, team2])
                }
            ]
        
        # Mock stats summary
        stats_summary = [
            {
                "Squad": team1,
                "Passing_Acc": round(random.uniform(75, 90), 1),
                "Progressive_Passes": round(random.uniform(60, 100), 0),
                "Tackles_Won": round(random.uniform(12, 20), 1),
                "Saves": round(random.uniform(3, 7), 1)
            },
            {
                "Squad": team2,
                "Passing_Acc": round(random.uniform(75, 90), 1),
                "Progressive_Passes": round(random.uniform(60, 100), 0),
                "Tackles_Won": round(random.uniform(12, 20), 1),
                "Saves": round(random.uniform(3, 7), 1)
            }
        ]
        
        return {
            "success": True,
            "prediction_type": prediction_type,
            "teams": [team1, team2],
            "predicted_winner": predicted_winner,
            "team1_score": team1_score,
            "team2_score": team2_score,
            "comparisons": comparisons,
            "stats_summary": stats_summary,
            "disclaimer": "This is a mock prediction for demonstration purposes. Real predictions would use actual Premier League statistics from FBref.com."
        }