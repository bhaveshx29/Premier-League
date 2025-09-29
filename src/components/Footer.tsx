export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="text-2xl">⚽</div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Premier League Predictor
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Predicting match outcomes using real-time statistics from FBref.com
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Built with Next.js and Python</p>
            <p className="mt-2">
              Data sourced from{' '}
              <a 
                href="https://fbref.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
              >
                FBref.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}