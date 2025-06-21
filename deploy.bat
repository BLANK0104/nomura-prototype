@echo off
echo Mumbai Beach Cleanup Platform - Deployment Script
echo ==================================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo Error: package.json not found. Run this script from the project root.
    pause
    exit /b 1
)

REM Initialize git if not already done
if not exist ".git" (
    echo Initializing Git repository...
    git init
    git branch -M main
)

REM Add all files
echo Adding files to git...
git add .

REM Check if there are changes to commit
git diff --staged --quiet >nul 2>&1
if %errorlevel% == 0 (
    echo No changes to commit
) else (
    REM Commit changes
    echo Committing changes...
    set /p commit_msg="Enter commit message (or press Enter for default): "
    if "%commit_msg%"=="" set commit_msg=Deploy Mumbai Beach Cleanup Platform
    git commit -m "%commit_msg%"
)

REM Check if remote origin exists
git remote | findstr "origin" >nul 2>&1
if %errorlevel% neq 0 (
    echo Please add your GitHub repository URL:
    set /p repo_url="Enter GitHub repository URL (https://github.com/username/repo.git): "
    git remote add origin "%repo_url%"
)

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin main

echo.
echo Deployment complete!
echo Your site will be available at:
echo   https://yourusername.github.io/nomura-prototype/
echo.
echo Next steps:
echo 1. Go to your GitHub repository
echo 2. Click Settings - Pages
echo 3. Select 'GitHub Actions' as source
echo 4. Wait for deployment to complete
pause
