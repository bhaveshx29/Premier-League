'use client';

import { useState } from 'react';

interface PredictionFormProps {
  onPredict: (team1: string, team2: string) => void;
  isLoading: boolean;
}

export function PredictionForm({ onPredict, isLoading }: PredictionFormProps) {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (team1.trim() && team2.trim() && team1.trim() !== team2.trim()) {
      onPredict(team1.trim(), team2.trim());
    } else if (!team1.trim() || !team2.trim()) {
      alert('Please enter both team names.');
    } else if (team1.trim() === team2.trim()) {
      alert('Please enter two different teams.');
    }
  };

  return (
    <div className="relative space-y-8">
      {/* Background Decorative Elements */}
      <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>

      <div className="relative text-center">
        <div className="inline-flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">⚽</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Match Predictor
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Enter two Premier League teams to analyze their potential matchup
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative space-y-6 md:space-y-8">

        {/* Team Selection */}
        <div className="space-y-4 md:space-y-6">
          <div className="text-center">
            <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
              Select Teams
            </h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Home Team
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={team1}
                  onChange={(e) => setTeam1(e.target.value)}
                  placeholder="Enter home team..."
                  className="w-full p-3 md:p-4 pl-10 md:pl-12 border-2 border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 text-sm md:text-base"
                  required
                />
                <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-green-500 text-sm md:text-base">
                  🏠
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Away Team
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={team2}
                  onChange={(e) => setTeam2(e.target.value)}
                  placeholder="Enter away team..."
                  className="w-full p-3 md:p-4 pl-10 md:pl-12 border-2 border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-sm md:text-base"
                  required
                />
                <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-sm md:text-base">
                  ✈️
                </div>
              </div>
            </div>
          </div>

          {/* VS Divider */}
          {team1 && team2 && (
            <div className="flex items-center justify-center my-4 md:my-6">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <div className="mx-3 md:mx-4 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs md:text-sm">VS</span>
              </div>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!team1 || !team2 || isLoading}
          className="w-full bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-3 md:py-4 px-6 md:px-8 rounded-2xl font-bold text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-700 hover:via-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2 md:space-x-3">
              <div className="w-4 md:w-5 h-4 md:h-5 border-2 md:border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm md:text-base">Analyzing Match Data...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm md:text-base">🔮</span>
              <span className="text-sm md:text-base">Predict Match Outcome</span>
              <span className="text-sm md:text-base">⚡</span>
            </div>
          )}
        </button>

        {/* Match Preview Card */}
        {team1 && team2 && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 md:p-6 border border-gray-200 dark:border-gray-600">
            <div className="text-center space-y-2 md:space-y-3">
              <div className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                {team1} vs {team2}
              </div>
              <div className="inline-flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 bg-white dark:bg-gray-800 rounded-full border">
                <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500"></div>
                <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                  Premier League Analysis
                </span>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}