# Git Repository Setup Instructions

## ✅ Current Status

Your project has been initialized as a Git repository with the initial commit completed.

## 📤 Upload to GitHub

### Step 1: Create a New GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name**: `elite-international-website` (or your preferred name)
   - **Description**: "Professional facility management website for Elite International Company"
   - **Visibility**: Choose Private or Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

### Step 2: Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# Verify the remote was added
git remote -v

# Push your code to GitHub
git branch -M main
git push -u origin main
```

### Example (replace with your actual details):
```bash
git remote add origin https://github.com/yourusername/elite-international-website.git
git branch -M main
git push -u origin main
```

## 🔐 Important Security Notes

### ⚠️ BEFORE PUSHING TO GITHUB

The `.env` file is already in `.gitignore` and will NOT be uploaded. This is correct!

**Never commit these files:**
- `.env` (contains sensitive credentials)
- `node_modules/` (too large, can be reinstalled)
- `.next/` (build artifacts)

### ✅ What IS included in the repository:
- `.env.example` (template without sensitive data)
- All source code
- Documentation files
- Public images
- Configuration files

## 📝 After Pushing to GitHub

### For Team Members / Deployment

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/REPO-NAME.git
   cd REPO-NAME
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your actual credentials
   # (Database URL, Cloudinary keys, SMTP settings, etc.)
   ```

4. **Set up the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

## 🔄 Making Changes

### Daily Workflow

```bash
# Check status
git status

# Add changes
git add .

# Commit with a message
git commit -m "Description of changes"

# Push to GitHub
git push
```

### Common Git Commands

```bash
# See commit history
git log --oneline

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Pull latest changes
git pull

# See differences
git diff
```

## 🌿 Recommended Branch Strategy

```bash
# Main branch (production-ready code)
main

# Development branch
git checkout -b development

# Feature branches
git checkout -b feature/new-service-page
git checkout -b fix/admin-login-bug
```

## 📊 Repository Settings (Optional)

### Protect Main Branch
1. Go to repository Settings → Branches
2. Add rule for `main` branch
3. Enable "Require pull request reviews before merging"

### Add Collaborators
1. Go to Settings → Collaborators
2. Click "Add people"
3. Enter GitHub username or email

## 🚀 Deployment Options

### Option 1: Vercel (Recommended for Next.js)
1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables from `.env`
4. Deploy!

### Option 2: Netlify
1. Go to [Netlify](https://netlify.com)
2. Connect to GitHub
3. Select your repository
4. Configure build settings
5. Add environment variables
6. Deploy!

### Option 3: Self-Hosted
- Use PM2 or similar process manager
- Set up Nginx as reverse proxy
- Configure SSL with Let's Encrypt
- Set environment variables on server

## 📞 Need Help?

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

## Quick Reference Card

```bash
# Initial setup (already done)
git init
git add .
git commit -m "Initial commit"

# Connect to GitHub (do this next)
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main

# Daily workflow
git add .
git commit -m "Your message"
git push
```

---

**Your repository is ready to be pushed to GitHub!** 🎉

Follow Step 2 above to connect and upload your code.
