'use client';

import { useState, useEffect } from 'react';
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

  const handlePrediction = async (team1: string, team2: string, predictionType: string) => {
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
          prediction_type: predictionType,
        }),
      });

      const data = await response.json();
      setPredictionData(data);
    } catch (error) {
      console.error('Prediction failed:', error);
      setPredictionData({
        success: false,
        error: 'Failed to connect to prediction service. Please try again.',
        prediction_type: predictionType,
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white">
              Premier League
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {' '}Predictor
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Predict Premier League match outcomes using real-time stats and advanced analytics
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <PredictionForm
                onPredict={handlePrediction}
                isLoading={isLoading}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              {isLoading && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    Analyzing team stats...
                  </p>
                </div>
              )}

              {predictionData && !isLoading && (
                <PredictionResult data={predictionData} />
              )}

              {!predictionData && !isLoading && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <div className="text-6xl mb-4"></div>
                  <p>Select two teams to see the prediction</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
