from http.server import BaseHTTPRequestHandler
import json
import random


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
            
            # Create mock prediction
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

    def create_mock_prediction(self, team1, team2, prediction_type):
        """Create a mock prediction result."""
        
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