export function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-green-900 via-blue-900 to-purple-900 mt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-12 right-8 w-4 h-4 bg-green-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-8 left-12 w-6 h-6 bg-blue-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-4 right-4 w-5 h-5 bg-purple-400 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          {/* Logo Section */}
          <div className="flex items-center justify-center space-x-3">
            <div className="text-4xl animate-pulse">⚽</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Premier League Predictor
            </span>
          </div>

          {/* Attribution */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent h-px top-1/2"></div>
            <p className="relative text-lg font-semibold text-white bg-gradient-to-r from-green-900 via-blue-900 to-purple-900 px-6 inline-block">
              Project made by{' '}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">
                Bhavesh Seechurn
              </span>
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center space-x-8 opacity-60">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping delay-300"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping delay-700"></div>
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
    </footer>
  );
}