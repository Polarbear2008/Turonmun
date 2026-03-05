import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

console.log(`${colors.bright}${colors.blue}=== turonmun Website Production Build ====${colors.reset}\n`);

// Step 1: Clean previous build
console.log(`${colors.cyan}Step 1: Cleaning previous build...${colors.reset}`);
try {
  if (fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.rmSync(path.join(__dirname, 'dist'), { recursive: true, force: true });
  }
  console.log(`${colors.green}✓ Previous build cleaned${colors.reset}`);
} catch (error) {
  console.error(`${colors.yellow}! Warning: Could not clean previous build: ${error.message}${colors.reset}`);
}

// Step 2: Install dependencies
console.log(`\n${colors.cyan}Step 2: Checking dependencies...${colors.reset}`);
try {
  execSync('npm ci', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Dependencies installed${colors.reset}`);
} catch (error) {
  console.error(`${colors.yellow}! Warning: Could not install dependencies: ${error.message}${colors.reset}`);
  console.log(`${colors.yellow}  Continuing with existing node_modules...${colors.reset}`);
}

// Step 3: Type checking
console.log(`\n${colors.cyan}Step 3: Running type check...${colors.reset}`);
try {
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Type check passed${colors.reset}`);
} catch (error) {
  console.error(`${colors.yellow}! Warning: Type check failed, but continuing with build${colors.reset}`);
}

// Step 4: Build
console.log(`\n${colors.cyan}Step 4: Building production bundle...${colors.reset}`);
try {
  execSync('tsc && vite build', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Production build completed${colors.reset}`);
} catch (error) {
  console.error(`${colors.yellow}× Build failed: ${error.message}${colors.reset}`);
  process.exit(1);
}

// Step 5: Verify build
console.log(`\n${colors.cyan}Step 5: Verifying build...${colors.reset}`);
try {
  const distPath = path.join(__dirname, 'dist');
  const indexPath = path.join(distPath, 'index.html');
  
  if (!fs.existsSync(distPath)) {
    throw new Error('dist directory not found');
  }
  
  if (!fs.existsSync(indexPath)) {
    throw new Error('index.html not found in dist directory');
  }
  
  // Count files
  let fileCount = 0;
  let totalSize = 0;
  
  const countFiles = (dir) => {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        countFiles(fullPath);
      } else {
        fileCount++;
        const stats = fs.statSync(fullPath);
        totalSize += stats.size;
      }
    }
  };
  
  countFiles(distPath);
  
  const sizeMB = (totalSize / (1024 * 1024)).toFixed(2);
  
  console.log(`${colors.green}✓ Build verified${colors.reset}`);
  console.log(`  - Total files: ${fileCount}`);
  console.log(`  - Total size: ${sizeMB} MB`);
} catch (error) {
  console.error(`${colors.yellow}× Build verification failed: ${error.message}${colors.reset}`);
}

console.log(`\n${colors.bright}${colors.green}=== Build Complete ====${colors.reset}`);
console.log(`\nTo preview the production build locally, run:`);
console.log(`${colors.cyan}npm run preview${colors.reset}`);
console.log(`\nTo deploy, upload the contents of the ${colors.cyan}dist${colors.reset} folder to your web server.`);
