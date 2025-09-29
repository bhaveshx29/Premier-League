from http.server import BaseHTTPRequestHandler
import json


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        try:
            # Return fallback teams list
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