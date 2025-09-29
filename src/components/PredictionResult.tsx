import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TeamStats {
  Squad: string;
  [key: string]: string | number;
}

interface PredictionData {
  success: boolean;
  prediction_type: string;
  teams: string[];
  predicted_winner: string;
  team1_score: number;
  team2_score: number;
  comparisons: Array<{
    metric: string;
    team1_value: number;
    team2_value: number;
    winner: string;
  }>;
  stats_summary: TeamStats[];
  disclaimer?: string;
  error?: string;
}

interface PredictionResultProps {
  data: PredictionData;
}

export function PredictionResult({ data }: PredictionResultProps) {
  if (!data.success) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-center text-destructive">
            Prediction Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl">❌</div>
            <p className="text-muted-foreground">
              {data.error || 'An error occurred during prediction'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const [team1, team2] = data.teams;
  const isWinnerTeam1 = data.predicted_winner === team1;
  const isWinnerTeam2 = data.predicted_winner === team2;
  const isDraw = data.predicted_winner === 'Draw';
  
  return (
    <div className="space-y-6">
      {/* Results Header */}
      <Card>
        <CardHeader>
          <div className="text-center space-y-2">
            <Badge>Prediction Complete</Badge>
            <CardTitle>Match Analysis Results</CardTitle>
            <p className="text-muted-foreground">Advanced Multi-Metric Analysis</p>
          </div>
        </CardHeader>
      </Card>

      {/* Match Result */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4 items-center text-center">
            {/* Team 1 */}
            <div className={`p-4 rounded-lg ${isWinnerTeam1 ? 'bg-primary/10' : 'bg-muted'}`}>
              <div className="font-bold text-lg mb-2">{team1}</div>
              <div className="text-3xl font-bold">{data.team1_score}</div>
              {isWinnerTeam1 && <Badge className="mt-2">Winner 🏆</Badge>}
            </div>

            {/* VS Section */}
            <div className="space-y-2">
              <div className="text-4xl">{isDraw ? '🤝' : '⚽'}</div>
              <Badge variant="outline">VS</Badge>
            </div>

            {/* Team 2 */}
            <div className={`p-4 rounded-lg ${isWinnerTeam2 ? 'bg-primary/10' : 'bg-muted'}`}>
              <div className="font-bold text-lg mb-2">{team2}</div>
              <div className="text-3xl font-bold">{data.team2_score}</div>
              {isWinnerTeam2 && <Badge className="mt-2">Winner 🏆</Badge>}
            </div>
          </div>

          {/* Winner Announcement */}
          <div className="mt-6 text-center">
            <Badge variant={isDraw ? "secondary" : "default"} className="px-4 py-2 text-lg">
              {isDraw ? '🤝 Match Predicted as Draw' : `🏆 ${data.predicted_winner} Victory Predicted`}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Statistical Breakdown */}
      {data.comparisons && data.comparisons.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Statistical Breakdown</CardTitle>
            <p className="text-center text-muted-foreground">
              Head-to-head metric comparisons
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.comparisons.map((comparison, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="text-center font-semibold mb-4">{comparison.metric}</h4>
                
                <div className="grid grid-cols-3 gap-4 items-center text-center">
                  {/* Team 1 Stats */}
                  <div className={`p-3 rounded-lg ${
                    comparison.winner === team1 ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <div className="text-sm text-muted-foreground mb-1">{team1}</div>
                    <div className="text-xl font-bold">{comparison.team1_value}</div>
                  </div>

                  {/* Winner Badge */}
                  <div>
                    <Badge variant={comparison.winner === 'Draw' ? 'secondary' : 'default'}>
                      {comparison.winner === 'Draw' ? '🤝 Draw' : `👑 ${comparison.winner}`}
                    </Badge>
                  </div>

                  {/* Team 2 Stats */}
                  <div className={`p-3 rounded-lg ${
                    comparison.winner === team2 ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <div className="text-sm text-muted-foreground mb-1">{team2}</div>
                    <div className="text-xl font-bold">{comparison.team2_value}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Team Statistics */}
      {data.stats_summary && data.stats_summary.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Team Statistics Summary</CardTitle>
            <p className="text-center text-muted-foreground">
              Complete performance metrics
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.stats_summary.map((teamStats, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  <h4 className="text-xl font-bold">{teamStats.Squad}</h4>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.entries(teamStats).map(([key, value]) => {
                    if (key === 'Squad') return null;
                    return (
                      <div key={key} className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">
                          {key.replace(/_/g, ' ').toUpperCase()}
                        </div>
                        <div className="text-lg font-bold">
                          {typeof value === 'number' ? value.toFixed(1) : value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      {data.disclaimer && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">⚠️</div>
              <div>
                <div className="font-bold mb-2">Important Note</div>
                <div className="text-sm text-muted-foreground">{data.disclaimer}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}