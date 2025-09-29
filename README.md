# Premier League Match Predictor

A full-stack web application that predicts Premier League match outcomes using real-time statistics from FBref.com. Built with Next.js frontend and Python/FastAPI backend.

![Premier League Predictor](https://img.shields.io/badge/Premier%20League-Predictor-green)
![Next.js](https://img.shields.io/badge/Next.js-13+-black)
![Python](https://img.shields.io/badge/Python-3.11+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-teal)

## 🚀 Features

- **Two Prediction Modes:**
  - **Basic Prediction**: Uses passing statistics (completion rates, assists)
  - **Advanced Prediction**: Multi-metric analysis including passing, defense, and goalkeeping stats

- **Real-time Data**: Scrapes live Premier League statistics from FBref.com
- **Interactive UI**: Beautiful, responsive interface built with Tailwind CSS
- **Team Selection**: Easy dropdown selection for all Premier League teams
- **Detailed Analysis**: Shows metric-by-metric comparisons between teams
- **Mobile Responsive**: Optimized for all device sizes

## 🏗️ Architecture

```
premier-league-predictor/
├── api/                    # Python serverless functions (Vercel)
│   ├── index.py           # API request handler
│   └── predictor.py       # Prediction algorithms
├── src/                   # Next.js frontend
│   ├── app/              # App router pages
│   │   ├── page.tsx      # Main page
│   │   ├── layout.tsx    # App layout
│   │   └── globals.css   # Global styles
│   └── components/       # React components
│       ├── Header.tsx    # Site header
│       ├── Footer.tsx    # Site footer
│       ├── PredictionForm.tsx    # Team selection form
│       └── PredictionResult.tsx  # Results display
├── public/               # Static assets
├── requirements.txt      # Python dependencies
├── package.json         # Node.js dependencies
├── vercel.json          # Vercel configuration
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management

### Backend
- **Python 3.11+** - Serverless functions
- **Selenium** - Web scraping automation  
- **Pandas** - Data manipulation and analysis
- **BeautifulSoup** - HTML parsing
- **Vercel Functions** - Serverless runtime

### Deployment
- **Vercel** - Full-stack hosting (frontend + serverless functions)
- **Git** - Version control and automated deployments

## 📋 Prerequisites

- **Node.js 18+**
- **Python 3.11+**
- **Chrome Browser** (for Selenium)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/premier-league-predictor.git
cd premier-league-predictor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

**Note**: In development, the backend functions run as serverless functions locally via Vercel CLI or Next.js dev server.

## 🐳 Docker Development

Run the entire stack with Docker Compose:

```bash
docker-compose up --build
```

This will start:
- Backend API on `http://localhost:8000`
- Frontend app on `http://localhost:3000`

## 📊 API Endpoints

### Get Available Teams
```http
GET /teams
```

### Predict Match (POST)
```http
POST /predict
Content-Type: application/json

{
  "team1": "Manchester City",
  "team2": "Liverpool",
  "prediction_type": "advanced"
}
```

### Predict Match (GET)
```http
GET /predict/basic/Manchester%20City/Liverpool
GET /predict/advanced/Manchester%20City/Liverpool
```

## 🔧 Deployment - One-Click Vercel

### Deploy Everything to Vercel (Recommended)

This project deploys both frontend and backend entirely on Vercel using serverless functions!

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Visit [Vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Click "Deploy" (Vercel auto-detects Next.js + Python functions)
   - Done! Your app is live with both frontend and backend

### Architecture
- **Frontend**: Next.js (static + SSR)
- **Backend**: Python serverless functions in `/api` folder
- **Database**: None needed (scrapes live data)
- **Hosting**: 100% Vercel (no separate backend server required)

## 🎯 How It Works

### Basic Prediction Algorithm
1. Scrapes passing statistics from FBref.com
2. Compares teams on:
   - Pass completion percentage
   - Total assists
3. Assigns points to winner of each metric
4. Declares overall winner

### Advanced Prediction Algorithm
1. Scrapes multiple statistical tables:
   - Passing stats
   - Defensive actions
   - Goalkeeping stats
2. Compares teams on:
   - Assists (attacking creativity)
   - Progressive passes (attacking intent)
   - Tackles won (defensive strength)
   - Goalkeeper saves (shot stopping)
3. Multi-metric scoring system
4. Comprehensive analysis with disclaimer

## ⚠️ Important Notes

- **Data Accuracy**: Predictions are based on current season statistics
- **Limitations**: Cannot account for:
  - Current team form
  - Player injuries
  - Tactical matchups
  - Home/away advantage
  - Weather conditions
  - Referee decisions

- **Scraping Considerations**: 
  - Respects robots.txt
  - Uses reasonable delays
  - Headless browser automation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **FBref.com** - For providing detailed football statistics
- **Premier League** - For the amazing football content
- **Next.js Team** - For the fantastic React framework
- **FastAPI Team** - For the modern Python web framework

## 📞 Support

If you have any questions or issues, please:
1. Check the [Issues](https://github.com/yourusername/premier-league-predictor/issues) page
2. Create a new issue with detailed description
3. Contact: your-email@example.com

## 🔮 Future Enhancements

- [ ] Historical match data analysis
- [ ] Player-specific statistics
- [ ] Machine learning predictions
- [ ] Real-time match tracking
- [ ] Mobile app version
- [ ] Multi-league support
- [ ] User accounts and prediction history
- [ ] Social sharing features

---

Made with ⚽ and ❤️ for Premier League fans!
