export function Header() {
  return (
    <header className="relative bg-gradient-to-r from-green-600 via-blue-700 to-purple-700 shadow-xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 left-4 w-8 md:w-16 h-8 md:h-16 border-2 border-white rounded-full animate-pulse"></div>
        <div className="absolute top-2 md:top-4 right-4 md:right-8 w-6 md:w-12 h-6 md:h-12 border border-green-300 rounded-full animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-1 md:bottom-2 left-1/4 w-4 md:w-8 h-4 md:h-8 border border-blue-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-2 md:bottom-4 right-1/3 w-3 md:w-6 h-3 md:h-6 border border-purple-300 rounded-full animate-pulse delay-500"></div>
      </div>

      <nav className="relative container mx-auto px-3 md:px-4 py-3 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 md:space-x-3 group">
            <div className="text-xl md:text-3xl animate-bounce group-hover:animate-spin transition-all duration-500">⚽</div>
            <div className="flex flex-col">
              <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                PL Predictor
              </span>
              <span className="text-xs md:text-xs text-green-200 opacity-80 font-medium tracking-wider">
                PREMIER LEAGUE
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs md:text-sm font-semibold text-white">
                AI-Powered Analytics
              </span>
              <span className="text-xs text-blue-200 opacity-90">
                Match Predictions
              </span>
            </div>
            
            {/* Mobile-friendly Decorative Element */}
            <div className="flex space-x-1">
              <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
              <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-purple-400 rounded-full animate-pulse delay-400"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400"></div>
    </header>
  );
}