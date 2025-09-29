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
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Prediction Error
          </h2>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 border-2 border-red-300 dark:border-red-700 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">!</span>
            </div>
            <div className="text-red-800 dark:text-red-200 font-medium">
              {data.error || 'An error occurred during prediction'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const [team1, team2] = data.teams;
  const winnerEmoji = data.predicted_winner === 'Draw' ? '🤝' : '🏆';
  const isWinnerTeam1 = data.predicted_winner === team1;
  const isWinnerTeam2 = data.predicted_winner === team2;
  const isDraw = data.predicted_winner === 'Draw';
  
  return (
    <div className="space-y-8">
      {/* Results Header */}
      <div className="text-center space-y-3 md:space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full">
          <div className="w-2.5 md:w-3 h-2.5 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
            PREDICTION COMPLETE
          </span>
          <div className="w-2.5 md:w-3 h-2.5 md:h-3 bg-blue-500 rounded-full animate-pulse delay-500"></div>
        </div>
        <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Match Analysis Results
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto px-4">
          {data.prediction_type === 'basic' ? 'Basic Statistical Analysis' : 'Advanced Multi-Metric Analysis'}
        </p>
      </div>

      {/* Match Visualization */}
      <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-4 md:p-8 border border-gray-200 dark:border-gray-600">
        <div className="absolute top-2 md:top-4 right-2 md:right-4 opacity-20 text-3xl md:text-6xl">⚽</div>
        
        <div className="grid grid-cols-3 gap-3 md:gap-6 items-center">
          {/* Team 1 */}
          <div className={`text-center p-3 md:p-4 rounded-2xl transition-all ${
            isWinnerTeam1 ? 'bg-gradient-to-br from-green-200 to-green-300 dark:from-green-800/50 dark:to-green-700/30 ring-2 md:ring-4 ring-green-400/50' : 'bg-white/50 dark:bg-gray-600/30'
          }`}>
            <div className={`text-sm md:text-2xl font-bold mb-1 md:mb-2 ${isWinnerTeam1 ? 'text-green-800 dark:text-green-200' : 'text-gray-800 dark:text-white'} break-words`}>
              {team1}
            </div>
            <div className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
              {data.team1_score}
            </div>
            {isWinnerTeam1 && (
              <div className="mt-1 md:mt-2 text-xs md:text-sm text-green-600 dark:text-green-400 font-semibold">
                WINNER 🏆
              </div>
            )}
          </div>

          {/* VS Section */}
          <div className="text-center">
            <div className="text-3xl md:text-6xl mb-1 md:mb-2">{winnerEmoji}</div>
            <div className="text-sm md:text-lg font-bold text-gray-600 dark:text-gray-400">
              VS
            </div>
          </div>

          {/* Team 2 */}
          <div className={`text-center p-3 md:p-4 rounded-2xl transition-all ${
            isWinnerTeam2 ? 'bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-800/50 dark:to-blue-700/30 ring-2 md:ring-4 ring-blue-400/50' : 'bg-white/50 dark:bg-gray-600/30'
          }`}>
            <div className={`text-sm md:text-2xl font-bold mb-1 md:mb-2 ${isWinnerTeam2 ? 'text-blue-800 dark:text-blue-200' : 'text-gray-800 dark:text-white'} break-words`}>
              {team2}
            </div>
            <div className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
              {data.team2_score}
            </div>
            {isWinnerTeam2 && (
              <div className="mt-1 md:mt-2 text-xs md:text-sm text-blue-600 dark:text-blue-400 font-semibold">
                WINNER 🏆
              </div>
            )}
          </div>
        </div>

        {/* Winner Announcement */}
        <div className={`mt-4 md:mt-6 text-center p-3 md:p-4 rounded-2xl ${
          isDraw ? 'bg-gradient-to-r from-yellow-200 to-orange-200 dark:from-yellow-800/30 dark:to-orange-800/20' :
          isWinnerTeam1 ? 'bg-gradient-to-r from-green-200 to-green-300 dark:from-green-800/30 dark:to-green-700/20' :
          'bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-800/30 dark:to-blue-700/20'
        }`}>
          <div className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white break-words">
            {isDraw ? '🤝 Match Predicted as Draw' : `🏆 ${data.predicted_winner} Victory Predicted`}
          </div>
        </div>
      </div>

      {/* Metric Comparisons */}
      {data.comparisons && data.comparisons.length > 0 && (
        <div className="space-y-4 md:space-y-6">
          <div className="text-center">
            <h3 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Statistical Breakdown
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 px-4">
              Head-to-head metric comparisons
            </p>
          </div>
          
          <div className="grid gap-3 md:gap-4">
            {data.comparisons.map((comparison, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-center mb-3 md:mb-4">
                  <h4 className="text-base md:text-lg font-bold text-gray-800 dark:text-white">
                    {comparison.metric}
                  </h4>
                </div>
                
                <div className="grid grid-cols-3 gap-3 md:gap-6 items-center">
                  {/* Team 1 Stats */}
                  <div className={`text-center p-3 md:p-4 rounded-xl ${
                    comparison.winner === team1 ? 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 ring-2 ring-green-400' : 'bg-gray-50 dark:bg-gray-700'
                  }`}>
                    <div className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 break-words">
                      {team1}
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white">
                      {comparison.team1_value}
                    </div>
                  </div>

                  {/* Winner Badge */}
                  <div className="text-center">
                    <div className={`inline-flex items-center px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold ${
                      comparison.winner === team1 ? 'bg-green-500 text-white' :
                      comparison.winner === team2 ? 'bg-blue-500 text-white' :
                      'bg-gray-400 text-white'
                    }`}>
                      <span className="mr-1">{comparison.winner === 'Draw' ? '🤝' : '👑'}</span>
                      <span className="hidden sm:inline">{comparison.winner}</span>
                      <span className="sm:hidden break-words">{comparison.winner.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Team 2 Stats */}
                  <div className={`text-center p-3 md:p-4 rounded-xl ${
                    comparison.winner === team2 ? 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/20 ring-2 ring-blue-400' : 'bg-gray-50 dark:bg-gray-700'
                  }`}>
                    <div className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 break-words">
                      {team2}
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white">
                      {comparison.team2_value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Statistics */}
      {data.stats_summary && data.stats_summary.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Detailed Team Statistics
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Complete performance metrics
            </p>
          </div>
          
          <div className="grid gap-6">
            {data.stats_summary.map((teamStats, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                    {teamStats.Squad}
                  </h4>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.entries(teamStats).map(([key, value]) => {
                    if (key === 'Squad') return null;
                    return (
                      <div key={key} className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-600">
                        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          {key.replace(/_/g, ' ').toUpperCase()}
                        </div>
                        <div className="text-lg font-bold text-gray-800 dark:text-white">
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
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">⚠️</span>
            </div>
            <div className="text-yellow-800 dark:text-yellow-200">
              <div className="font-bold text-lg mb-2">Important Note</div>
              <div className="text-sm leading-relaxed">{data.disclaimer}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}