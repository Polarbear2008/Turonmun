# turonmun Website Update Guide

This guide explains how to make updates to the turonmun website after it has been published.

## Quick Updates via Environment Variables

For simple content changes like conference dates, locations, or registration status:

1. Edit the `.env` file in the root directory
2. Update the relevant values:

```
VITE_APP_TITLE=FPS Model United Nations
VITE_APP_DESCRIPTION=Official website for FPS Model United Nations conferences
VITE_APP_URL=https://turonmun.uz
VITE_APP_CONFERENCE_DATE=2025-04-02T09:00:00
VITE_APP_CONFERENCE_LOCATION=Fergana Presidential School, Uzbekistan
VITE_APP_REGISTRATION_OPEN=true
```

3. Rebuild and redeploy the website

## Updating Website Content

### Step 1: Make Local Changes

1. Clone the repository if you haven't already:
   ```
   git clone <repository-url>
   cd mun-main
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Make your changes to the relevant files:
   - `/src/pages/` - For page content
   - `/src/components/` - For reusable components
   - `/src/assets/` - For images and other assets
   - `/public/` - For static files

### Step 2: Test Your Changes

1. Check that your changes look good in the browser
2. Test on different screen sizes using browser developer tools
3. Verify all links and functionality work correctly

### Step 3: Build for Production

```
npm run build:prod
```

### Step 4: Deploy Your Changes

#### If using Vercel or Netlify:

1. Commit your changes:
   ```
   git add .
   git commit -m "Update: description of changes"
   git push
   ```

2. The hosting platform will automatically rebuild and deploy your site

#### If using manual deployment:

1. Upload the contents of the `dist` folder to your web server

## Adding New Pages

1. Create a new page component in `/src/pages/`
2. Add the route in `/src/App.tsx`:

```tsx
<Route path="/your-new-page" element={<YourNewPage />} />
```

## Updating Navigation

Edit the navigation items in `/src/config/site.ts`:

```ts
navigation: [
  {
    title: 'About',
    href: '/about',
  },
  // Add or modify items here
],
```

## Adding New Images

1. Place new images in `/public/images/`
2. Reference them in your components:
   ```tsx
   <img src="/images/your-image.jpg" alt="Description" />
   ```

## Need More Help?

If you need assistance with more complex updates, consider:

1. Hiring a developer for specific changes
2. Implementing a content management system (CMS) for easier updates
3. Contact the original development team for support

Remember to always backup your code before making significant changes!
