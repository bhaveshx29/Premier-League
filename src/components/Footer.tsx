export function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-green-900 via-blue-900 to-purple-900 mt-8 md:mt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-2 md:top-4 left-2 md:left-4 w-4 md:w-8 h-4 md:h-8 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-6 md:top-12 right-4 md:right-8 w-2 md:w-4 h-2 md:h-4 bg-green-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-4 md:bottom-8 left-6 md:left-12 w-3 md:w-6 h-3 md:h-6 bg-blue-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 w-2.5 md:w-5 h-2.5 md:h-5 bg-purple-400 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-3 md:px-4 py-8 md:py-12">
        <div className="text-center space-y-4 md:space-y-6">
          {/* Logo Section */}
          <div className="flex items-center justify-center space-x-2 md:space-x-3">
            <div className="text-2xl md:text-4xl animate-pulse">⚽</div>
            <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Premier League Predictor
            </span>
          </div>

          {/* Attribution */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent h-px top-1/2"></div>
            <p className="relative text-base md:text-lg font-semibold text-white bg-gradient-to-r from-green-900 via-blue-900 to-purple-900 px-4 md:px-6 inline-block">
              Project made by{' '}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">
                Bhavesh Seechurn
              </span>
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center space-x-4 md:space-x-8 opacity-60">
            <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-blue-400 rounded-full animate-ping delay-300"></div>
            <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-purple-400 rounded-full animate-ping delay-700"></div>
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
    </footer>
  );
}