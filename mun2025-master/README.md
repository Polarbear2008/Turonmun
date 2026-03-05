# Welcome to my project

## Project info
turonmun Website 🌍💼
The official website for turonmun (Fergana Presidential School Model United Nations) – a platform for young leaders to engage in global diplomacy, debate pressing international issues, and develop negotiation skills.

**Use your preferred IDE**
The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Publishing the Website

### Option 1: Vercel (Recommended)

1. Create an account on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy

### Option 2: Netlify

1. Create an account on [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Configure the build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Deploy

### Option 3: Manual Deployment

1. Create a production build: `npm run build:prod`
2. Upload the contents of the `dist` folder to your web server
3. Configure your web server to serve the `index.html` file for all routes

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
