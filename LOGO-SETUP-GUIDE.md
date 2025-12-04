# 🎨 ALIGNIQUE LOGO SETUP GUIDE

## ⚠️ CRITICAL: Logo Not Showing - How to Fix

The logo exists in your theme (`assets/alignique-logo.png`) but needs to be set in **Shopify Theme Customizer**.

---

## 🔧 STEP-BY-STEP FIX

### Method 1: Theme Customizer (Recommended)

1. **Go to Shopify Admin**:
   ```
   https://talktoshop.myshopify.com/admin/themes
   ```

2. **Click "Customize"** on your live theme

3. **In the left sidebar**, click on **"Header"** section

4. **Look for "Logo"** or "Logo image" setting

5. **Click "Select image"**

6. **Choose** `alignique-logo.png` from your files
   - Or upload your logo if it's not there

7. **Adjust logo width**: Recommended **150-200px**

8. **Click "Save"** in the top-right corner

9. **Your logo will now appear!** ✅

---

### Method 2: Upload Logo Directly

If the logo file is missing:

1. **Go to**:
   ```
   https://talktoshop.myshopify.com/admin/settings/files
   ```

2. **Click "Upload files"**

3. **Select** your `alignique-logo.png` file

4. **Then follow Method 1** steps above

---

## 📏 LOGO SPECIFICATIONS

### Current Logo File:
- **Location**: `assets/alignique-logo.png`
- **Size**: 32KB
- **Recommended display**: 150-200px wide

### Ideal Logo Specs:
- **Format**: PNG with transparent background
- **Dimensions**: 600x150px (or similar ratio)
- **File size**: Under 100KB
- **Colors**: Gold (#D4AF37) and Black (#000)

---

## 🎨 BRAND COLORS

Use these exact colors throughout your theme:

```css
/* Primary Gold */
--alignique-gold: #D4AF37;

/* Hover Gold */
--alignique-gold-hover: #F59E0B;

/* Black Background */
--alignique-black: #000000;

/* White Text */
--alignique-white: #FFFFFF;

/* Gray Text */
--alignique-gray: #9CA3AF;
```

---

## 🖼️ WHERE LOGO APPEARS

Your logo should appear in these locations:

1. ✅ **Header** (top-left, main navigation)
2. ✅ **Footer** (with glow effect)
3. ✅ **Favicon** (browser tab icon)
4. ✅ **Email templates**
5. ✅ **Social media share preview**

---

## 🎯 LOGO STYLING (Already Applied)

The theme includes automatic logo styling:

```css
.header__heading-logo img {
  filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5));
  max-height: 60px;
}

.alignique-footer-logo {
  max-width: 200px;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.3));
}
```

This gives your logo:
- ✨ Golden glow effect
- 📏 Proper sizing
- 🎨 Perfect alignment

---

## 🚨 TROUBLESHOOTING

### Logo not showing after upload?

1. **Clear browser cache**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

2. **Check theme settings**:
   ```
   Customize → Header → Logo → Make sure image is selected
   ```

3. **Verify file uploaded**:
   ```
   Settings → Files → Look for alignique-logo.png
   ```

4. **Try different browser**: Sometimes cache issues persist

### Logo too big or too small?

1. **In Theme Customizer**:
   ```
   Header → Logo width → Adjust slider (150-200px recommended)
   ```

2. **Or edit code**:
   ```
   snippets/alignique-header-styles.liquid
   Line 22: max-height: 60px; ← Change this value
   ```

### Logo looks blurry?

Your logo file may be too small. Ideal:
- **Width**: 600px minimum
- **Height**: 150px minimum
- **DPI**: 144 or higher
- **Format**: PNG (not JPG)

---

## 📱 MOBILE LOGO

The logo automatically adjusts for mobile:

```css
@media (max-width: 768px) {
  .header__heading-logo img {
    max-height: 45px;
  }
}
```

Test on mobile after setup!

---

## 🎨 CREATING A PERFECT LOGO

### Recommended Tools:
- **Canva**: Easy, web-based
- **Figma**: Professional, free
- **Adobe Illustrator**: Advanced

### Template Specs:
- **Canvas**: 600x150px
- **Background**: Transparent
- **Font**: Cinzel (matches theme)
- **Primary color**: #D4AF37 (gold)
- **Accent**: Black or white
- **Effects**: Subtle outer glow

### Text Content:
```
ALIGNIQUE
```

Add tagline (optional):
```
Where Hearts Align
```

---

## ✅ LOGO CHECKLIST

Before going live, ensure:

- [ ] Logo uploaded to Shopify Files
- [ ] Logo selected in Theme Customizer
- [ ] Logo visible on homepage
- [ ] Logo visible in header navigation
- [ ] Logo visible in footer
- [ ] Logo size appropriate (not too big/small)
- [ ] Logo has golden glow effect
- [ ] Logo looks good on mobile
- [ ] Logo shows in email notifications
- [ ] Favicon set (browser tab icon)

---

## 🚀 QUICK FIX (30 Seconds)

**Fastest way to get logo showing**:

1. Click here: [Theme Customizer](https://talktoshop.myshopify.com/admin/themes/192091423050/editor)
2. Click "Header" in left sidebar
3. Under "Logo", click "Select image"
4. Choose `alignique-logo.png`
5. Click "Save"
6. **Done!** ✨

---

## 📸 WHAT IT SHOULD LOOK LIKE

After setup, your header should show:

```
┌─────────────────────────────────────────────────────────┐
│  [ALIGNIQUE LOGO✨]    Shop  New  Best  Sale   🔍🛒👤 │
└─────────────────────────────────────────────────────────┘
```

With:
- Logo on the left (gold glow)
- Navigation in center
- Icons on right
- Black background
- Gold accent line at bottom

---

## 💡 PRO TIPS

### 1. **Logo + Text Option**
If you want both logo AND text:
```
[Logo Icon] ALIGNIQUE
```

### 2. **Alternative: Text-Only Logo**
The theme includes a text-based logo as fallback:
```css
.logo {
  font-family: 'Cinzel', serif;
  font-size: 1.8rem;
  color: #D4AF37;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
}
```

### 3. **Seasonal Logos**
Change logo for holidays:
- Valentine's: Add hearts
- Christmas: Add stars
- Black Friday: Add sale badge

---

## 📞 NEED HELP?

If logo still not showing:

1. **Email**: support@alignique.shop
2. **Check GitHub**: Open issue on theme repo
3. **Shopify Support**: They can check theme settings

---

## 🎉 AFTER LOGO IS SET

Once your logo is live:

✅ Your brand identity is complete  
✅ Professional appearance  
✅ Better brand recognition  
✅ Improved trust & credibility  
✅ Cohesive theme design  

**Your store will look 100% complete!** 🌟

---

*Last updated: December 4, 2025*  
*Theme: Alignique Premium v2.0*  
*Status: Logo styling ready, just needs to be selected in customizer*
