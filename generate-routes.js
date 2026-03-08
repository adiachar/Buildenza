const fs = require('fs');
const path = require('path');

const routesJson = {
    version: 1,
    include: ["/*"],
    exclude: [
        "/_next/static/*",
        "/favicon.ico",
        "/images/*",
        "/next.svg",
        "/vercel.svg"
    ]
};

const deployDir = path.join(__dirname, 'deploy');

if (!fs.existsSync(deployDir)) {
    fs.mkdirSync(deployDir, { recursive: true });
}

fs.writeFileSync(
    path.join(deployDir, '_routes.json'),
    JSON.stringify(routesJson, null, 2)
);

console.log('Successfully generated deploy/_routes.json');
