#!/bin/bash
# Deployment script for Mumbai Beach Cleanup Platform

echo "🌊 Mumbai Beach Cleanup Platform - Deployment Script"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📁 Adding files to git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    # Commit changes
    echo "💾 Committing changes..."
    read -p "Enter commit message (or press Enter for default): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="Deploy Mumbai Beach Cleanup Platform"
    fi
    git commit -m "$commit_msg"
fi

# Check if remote origin exists
if ! git remote | grep -q "origin"; then
    echo "🔗 Please add your GitHub repository URL:"
    read -p "Enter GitHub repository URL (https://github.com/username/repo.git): " repo_url
    git remote add origin "$repo_url"
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your site will be available at:"
echo "   https://yourusername.github.io/nomura-prototype/"
echo ""
echo "📋 Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Click Settings → Pages"
echo "3. Select 'GitHub Actions' as source"
echo "4. Wait for deployment to complete"
