# 🔗 Connect GitHub to Shopify - Auto-Deploy Setup

This guide will connect your GitHub repository to Shopify so that any code changes automatically deploy to your store.

## 📋 Overview

**Repository**: https://github.com/thebestrendingnow/alignique-shopify-theme  
**Branch**: `master`  
**Shopify Store**: talktoshop.myshopify.com  
**Theme**: alignique-complete-final (ID: 192091423050)

## 🚀 Step-by-Step Setup

### Step 1: Go to Shopify Themes Page

1. Visit: https://talktoshop.myshopify.com/admin/themes
2. You should see your "alignique-complete-final" theme

### Step 2: Connect to GitHub

1. Find the **"alignique-complete-final"** theme
2. Click the **"⋮" (three dots)** menu
3. Select **"Connect from GitHub"**
4. A popup will appear titled **"Connect theme"**

### Step 3: Configure GitHub Connection

In the popup, you'll see options:

#### Account
- Select: **thebestrendingnow**

#### Repository
- Click **"Select"** dropdown
- Search for: `alignique-shopify-theme`
- Select it from the list

#### Branch
- Leave as default (should be `master` or `main`)

### Step 4: Complete Connection

1. Click **"Connect"** button
2. If prompted, authorize Shopify to access your GitHub repo
3. Wait for confirmation message: **"Theme connected successfully"**

### Step 5: Verify Connection

1. In the Themes page, you should now see a **GitHub icon** next to "alignique-complete-final"
2. It will show: **"Connected to GitHub: thebestrendingnow/alignique-shopify-theme"**

---

## ✅ What Happens Now?

### Automatic Deployments

Every time you push code to GitHub:

1. **Commit & Push**:
   ```bash
   git add .
   git commit -m "Update chatbot styling"
   git push origin master
   ```

2. **Shopify Auto-Deploys** (within 2-5 minutes)
   - Shopify detects the commit
   - Pulls latest code from GitHub
   - Updates your live theme
   - No manual upload needed!

### Manual Sync

If you want to force a sync:

1. Go to: https://talktoshop.myshopify.com/admin/themes
2. Click **"⋮"** next to your theme
3. Select **"Pull from GitHub"**
4. Latest code will deploy immediately

---

## 🔧 Local Development Workflow

### Option 1: Edit Locally + Auto-Deploy

```bash
# Clone the repo (if not already cloned)
git clone https://github.com/thebestrendingnow/alignique-shopify-theme.git
cd alignique-shopify-theme

# Make changes
nano assets/ai-chatbot.css

# Commit and push
git add .
git commit -m "Updated chatbot colors"
git push origin master

# Wait 2-5 minutes → Changes live on alignique.shop
```

### Option 2: Live Preview While Developing

```bash
# Start Shopify CLI dev server
shopify theme dev --store=talktoshop.myshopify.com

# Opens a preview URL like:
# https://talktoshop.myshopify.com?preview_theme_id=123456

# Edit files → Auto-reloads in browser
# When ready, commit and push to deploy live
```

---

## 📝 Example Workflow

### Scenario: Change Chatbot Welcome Message

1. **Edit the file**:
   ```bash
   cd alignique-shopify-theme
   nano assets/ai-chatbot.js
   ```

2. **Change this line**:
   ```javascript
   INITIAL_MESSAGE: "Hi! ✨ I'm your Alignique AI assistant!",
   ```
   to:
   ```javascript
   INITIAL_MESSAGE: "Welcome! 🌟 Find the perfect gift with AI help!",
   ```

3. **Save, commit, push**:
   ```bash
   git add assets/ai-chatbot.js
   git commit -m "Updated chatbot welcome message"
   git push origin master
   ```

4. **Wait 2-5 minutes**, then visit https://alignique.shop
5. **Clear cache** (Ctrl+Shift+R)
6. **Chat button now shows new message!**

---

## 🔍 Monitoring Deployments

### Check Deployment Status

1. Go to: https://github.com/thebestrendingnow/alignique-shopify-theme/commits/master
2. Look for:
   - ✅ **Green checkmark** = Deployed successfully
   - ⚠️ **Yellow dot** = Deployment in progress
   - ❌ **Red X** = Deployment failed

### View Shopify Theme Version

1. Go to: https://talktoshop.myshopify.com/admin/themes
2. Find your theme
3. Check **"Last updated"** timestamp
4. Should match your last GitHub commit time

---

## 🛠️ Troubleshooting

### Connection Not Working?

**Problem**: "Connect from GitHub" option not showing

**Solution**:
1. Make sure you're logged into GitHub
2. Refresh the Shopify themes page
3. Try a different browser (Chrome recommended)

---

### Deployments Not Happening?

**Problem**: Pushed code but theme not updating

**Solutions**:

1. **Check GitHub connection**:
   - Go to Themes page
   - Verify GitHub icon appears next to theme
   - If missing, reconnect

2. **Force sync**:
   - Click "⋮" menu
   - Select "Pull from GitHub"
   - Wait 30 seconds

3. **Check commit history**:
   - Visit: https://github.com/thebestrendingnow/alignique-shopify-theme/commits
   - Ensure your commit is there

4. **Clear browser cache**:
   - Press Ctrl+Shift+R (Windows)
   - Press Cmd+Shift+R (Mac)

---

### File Not Updating?

**Problem**: Changed a file but not seeing changes live

**Checklist**:
- [ ] Committed the file (`git add` + `git commit`)
- [ ] Pushed to GitHub (`git push origin master`)
- [ ] Waited 2-5 minutes for deploy
- [ ] Cleared browser cache
- [ ] Checked correct theme is live (not preview)

---

## 📊 Current Theme Structure

```
alignique-shopify-theme/
├── assets/
│   ├── ai-chatbot.css          ← Chatbot styling
│   ├── ai-chatbot.js           ← Chatbot logic
│   ├── alignique-custom.css    ← Brand CSS
│   └── alignique-logo.png      ← Logo
├── layout/
│   └── theme.liquid            ← Main theme (chatbot included)
├── sections/
│   └── (70+ section files)
├── snippets/
│   └── voice-assistant.liquid  ← Voice shopping
├── templates/
│   └── (page templates)
└── config/
    └── settings_data.json      ← Theme settings
```

---

## 🎯 Quick Reference

### URLs
- **Repo**: https://github.com/thebestrendingnow/alignique-shopify-theme
- **Store**: https://alignique.shop
- **Admin**: https://talktoshop.myshopify.com/admin
- **Themes**: https://talktoshop.myshopify.com/admin/themes/192091423050

### Commands
```bash
# Clone repo
git clone https://github.com/thebestrendingnow/alignique-shopify-theme.git

# Pull latest changes
git pull origin master

# Push changes
git add .
git commit -m "Your message"
git push origin master

# Start dev server
shopify theme dev --store=talktoshop.myshopify.com
```

---

## 🎉 Benefits of GitHub Integration

1. ✅ **Version Control** - Track all theme changes
2. ✅ **Auto-Deploy** - Push code → Automatically live
3. ✅ **Rollback** - Easily revert to previous versions
4. ✅ **Collaboration** - Multiple developers can work together
5. ✅ **Backup** - Theme backed up on GitHub
6. ✅ **CI/CD** - Can add automated tests later

---

**Questions?** Check the main README.md or test the workflow by making a small change!
