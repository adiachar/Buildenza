const fs = require('fs');
const path = require('path');

console.log('Setting up deploy directory...');

// Remove existing deploy directory
const deployDir = path.join(__dirname, 'deploy');
if (fs.existsSync(deployDir)) {
    fs.rmSync(deployDir, { recursive: true, force: true });
    console.log('Removed existing deploy directory');
}

// Create deploy directory
fs.mkdirSync(deployDir, { recursive: true });
console.log('Created deploy directory');

// Copy assets
const assetsDir = path.join(__dirname, '.open-next', 'assets');
if (fs.existsSync(assetsDir)) {
    copyDirRecursive(assetsDir, deployDir);
    console.log('Copied assets');
}

// Copy worker.js
const workerSrc = path.join(__dirname, '.open-next', 'worker.js');
const workerDest = path.join(deployDir, '_worker.js');
if (fs.existsSync(workerSrc)) {
    fs.copyFileSync(workerSrc, workerDest);
    console.log('Copied worker.js');
}

// Copy directories
const dirsToCopy = ['cloudflare', 'middleware', 'server-functions', '.build'];
dirsToCopy.forEach(dir => {
    const srcDir = path.join(__dirname, '.open-next', dir);
    const destDir = path.join(deployDir, dir);
    if (fs.existsSync(srcDir)) {
        copyDirRecursive(srcDir, destDir);
        console.log(`Copied ${dir}`);
    }
});

// Run generate-routes.js
console.log('Running generate-routes.js...');
require('./generate-routes.js');

console.log('Deploy setup complete!');

function copyDirRecursive(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDirRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}