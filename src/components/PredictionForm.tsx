'use client';

import { useState } from 'react';

interface PredictionFormProps {
  availableTeams: string[];
  onPredict: (team1: string, team2: string, predictionType: string) => void;
  isLoading: boolean;
}

export function PredictionForm({ availableTeams, onPredict, isLoading }: PredictionFormProps) {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [predictionType, setPredictionType] = useState('basic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Debug: log available teams and user input
    console.log('Available teams:', availableTeams);
    console.log('User input - Team 1:', team1);
    console.log('User input - Team 2:', team2);
    
    // Check if the entered team names exist in the available teams (case-insensitive)
    const team1Match = availableTeams.find(team => 
      team.toLowerCase().trim() === team1.toLowerCase().trim()
    );
    const team2Match = availableTeams.find(team => 
      team.toLowerCase().trim() === team2.toLowerCase().trim()
    );
    
    console.log('Team 1 match found:', team1Match);
    console.log('Team 2 match found:', team2Match);
    
    if (team1Match && team2Match && team1Match !== team2Match) {
      onPredict(team1Match, team2Match, predictionType);
    } else if (!team1Match || !team2Match) {
      alert(`Please enter valid Premier League team names. Available teams include: ${availableTeams.slice(0, 5).join(', ')}, etc.`);
    } else if (team1Match === team2Match) {
      alert('Please enter two different teams.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Enter Teams
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Type Premier League team names to compare
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Prediction Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Prediction Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPredictionType('basic')}
              className={`p-4 rounded-xl border-2 transition-all ${
                predictionType === 'basic'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="text-left">
                <div className="font-semibold text-gray-800 dark:text-white">Basic</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Passing stats analysis
                </div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setPredictionType('advanced')}
              className={`p-4 rounded-xl border-2 transition-all ${
                predictionType === 'advanced'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="text-left">
                <div className="font-semibold text-gray-800 dark:text-white">Advanced</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Multi-metric analysis
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Team Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Team 1
            </label>
            <input
              type="text"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              placeholder="Type team name..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Team 2
            </label>
            <input
              type="text"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              placeholder="Type team name..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Available Teams Helper */}
        {availableTeams.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Available Teams:
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {availableTeams.slice(0, 10).join(', ')}
              {availableTeams.length > 10 && `, ... and ${availableTeams.length - 10} more`}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!team1 || !team2 || isLoading}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-700 hover:to-blue-700 transition-all"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </div>
          ) : (
            'Predict Match Outcome'
          )}
        </button>

        {/* Match Preview */}
        {team1 && team2 && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800 dark:text-white">
                {team1} vs {team2}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {predictionType === 'basic' ? 'Basic' : 'Advanced'} Analysis
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}