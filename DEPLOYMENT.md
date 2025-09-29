# Deployment Guide - Full Vercel Deployment

## 🚀 One-Click Vercel Deployment

This project is configured to deploy both frontend (Next.js) and backend (Python serverless functions) entirely on Vercel!

### Step-by-Step Deployment

#### 1. Push to GitHub
```bash
git add .
git commit -m "Premier League Predictor ready for deployment"
git push origin main
```

#### 2. Deploy to Vercel
1. Visit [Vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Vercel will automatically detect:
   - Next.js frontend
   - Python serverless functions in `/api`
5. Click "Deploy"

That's it! Vercel handles everything:
- ✅ Frontend build and deployment
- ✅ Python backend as serverless functions
- ✅ Automatic HTTPS
- ✅ Global CDN distribution

### How It Works

#### Frontend (Next.js)
- Deployed as static pages with server-side rendering
- Tailwind CSS for styling
- React components for interactive UI

#### Backend (Python Serverless Functions)
- `/api/teams` - Get available Premier League teams
- `/api/predict` - POST endpoint for predictions
- `/api/predict/basic/team1/team2` - GET endpoint for basic predictions
- `/api/predict/advanced/team1/team2` - GET endpoint for advanced predictions

#### Key Features
- **Real-time Data**: Scrapes live stats from FBref.com
- **Serverless**: Python functions auto-scale with demand
- **No Server Management**: Vercel handles all infrastructure
- **Fast Cold Starts**: Optimized for quick response times

## 🛠️ Project Structure

```
premier-league-predictor/
├── api/                   # Python serverless functions
│   ├── index.py          # Main API handler
│   └── predictor.py      # Prediction algorithms
├── src/                  # Next.js frontend
│   ├── app/             # App router pages
│   └── components/      # React components
├── requirements.txt     # Python dependencies
├── package.json        # Node.js dependencies
├── vercel.json         # Vercel configuration
└── README.md
```

## 🔧 Environment Variables

Since both frontend and backend run on the same domain, no environment variables are needed! The frontend calls `/api/*` endpoints directly.

## 📊 API Endpoints

All endpoints are automatically available at your Vercel domain:

### Get Teams
```http
GET https://your-app.vercel.app/api/teams
```

### Predict Match
```http
POST https://your-app.vercel.app/api/predict
Content-Type: application/json

{
  "team1": "Manchester City",
  "team2": "Liverpool",
  "prediction_type": "advanced"
}
```

### Quick Predictions
```http
GET https://your-app.vercel.app/api/predict/basic/Manchester%20City/Liverpool
GET https://your-app.vercel.app/api/predict/advanced/Arsenal/Chelsea
```

## ⚡ Performance Benefits

### Vercel Advantages:
- **Edge Network**: Functions run close to users globally
- **Auto-scaling**: Handles traffic spikes automatically
- **Zero Configuration**: No server setup required
- **Built-in Analytics**: Monitor performance and usage
- **Instant Rollbacks**: Easy to revert deployments

### Cold Start Optimization:
- Lightweight function code
- Efficient package imports
- Smart caching strategies
- Fallback data for quick responses

## 🧪 Testing Your Deployment

1. Visit your Vercel app URL
2. Test the team selection
3. Try both Basic and Advanced predictions
4. Check browser console for any errors
5. Monitor Vercel function logs for backend issues

## 🚨 Troubleshooting

### Common Issues:

**Functions Timeout:**
- Selenium can be slow on first run
- Vercel functions have 10s timeout (hobby) / 60s (pro)
- Consider upgrading to Vercel Pro for longer timeouts

**Chrome/Selenium Issues:**
- Vercel includes Chrome automatically for Python functions
- If issues persist, functions fall back to static team lists

**Build Failures:**
- Check that all files are committed to Git
- Verify Python dependencies in requirements.txt
- Ensure Next.js builds locally first

### Vercel Function Limits:
- **Hobby Plan**: 10s timeout, 1024MB memory
- **Pro Plan**: 60s timeout, 3008MB memory
- **Enterprise**: Custom limits

## 📈 Monitoring

Use Vercel's built-in tools:
1. **Functions Tab**: Monitor serverless function performance
2. **Analytics**: Track page views and user behavior  
3. **Runtime Logs**: Debug backend issues
4. **Real User Monitoring**: Track actual user experience

## 🔮 Scaling Considerations

### For High Traffic:
1. **Upgrade to Vercel Pro**: Better function limits
2. **Implement Caching**: Cache scraped data for faster responses  
3. **Database Integration**: Store team stats in database
4. **Rate Limiting**: Prevent API abuse
5. **CDN Optimization**: Leverage Vercel's global CDN

### Future Enhancements:
- **Background Jobs**: Pre-scrape data with cron functions
- **Webhooks**: Real-time data updates
- **Database**: PostgreSQL or MongoDB integration
- **Authentication**: User accounts and prediction history

## 💰 Cost Estimation

### Vercel Pricing:
- **Hobby (Free)**: 
  - 100GB bandwidth/month
  - 100 function invocations/day
  - Perfect for personal projects

- **Pro ($20/month)**:
  - 1TB bandwidth/month  
  - 1000 function invocations/day
  - Better for production apps

### Expected Usage:
- Each prediction = ~2-3 function calls
- ~50 predictions/day = ~150 function calls
- Should fit well within free tier limits

## 🎉 Success!

Your Premier League Predictor is now live with:
- ⚽ Real-time Premier League predictions
- 🌍 Global availability via Vercel's CDN
- 📱 Mobile-responsive design
- 🚀 Serverless auto-scaling architecture
- 💰 Cost-effective hosting solution

Share your live app and start predicting Premier League matches!