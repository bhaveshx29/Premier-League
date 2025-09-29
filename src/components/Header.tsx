interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">⚽</div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              PL Predictor
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Real-time Premier League Analytics
          </div>
        </div>
      </nav>
    </header>
  );
}