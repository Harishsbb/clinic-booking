# Vercel Deployment Guide

## Quick Setup Steps

### Step 1: Deploy Backend to Railway

1.  **Create Service:**
    *   Click **"+ Create"** > **"GitHub Repo"**.
    *   Select your `clinic-booking` repo.
    *   **Immediately click the new card** to configure it.

2.  **Configure Build:**
    *   Go to **Settings** > **Build**.
    *   Set **Root Directory** to `/server`.
    *   *This is critical because your backend is in a subfolder.*

3.  **Configure Variables:**
    *   Go to **Variables**.
    *   Add the following (Railway will auto-fill the values if you use `${...}`):
        *   `PORT` = `5000`
        *   `DB_HOST` = `${MYSQLHOST}`
        *   `DB_USER` = `${MYSQLUSER}`
        *   `DB_PASSWORD` = `${MYSQLPASSWORD}`
        *   `DB_NAME` = `${MYSQLDATABASE}`
        *   `DB_PORT` = `${MYSQLPORT}`

4.  **Deploy:**
    *   The app should redeploy automatically. Wait for it to turn **Green**.
    *   Copy the **Public Domain** (e.g., `web-production-1234.up.railway.app`). You will need this for the frontend.

### Step 2: Deploy Frontend to Vercel

1. **Push code to GitHub** (if not already)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - **Root Directory**: Set to `client` ⚠️ IMPORTANT
   - **Framework Preset**: Create React App (auto-detected)
   - **Build Command**: `npm run build` (auto)
   - **Output Directory**: `build` (auto)

3. **Environment Variables** (in Vercel project settings → Environment Variables)
   - Add: `REACT_APP_API_URL` = `https://your-app.railway.app/api`
   - Replace `your-app.railway.app` with your actual Railway URL

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Copy your Vercel URL: `https://harish-ks-projects-091e87d3.vercel.app`

5. **Update Backend CORS**
   - Go back to Railway
   - Update `FRONTEND_URL` environment variable = your Vercel URL
   - Redeploy backend

### Alternative: Deploy via Vercel CLI

```bash
npm i -g vercel
cd client
vercel
# Follow prompts
# Set REACT_APP_API_URL when asked
```

## What's Already Configured

✅ `client/vercel.json` - Routing config for React Router  
✅ `client/src/services/api.js` - Uses `REACT_APP_API_URL` environment variable  
✅ `server/index.js` - CORS configured for production frontend URL  
✅ `.vercelignore` - Excludes server folder from frontend build

## Local Development

1. Backend: `cd server && npm start` (runs on port 5000)
2. Frontend: `cd client && npm start` (runs on port 3000)
3. Frontend automatically uses `http://localhost:5000/api` (hardcoded fallback)

## Troubleshooting

- **CORS errors**: Make sure `FRONTEND_URL` in Railway matches your Vercel URL
- **API not found**: Check `REACT_APP_API_URL` in Vercel environment variables
- **Build fails**: Check Vercel build logs, ensure Root Directory is set to `client`
