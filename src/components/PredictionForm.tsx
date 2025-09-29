'use client';

import { useState } from 'react';

interface PredictionFormProps {
  onPredict: (team1: string, team2: string, predictionType: string) => void;
  isLoading: boolean;
}

export function PredictionForm({ onPredict, isLoading }: PredictionFormProps) {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [predictionType, setPredictionType] = useState('basic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (team1.trim() && team2.trim() && team1.trim() !== team2.trim()) {
      onPredict(team1.trim(), team2.trim(), predictionType);
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

      <form onSubmit={handleSubmit} className="relative space-y-8">
        {/* Prediction Type Selection */}
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
            Choose Analysis Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPredictionType('basic')}
              className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                predictionType === 'basic'
                  ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 shadow-lg shadow-green-200/50'
                  : 'border-gray-200 dark:border-gray-600 hover:border-green-300 bg-white dark:bg-gray-800'
              }`}
            >
              <div className="text-left space-y-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${predictionType === 'basic' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className="font-bold text-lg text-gray-800 dark:text-white">Basic Analysis</div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Focus on passing statistics and ball control
                </div>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                  ✓ Quick insights • Perfect for casual fans
                </div>
              </div>
              {predictionType === 'basic' && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={() => setPredictionType('advanced')}
              className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                predictionType === 'advanced'
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-800/20 shadow-lg shadow-blue-200/50'
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 bg-white dark:bg-gray-800'
              }`}
            >
              <div className="text-left space-y-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${predictionType === 'advanced' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                  <div className="font-bold text-lg text-gray-800 dark:text-white">Advanced Analysis</div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Comprehensive multi-metric statistical analysis
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  ✓ Deep insights • For serious analysts
                </div>
              </div>
              {predictionType === 'advanced' && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Team Selection */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Select Teams
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="w-full p-4 pl-12 border-2 border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500">
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
                  className="w-full p-4 pl-12 border-2 border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
                  ✈️
                </div>
              </div>
            </div>
          </div>

          {/* VS Divider */}
          {team1 && team2 && (
            <div className="flex items-center justify-center my-6">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <div className="mx-4 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">VS</span>
              </div>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!team1 || !team2 || isLoading}
          className="w-full bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-700 hover:via-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing Match Data...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>🔮</span>
              <span>Predict Match Outcome</span>
              <span>⚡</span>
            </div>
          )}
        </button>

        {/* Match Preview Card */}
        {team1 && team2 && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
            <div className="text-center space-y-3">
              <div className="text-xl font-bold text-gray-800 dark:text-white">
                {team1} vs {team2}
              </div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border">
                <div className={`w-3 h-3 rounded-full ${predictionType === 'basic' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {predictionType === 'basic' ? 'Basic Analysis Mode' : 'Advanced Analysis Mode'}
                </span>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}