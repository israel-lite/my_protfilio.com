# Vercel Deployment Guide

## 🚀 Deploy Your Portfolio to Vercel

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from project directory**
   ```bash
   cd /home/moses/my_protfilio.com
   vercel
   ```

4. **Follow prompts:**
   - Set up and deploy? → **Yes**
   - Which scope? → **Your Vercel account**
   - Link to existing project? → **No**
   - Project name? → **portfolio** (or your choice)
   - In which directory? → **./** (root)
   - Override settings? → **No**

### Option 2: Vercel Dashboard

1. **Go to** [vercel.com](https://vercel.com)
2. **Sign up/login** with your GitHub account
3. **Click "New Project"**
4. **Import your repository**: `my_protfilio.com`
5. **Configure settings:**
   - Framework Preset: **Other**
   - Root Directory: **./**
   - Build Command: *leave empty*
   - Output Directory: *leave empty*
6. **Click "Deploy"**

### 🎯 After Deployment

Your portfolio will be available at:
- `https://your-project-name.vercel.app`

### 📧 Update Contact Form

After deployment, update the contact form in `index.html`:
- Line 355: Change `israelite1804@gmail.com` if needed
- The mailto links will work automatically

### 🔄 Auto-Deployments

Vercel will automatically:
- Deploy when you push to GitHub
- Update your live site
- Provide HTTPS and CDN

### 🌐 Custom Domain (Optional)

1. In Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### ✅ Deployment Checklist

- [ ] All files pushed to GitHub
- [ ] `vercel.json` configuration present
- [ ] Contact form email is correct
- [ ] Project links point to correct repos
- [ ] Vintique demo link works: `https://vintique-one.vercel.app/`

### 🎉 Success!

Once deployed, you'll have:
- ✅ Professional portfolio live on Vercel
- ✅ HTTPS security
- ✅ Fast global CDN
- ✅ Automatic deployments
- ✅ Custom domain support

Your portfolio will be ready for employers and clients!
