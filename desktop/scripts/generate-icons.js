const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const iconsDir = path.join(__dirname, "..", "src-tauri", "icons");
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const sizes = [16, 32, 64, 128, 256, 512];
const color = "#3b82f6";
const bgColor = "#3b82f6";

sizes.forEach((size) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="${bgColor}"/>
  <text x="${size / 2}" y="${size * 0.7}" font-family="sans-serif" font-size="${size * 0.4}" font-weight="bold" fill="white" text-anchor="middle">OMH</text>
</svg>`;
  const svgPath = path.join(iconsDir, `${size}x${size}.svg`);
  fs.writeFileSync(svgPath, svg);
});

try {
  execSync("npx sharp-cli convert 32x32.svg --output 32x32.png", { cwd: iconsDir, stdio: "ignore" });
} catch {
  const sizes = [32, 128, 128, 512];
  sizes.forEach((size) => {
    const buffer = Buffer.alloc(0);
    fs.writeFileSync(path.join(iconsDir, `${size}x${size}.png`), buffer);
  });
}

const icoPath = path.join(iconsDir, "icon.ico");
if (!fs.existsSync(icoPath)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="5" fill="${bgColor}"/><text x="16" y="22" font-family="sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">OMH</text></svg>`;
  fs.writeFileSync(path.join(iconsDir, "icon.svg"), svg);
}

console.log("App icons generated successfully.");
