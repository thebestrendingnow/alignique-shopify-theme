# Alignique Shopify Theme

Official Shopify theme for **Alignique.shop** - Premium black & gold astrology-themed e-commerce store.

## 🎨 Theme Features

### Core Design
- **Black & Gold Premium Theme** - Matches Alignique branding
- Fully responsive (mobile, tablet, desktop)
- Fast performance (< 15ms IHP P75)
- Accessibility compliant

### Integrated Features
- ✨ **AI Gift Finder Chatbot** - GPT-5.1 powered shopping assistant
- 🎤 **Voice Shopping Assistant** - Multilingual voice commands
- 🚚 **Free Shipping Bar** - Dynamic announcement bar
- 🎯 **Custom Hero Section** - Zodiac-themed landing page
- 📦 **Alignique Custom CSS** - Brand-specific styling

## 🤖 AI Chatbot

The theme includes a fully integrated AI-powered chatbot widget:

**Files:**
- `assets/ai-chatbot.css` - Chatbot styling
- `assets/ai-chatbot.js` - Chatbot logic
- `layout/theme.liquid` - Chatbot integration (lines 295-298)

**Backend API:**
```
https://alignique-backend.shermanmonte1111.workers.dev/api/chat
```

**Features:**
- Natural language conversations
- Product recommendations
- Gift finder (based on zodiac, interests, budget)
- Session memory (KV cache)
- Multi-language support
- Mobile responsive

## 📂 File Structure

```
.
├── assets/           # CSS, JS, images
│   ├── ai-chatbot.css
│   ├── ai-chatbot.js
│   ├── alignique-custom.css
│   └── alignique-logo.png
├── config/           # Theme settings
├── layout/           # Theme layouts
│   └── theme.liquid  # Main theme file
├── locales/          # Translations
├── sections/         # Page sections
├── snippets/         # Reusable components
└── templates/        # Page templates
```

## 🚀 Deployment

### Via GitHub (Automatic)

This repo is connected to Shopify via GitHub integration:

1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update theme"
   git push origin main
   ```
3. Shopify auto-deploys changes within 2-5 minutes

### Via Shopify CLI

```bash
# Login
shopify auth login

# Push to live theme
shopify theme push --store=talktoshop.myshopify.com --theme=192091423050 --allow-live

# Or push to development theme
shopify theme push --development
```

### Via Shopify Admin

1. Go to: https://talktoshop.myshopify.com/admin/themes/192091423050/editor
2. Click "Edit Code"
3. Upload modified files
4. Click "Save"

## 🔧 Configuration

### AI Chatbot Configuration

Edit `assets/ai-chatbot.js` to customize:

```javascript
const CONFIG = {
    API_URL: 'https://alignique-backend.shermanmonte1111.workers.dev/api/chat',
    THEME_COLOR: '#D4AF37', // Gold
    INITIAL_MESSAGE: "Hi! ✨ I'm your Alignique AI assistant!",
};
```

### Custom Styling

Edit `assets/alignique-custom.css`:

```css
/* Brand Colors */
--alignique-black: #000000;
--alignique-gold: #D4AF37;
--alignique-purple: #8B5CF6;
--alignique-white: #FFFFFF;
```

## 🌐 Live URLs

- **Store**: https://alignique.shop
- **Admin**: https://talktoshop.myshopify.com/admin
- **Theme Editor**: https://talktoshop.myshopify.com/admin/themes/192091423050/editor

## 📊 Performance

- **LCP**: < 786ms
- **IHP**: 12ms (Good!)
- **Theme Version**: 14.42
- **Shopify Version**: Latest

## 🛠️ Development

### Local Development

```bash
# Clone repo
git clone https://github.com/thebestrendingnow/alignique-shopify-theme.git

# Start local dev server (live preview)
shopify theme dev --store=talktoshop.myshopify.com

# Auto-reloads on file changes
```

### Testing

1. **Test chatbot locally**: https://alignique-backend.pages.dev/chatbot-demo.html
2. **Test live store**: https://alignique.shop
3. **Preview unpublished**: Use Shopify's theme preview feature

## 📝 Changelog

### Version 14.42 (Current)
- ✅ Added AI Gift Finder Chatbot
- ✅ Integrated GPT-5.1 backend API
- ✅ Added voice shopping assistant
- ✅ Custom black & gold styling
- ✅ Free shipping announcement bar

## 🔐 Credentials

**Backend API:**
- Worker: `alignique-backend.shermanmonte1111.workers.dev`
- D1 Database: `alignique-db`
- KV Namespace: `ALIGNIQUE_CACHE`
- AIMLAPI Key: Configured as secret

**Shopify:**
- Store: `talktoshop.myshopify.com`
- Theme ID: `192091423050`
- Access Token: Set in Cloudflare secrets

## 📞 Support

- **Backend Issues**: Check Worker logs at Cloudflare Dashboard
- **Theme Issues**: Shopify Theme Editor
- **AI Chatbot**: Test at chatbot-demo.html first

## 📄 License

Proprietary - Alignique.shop

---

**Last Updated**: December 4, 2025  
**Current Version**: 14.42  
**Status**: ✅ Live in Production
