@echo off
echo ========================================
echo  Push to GitHub - Elite International
echo ========================================
echo.
echo STEP 1: Make sure you created a NEW empty repository on GitHub
echo         URL: https://github.com/new
echo.
echo STEP 2: Enter your repository details below
echo.

set /p USERNAME="Enter your GitHub username (proloypoddar): "
set /p REPONAME="Enter repository name (e.g., elite-international-website): "

echo.
echo ========================================
echo  Connecting to GitHub...
echo ========================================
echo.

git remote add origin https://github.com/%USERNAME%/%REPONAME%.git
git branch -M main
git push -u origin main

echo.
echo ========================================
echo  Done! Check your repository at:
echo  https://github.com/%USERNAME%/%REPONAME%
echo ========================================
echo.
pause
