export function Header() {
  return (
    <header className="relative bg-gradient-to-r from-green-600 via-blue-700 to-purple-700 shadow-xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 left-4 w-16 h-16 border-2 border-white rounded-full animate-pulse"></div>
        <div className="absolute top-4 right-8 w-12 h-12 border border-green-300 rounded-full animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-2 left-1/4 w-8 h-8 border border-blue-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-4 right-1/3 w-6 h-6 border border-purple-300 rounded-full animate-pulse delay-500"></div>
      </div>

      <nav className="relative container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className="text-3xl animate-bounce group-hover:animate-spin transition-all duration-500">⚽</div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                PL Predictor
              </span>
              <span className="text-xs text-green-200 opacity-80 font-medium tracking-wider">
                PREMIER LEAGUE
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-semibold text-white">
                AI-Powered Analytics
              </span>
              <span className="text-xs text-blue-200 opacity-90">
                Match Outcome Predictions
              </span>
            </div>
            
            {/* Decorative Element */}
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-400"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400"></div>
    </header>
  );
}