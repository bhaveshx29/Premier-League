'use client';

import { useState } from 'react';
import { PredictionForm } from '@/components/PredictionForm';
import { PredictionResult } from '@/components/PredictionResult';
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
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            ⚽ AI-Powered Analysis
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Premier League
            <span className="block text-primary">Match Predictor</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced statistical analysis for Premier League match predictions
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Prediction Form */}
          <PredictionForm
            onPredict={handlePrediction}
            isLoading={isLoading}
          />

          {/* Results */}
          <div className="space-y-6">
            {isLoading && (
              <div className="flex flex-col items-center justify-center p-12 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <div className="text-center">
                  <p className="font-semibold">Analyzing Match Data</p>
                  <p className="text-sm text-muted-foreground">Processing team statistics...</p>
                </div>
              </div>
            )}

            {predictionData && !isLoading && (
              <PredictionResult data={predictionData} />
            )}

            {!predictionData && !isLoading && (
              <div className="flex flex-col items-center justify-center p-12 space-y-4 text-center">
                <div className="text-6xl opacity-20">⚽</div>
                <div>
                  <p className="font-semibold mb-2">Ready for Analysis</p>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Select two Premier League teams to get detailed match predictions
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            Project made by <span className="font-semibold">Bhavesh Seechurn</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
