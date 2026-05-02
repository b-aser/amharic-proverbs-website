# Settings System - Quick Start Guide

## ✨ What's New

Your website now has a **complete admin settings panel** at `/admin/settings` with 5 tabs:

| Tab | Features |
|-----|----------|
| **Site Settings** | Website name, logo, domain, contact info, about text |
| **Theme** | Customize all 3 main colors (primary, secondary, accent) |
| **Proverbs** | Full CRUD: Add, edit, search, delete proverbs |
| **Submissions** | Control user submissions and approval workflow |
| **Advanced** | Future features |

---

## 🚀 Quick Start

### 1. Log in as Admin
- Navigate to `/login`
- Enter admin credentials
- Click "Settings" in the admin header

### 2. Configure Your Site (Site Settings Tab)
```
✓ Add your website name in English and Amharic
✓ Upload a logo (provide URL)
✓ Add tagline and domain name
✓ Enter contact email/phone
✓ Write about text
✓ Save!
```

### 3. Customize Colors (Theme Tab)
```
✓ Click "Primary Color" and choose your dark background
✓ Click "Secondary Color" for button/accent colors
✓ Click "Accent Color" for highlights
✓ See live preview
✓ Save!
```

### 4. Add Proverbs (Proverbs Tab)
```
✓ Click "+ Add New Proverb"
✓ Paste Amharic text
✓ Paste English translation
✓ Add meanings (optional)
✓ Add tags (comma-separated): wisdom, unity, family, etc.
✓ Click "Add Proverb"
```

### 5. Enable Submissions (Submissions Tab)
```
✓ Check "Allow Public Submissions"
✓ Check "Require Admin Approval"
✓ Set max submissions per user (default: 5)
✓ Save!
✓ Users can now submit via /submit
```

---

## 📁 Files Created

```
src/app/admin/settings/
  ├─ page.tsx              # Main settings page with tabs
  └─ actions.ts            # Server-side operations

src/components/admin/
  ├─ SiteSettingsForm.tsx         # Website branding & info
  ├─ ThemeSettingsForm.tsx        # Color picker
  ├─ ProverbManagement.tsx        # CRUD for proverbs
  └─ SubmissionSettingsForm.tsx   # Submission config

src/components/layout/
  └─ DynamicHeader.tsx            # Header that loads settings

Updated files:
  ├─ src/app/page.tsx
  ├─ src/app/proverbs/page.tsx
  ├─ src/app/login/page.tsx
  ├─ src/app/submit/page.tsx

Documentation:
  └─ SETTINGS_GUIDE.md            # Comprehensive guide
```

---

## 🔑 Key Features

### ✅ Dynamic Header
Your header now automatically displays:
- Custom website name (English + Amharic)
- Logo (if provided)
- Settings are fetched from database, not hardcoded

### ✅ Full Proverb Management
- Add unlimited proverbs
- Edit existing proverbs
- Delete proverbs
- Search across all proverbs
- Tag-based organization
- Automatic URL slugs

### ✅ Color Customization
- Pick any colors you want
- Live preview before saving
- Changes apply to entire site immediately
- Uses CSS variables for flexible styling

### ✅ User Submissions
- Control whether public can submit
- Optional admin approval workflow
- Limit submissions per user
- Track submission metadata

### ✅ Security
- Admin-only access (role check)
- Authentication required
- Row-Level Security (RLS) policies
- Server actions prevent direct database access

---

## 🎯 Example: Setting Up Your Site

### Step 1: Brand Your Site (5 min)
1. Click "Site Settings" tab
2. Enter name: "Amharic Proverbs" (English)
3. Enter name: "ምሳሌያዊ አነጋገሮች" (Amharic)
4. Add logo URL: "https://yoursite.com/logo.png"
5. Click "Save Settings"

**Result**: Header now shows your custom branding!

### Step 2: Pick Your Colors (3 min)
1. Click "Theme" tab
2. Primary Color: Dark earth brown for headers
3. Secondary Color: Gold for buttons
4. Accent Color: Green for highlights
5. Check preview
6. Click "Save Theme"

**Result**: All pages use your custom colors!

### Step 3: Add Proverbs (10 min per proverb)
1. Click "Proverbs" tab
2. Click "+ Add New Proverb"
3. Fill in fields:
   - Amharic: ውሃ ጠልፎ ዐሣ አይጠመዱ
   - English: One cannot fish by scooping water.
   - Meaning (Am): [explanation]
   - Meaning (En): [explanation]
   - Tags: patience, wisdom
4. Click "Add Proverb"

**Result**: Proverb appears on /proverbs immediately!

### Step 4: Enable User Submissions (2 min)
1. Click "Submissions" tab
2. ☑ Allow Public Submissions
3. ☑ Require Admin Approval
4. Set Max to: 5
5. Click "Save Submission Settings"

**Result**: Users can submit at /submit, you review in /admin/submissions!

---

## 📊 Data Storage

All settings are stored in Supabase:

```
settings table:
┌─────────────────────────┬──────────────────┐
│ key                     │ value            │
├─────────────────────────┼──────────────────┤
│ websiteName             │ "Amharic Proverbs" │
│ websiteNameAmharic      │ "ምሳሌያዊ ..."      │
│ logoUrl                 │ "https://..."    │
│ theme                   │ {...colors...}   │
│ submissionSettings      │ {...config...}   │
└─────────────────────────┴──────────────────┘

proverbs table:
- All proverbs with meanings and tags

tags table:
- All tag names

proverb_tags table:
- Links proverbs to tags
```

---

## 🔗 Useful URLs

Once set up:
- `/admin/settings` - Main settings panel
- `/admin/submissions` - Review user submissions
- `/proverbs` - View all proverbs (public)
- `/submit` - User submission form (if enabled)

---

## 💡 Tips & Tricks

### Color Customization
Copy these hex codes for quick setup:
- Professional: #2C3E50 (dark blue), #E67E22 (orange), #27AE60 (green)
- Ethiopian: #C9952A (gold), #3D1F08 (earth), #2A5C45 (green)
- Modern: #1A1A1A (black), #FF6B6B (red), #4ECDC4 (teal)

### Bulk Proverb Entry
1. Create each proverb one by one in Proverbs tab
2. Or ask for direct database access to import CSV

### Tagging Strategy
Keep consistent tag names for better organization:
- wisdom, unity, family, work, patience, courage, etc.

### SEO & Metadata
Website name and tagline are used in:
- Page titles
- Meta descriptions
- Header display
- Social sharing

---

## ⚠️ Important Notes

1. **Settings are instant** - Changes apply immediately across the site
2. **Admin-only** - Only users with role='admin' can access settings
3. **Database-driven** - Settings persist across server restarts
4. **Theme colors** - Use valid hex codes (#RRGGBB format)
5. **Logo URL** - Must be valid, publicly accessible URL

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Settings don't save | Check you're logged in as admin |
| Header doesn't update | Try Ctrl+Shift+R to hard refresh |
| Colors look wrong | Verify hex codes are valid (#RRGGBB) |
| Proverbs not showing | Check they don't have blank required fields |
| Logo not displaying | Verify URL is correct and accessible |

---

## 📖 Full Documentation

For detailed information, see: `SETTINGS_GUIDE.md`

Topics covered:
- All 5 tabs explained in detail
- Example workflows
- Database structure
- Security details
- Troubleshooting guide

---

## 🎉 You're All Set!

Your settings system is ready to use. Start with Site Settings, then customize colors, and add your first proverbs!

Questions? Check `SETTINGS_GUIDE.md` or review the code in `src/components/admin/` and `src/app/admin/settings/`

