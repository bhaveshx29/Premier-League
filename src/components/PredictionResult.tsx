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
  stats_summary: Array<Record<string, any>>;
  disclaimer?: string;
  error?: string;
}

interface PredictionResultProps {
  data: PredictionData;
}

export function PredictionResult({ data }: PredictionResultProps) {
  if (!data.success) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Prediction Error
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <div className="text-red-800 dark:text-red-200">
            {data.error || 'An error occurred during prediction'}
          </div>
        </div>
      </div>
    );
  }

  const [team1, team2] = data.teams;
  const winnerEmoji = data.predicted_winner === 'Draw' ? '🤝' : '🏆';
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Prediction Result
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {data.prediction_type === 'basic' ? 'Basic' : 'Advanced'} Analysis
        </p>
      </div>

      {/* Match Header */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-800 dark:text-white">
            {team1} vs {team2}
          </div>
        </div>
      </div>

      {/* Prediction Winner */}
      <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6">
        <div className="text-6xl mb-2">{winnerEmoji}</div>
        <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Predicted Winner: {data.predicted_winner}
        </div>
        <div className="text-gray-600 dark:text-gray-300">
          Score: {team1} {data.team1_score} - {data.team2_score} {team2}
        </div>
      </div>

      {/* Comparisons */}
      {data.comparisons && data.comparisons.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Metric Comparisons
          </h3>
          <div className="space-y-3">
            {data.comparisons.map((comparison, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4"
              >
                <div className="font-semibold text-gray-800 dark:text-white mb-2">
                  {comparison.metric}
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-300">{team1}</div>
                    <div className="text-lg font-semibold text-gray-800 dark:text-white">
                      {comparison.team1_value}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Winner
                    </div>
                    <div className={`text-lg font-bold ${
                      comparison.winner === team1
                        ? 'text-green-600 dark:text-green-400'
                        : comparison.winner === team2
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {comparison.winner}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-300">{team2}</div>
                    <div className="text-lg font-semibold text-gray-800 dark:text-white">
                      {comparison.team2_value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Summary */}
      {data.stats_summary && data.stats_summary.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Team Statistics
          </h3>
          <div className="grid gap-4">
            {data.stats_summary.map((teamStats, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4"
              >
                <div className="font-semibold text-lg text-gray-800 dark:text-white mb-3">
                  {teamStats.Squad}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(teamStats).map(([key, value]) => {
                    if (key === 'Squad') return null;
                    return (
                      <div key={key} className="text-center">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {key.replace(/_/g, ' ')}
                        </div>
                        <div className="text-lg font-semibold text-gray-800 dark:text-white">
                          {typeof value === 'number' ? value.toFixed(1) : value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      {data.disclaimer && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
          <div className="flex items-start space-x-2">
            <div className="text-yellow-600 dark:text-yellow-400 text-lg">⚠️</div>
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <div className="font-semibold mb-1">Important Note:</div>
              <div>{data.disclaimer}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}