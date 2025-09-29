'use client';

import { useState } from 'react';
import { PredictionForm } from '@/components/PredictionForm';
import { PredictionResult } from '@/components/PredictionResult';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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

export default function Home() {
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrediction = async (team1: string, team2: string) => {
    setIsLoading(true);
    setPredictionData(null);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team1,
          team2,
          prediction_type: 'advanced',
        }),
      });

      const data = await response.json();
      setPredictionData(data);
    } catch (error) {
      console.error('Prediction failed:', error);
      setPredictionData({
        success: false,
        error: 'Failed to connect to prediction service. Please try again.',
        prediction_type: 'advanced',
        teams: [team1, team2],
        predicted_winner: '',
        team1_score: 0,
        team2_score: 0,
        comparisons: [],
        stats_summary: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-gradient-to-r from-purple-400/10 to-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <Header />
      
      <main className="relative container mx-auto px-3 md:px-4 py-6 md:py-12">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4 md:space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full border border-gray-200 dark:border-gray-700">
              <div className="w-2.5 md:w-3 h-2.5 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                AI-POWERED PREDICTIONS
              </span>
              <div className="w-2.5 md:w-3 h-2.5 md:h-3 bg-blue-500 rounded-full animate-pulse delay-500"></div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight px-4">
              Premier League
              <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Match Predictor
              </span>
            </h1>
            
            <p className="text-base md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Harness the power of advanced analytics to predict Premier League match outcomes with precision
            </p>

            {/* Feature Highlights */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-6 md:mt-8 px-4">
              <div className="inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 rounded-full">
                <span className="text-green-600 dark:text-green-400 text-sm md:text-base">📊</span>
                <span className="text-xs md:text-sm font-medium text-green-800 dark:text-green-200">Real-time Stats</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/20 rounded-full">
                <span className="text-blue-600 dark:text-blue-400 text-sm md:text-base">🤖</span>
                <span className="text-xs md:text-sm font-medium text-blue-800 dark:text-blue-200">AI Analysis</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/20 rounded-full">
                <span className="text-purple-600 dark:text-purple-400 text-sm md:text-base">⚡</span>
                <span className="text-xs md:text-sm font-medium text-purple-800 dark:text-purple-200">Instant Results</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Prediction Form Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl shadow-2xl p-4 md:p-8 border border-gray-200/50 dark:border-gray-700/50">
                <PredictionForm
                  onPredict={handlePrediction}
                  isLoading={isLoading}
                />
              </div>
            </div>

            {/* Results Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl shadow-2xl p-4 md:p-8 border border-gray-200/50 dark:border-gray-700/50 min-h-[300px] md:min-h-[400px]">
                {isLoading && (
                  <div className="text-center py-12 md:py-16 space-y-4 md:space-y-6">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-12 md:h-16 w-12 md:w-16 border-4 border-gray-200 dark:border-gray-700 mx-auto"></div>
                      <div className="animate-spin rounded-full h-12 md:h-16 w-12 md:w-16 border-t-4 border-green-600 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-base md:text-lg font-semibold text-gray-800 dark:text-white">
                        Analyzing Match Data
                      </p>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 px-4">
                        Processing team statistics and performance metrics...
                      </p>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <div className="w-2.5 md:w-3 h-2.5 md:h-3 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2.5 md:w-3 h-2.5 md:h-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2.5 md:w-3 h-2.5 md:h-3 bg-purple-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                )}

                {predictionData && !isLoading && (
                  <PredictionResult data={predictionData} />
                )}

                {!predictionData && !isLoading && (
                  <div className="text-center py-12 md:py-16 space-y-4 md:space-y-6">
                    <div className="text-5xl md:text-8xl opacity-20">⚽</div>
                    <div className="space-y-2">
                      <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
                        Ready for Analysis
                      </p>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-sm mx-auto px-4">
                        Enter two Premier League teams above to get detailed match predictions and statistical analysis
                      </p>
                    </div>
                    <div className="flex justify-center space-x-2 opacity-50">
                      <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                      <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-purple-400 rounded-full animate-pulse delay-700"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
