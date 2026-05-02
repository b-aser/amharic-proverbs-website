# Settings System Guide

Your Amharic Proverbs website now has a comprehensive admin settings system. This guide explains all the features and how to use them.

## Accessing Settings

1. Go to `/admin/settings` (or `/admin` then click "Settings" in the navigation)
2. You must be logged in as an admin to access settings
3. The settings panel is organized into 5 tabs

---

## Tab 1: Site Settings

Configure the basic information about your website.

### Website Branding
- **Logo URL**: Add a URL to your website logo. The logo will appear in the header next to the site name
- **Website Name (English)**: The main English title (e.g., "Amharic Proverbs Archive")
- **Website Name (Amharic)**: The Amharic title (e.g., "ምሳሌያዊ አነጋገሮች")
- **Tagline (English)**: A short English motto or tagline
- **Tagline (Amharic)**: A short Amharic motto or tagline

### Domain Name
- Set your website's domain (e.g., "example.com" or "proverbs.example.com")
- This is primarily for reference and metadata

### Contact Information
- **Email**: Admin contact email for visitors
- **Phone**: Admin contact phone number

### About Your Website
- **About Text (English)**: Detailed English description of your website (appears on the home page)
- **About Text (Amharic)**: Detailed Amharic description of your website

**Changes are immediately reflected** in:
- Website header
- Home page "About" section
- Footer information

---

## Tab 2: Theme

Customize the color scheme of your entire website.

### Color Palette
Three main color categories can be customized:

1. **Primary Color** (Default: #3D1F08)
   - Used for header background and main UI elements
   - Currently "Earth Dark" brown

2. **Secondary Color** (Default: #C9952A)
   - Used for buttons, accents, and highlights
   - Currently "Gold"

3. **Accent Color** (Default: #2A5C45)
   - Used for highlight boxes and secondary accents
   - Currently "Green"

### How to Change Colors
- Click the color picker or enter a hex code directly
- Use the preview section to see how your changes look
- Your theme colors are stored as CSS variables that update throughout the site

### CSS Variables Reference
These CSS variables are available for custom styling:
- `--color-earth-dark`: Primary Color
- `--color-gold`: Secondary Color
- `--color-green-eth`: Accent Color

---

## Tab 3: Proverbs Management

Add, edit, and delete proverbs from your database.

### Adding a New Proverb
1. Click "+ Add New Proverb" button
2. Fill in the form:
   - **Amharic Text** (required): The proverb in Ge'ez script
   - **English Translation** (required): English version of the proverb
   - **Meaning (Amharic)**: Explanation of the proverb's meaning in Amharic
   - **Meaning (English)**: Explanation of the proverb's meaning in English
   - **Tags**: Comma-separated keywords (e.g., "wisdom, unity, family")

3. Click "Add Proverb"

### Editing a Proverb
1. Find the proverb in the list
2. Click the "Edit" button
3. Modify the fields
4. Click "Update Proverb"

### Deleting a Proverb
1. Find the proverb in the list
2. Click the "Delete" button
3. Confirm the deletion

### Searching
- Use the search box at the top to filter proverbs by Amharic or English text
- Shows the count of displayed vs. total proverbs

### Features
- Automatically creates URL-friendly slugs
- Tracks creation date
- Supports tagging for organization
- All proverbs appear on `/proverbs` page immediately after creation

---

## Tab 4: Submissions

Configure how users can submit new proverbs.

### Submission Settings
Three main controls:

1. **Allow Public Submissions**
   - Enable/disable whether visitors can submit proverbs
   - When disabled, only admins can add proverbs via the Proverbs tab

2. **Require Admin Approval**
   - If enabled: All submissions go to `/admin/submissions` for review before publishing
   - If disabled: Submissions are published immediately

3. **Maximum Submissions Per User**
   - Set the limit on how many submissions each user can make
   - Default: 5 submissions per user

### Current Submission Policy Display
The form shows a live summary of your current policy so you can verify settings before saving.

---

## Tab 5: Advanced

Reserved for future advanced features like:
- Cache clearing
- Database maintenance
- Export/import functionality
- Analytics settings

---

## How Data Is Stored

All settings are stored in the Supabase `settings` table:
- **Key**: Setting name (e.g., "websiteName")
- **Value**: Setting value (stored as JSON for complex settings)

Database locations used by settings system:
- `settings` table: Stores all configuration
- `proverbs` table: Stores proverbs (managed via Proverbs tab)
- `tags` table: Stores tags for organizing proverbs
- `proverb_tags` table: Links proverbs to tags

---

## Example Workflows

### Scenario 1: Launch Your Site
1. Go to Settings > Site Settings
2. Enter your organization's name in English and Amharic
3. Upload your logo
4. Fill in your tagline and About text
5. Add contact information
6. Save

### Scenario 2: Rebrand Colors
1. Go to Settings > Theme
2. Adjust the primary, secondary, and accent colors
3. Check the preview
4. Click "Save Theme"
5. Visit your site to see changes immediately

### Scenario 3: Add 10 Proverbs
1. Go to Settings > Proverbs Management
2. For each proverb, click "+ Add New Proverb"
3. Enter the Amharic text, English translation, meanings, and tags
4. All proverbs immediately appear on the `/proverbs` page

### Scenario 4: Enable User Submissions
1. Go to Settings > Submissions
2. Check "Allow Public Submissions"
3. Check "Require Admin Approval"
4. Set "Maximum Submissions Per User" to 3
5. Save

Users can now submit proverbs via `/submit`, and submissions go to `/admin/submissions` for review.

---

## Technical Details

### Server Actions Used
All settings operations use secure server actions:
- `updateSetting()`: Update a single setting
- `updateMultipleSettings()`: Update multiple settings at once
- `addProverb()`: Add a new proverb
- `updateProverb()`: Edit an existing proverb
- `deleteProverb()`: Delete a proverb
- `getProverbs()`: Fetch all proverbs
- `getAllSettings()`: Fetch all current settings
- `getSetting()`: Fetch a specific setting

### Security
- Only admins (role='admin') can access settings
- All operations verify user authentication
- Changes trigger page revalidation for fresh data
- Database uses Row Level Security (RLS) policies

### Real-Time Updates
Changes to settings take effect immediately:
- Header updates reflect new branding instantly
- Theme colors update across all pages
- New proverbs appear in search and listing immediately
- Pages use Next.js revalidation for fresh data

---

## Troubleshooting

### Settings Not Saving
- Confirm you're logged in as admin
- Check browser console for errors
- Ensure Supabase connection is active

### Header Not Updating
- Proverbs might be cached - try hard refreshing (Ctrl+Shift+R or Cmd+Shift+R)
- Check that your logo URL is valid
- Verify settings are saved in the admin panel

### Proverbs Not Appearing
- Ensure you're viewing the published page (not in draft/preview mode)
- Check that proverbs don't have typos in required fields
- Verify search index has updated

### Color Changes Not Visible
- Clear browser cache
- Check that hex codes are valid (format: #RRGGBB)
- Ensure CSS variables are being used in your custom styles

---

## Next Steps

1. **Set up your site**: Configure Site Settings with your branding
2. **Choose a theme**: Customize colors in Theme tab
3. **Add content**: Populate proverbs via Proverbs Management
4. **Enable submissions**: Configure submission settings
5. **Monitor**: Review submissions in `/admin/submissions`

---

## Support

For issues or feature requests related to the settings system:
- Check the troubleshooting section above
- Review server logs for errors
- Verify Supabase database connection
- Ensure admin role is properly set for your user account

