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