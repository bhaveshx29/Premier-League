'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const premierLeagueTeams = [
  'Arsenal', 'Aston Villa', 'Bournemouth', 'Brentford', 'Brighton & Hove Albion',
  'Burnley', 'Chelsea', 'Crystal Palace', 'Everton', 'Fulham',
  'Liverpool', 'Luton Town', 'Manchester City', 'Manchester United', 'Newcastle United',
  'Nottingham Forest', 'Sheffield United', 'Tottenham Hotspur', 'West Ham United', 'Wolverhampton Wanderers'
];

interface PredictionFormProps {
  onPredict: (team1: string, team2: string) => void;
  isLoading: boolean;
}

export function PredictionForm({ onPredict, isLoading }: PredictionFormProps) {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (team1.trim() && team2.trim() && team1 !== team2) {
      onPredict(team1.trim(), team2.trim());
    }
  };

  const canPredict = team1.trim() && team2.trim() && team1 !== team2 && !isLoading;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Match Prediction</CardTitle>
        <p className="text-center text-muted-foreground">
          Select two Premier League teams to analyze
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team 1 Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">First Team</label>
            <select
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              disabled={isLoading}
              className="w-full p-3 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="">Select first team</option>
              {premierLeagueTeams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          {/* VS Divider */}
          <div className="flex items-center justify-center py-2">
            <Badge variant="outline" className="px-4 py-2">
              VS
            </Badge>
          </div>

          {/* Team 2 Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Second Team</label>
            <select
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              disabled={isLoading}
              className="w-full p-3 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="">Select second team</option>
              {premierLeagueTeams
                .filter(team => team !== team1)
                .map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
            </select>
          </div>

          {/* Match Preview */}
          {team1 && team2 && (
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <div className="text-center space-y-2">
                  <p className="font-semibold">{team1} vs {team2}</p>
                  <Badge>Premier League Analysis</Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!canPredict}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                ⚽ Predict Match
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}