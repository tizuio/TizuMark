const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const toIco = require('to-ico');
const { Icns, IcnsImage } = require('@fiahfy/icns');

const svgBuffer = fs.readFileSync(path.join(__dirname, 'icon-source.svg'));

async function generateIcons() {
  // Generate PNG icons at all required sizes
  const sizes = [
    { size: 32,  dest: 'src-tauri/icons/32x32.png' },
    { size: 64,  dest: 'src/app-icon.png' },
    { size: 128, dest: 'src-tauri/icons/128x128.png' },
    { size: 128, dest: 'src-tauri/icons/128x128@2x.png' },
    { size: 256, dest: 'src-tauri/icons/icon.png' },
    { size: 256, dest: 'icon.png' },
  ];

  for (const { size, dest } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, dest));
    console.log(`Generated ${dest} (${size}x${size})`);
  }

  // Generate ICO (Windows) — use to-ico for proper multi-size ICO
  const icoSizes = [32, 48, 256];
  const pngBuffers = [];
  for (const size of icoSizes) {
    pngBuffers.push(await sharp(svgBuffer).resize(size, size).png().toBuffer());
  }
  const icoBuffer = await toIco(pngBuffers);
  fs.writeFileSync(path.join(__dirname, 'src-tauri/icons/icon.ico'), icoBuffer);
  console.log('Generated src-tauri/icons/icon.ico (' + icoSizes.join('+') + ')');

  // Generate ICNS (macOS)
  const icns = new Icns();
  const icnsSizeMap = [
    { size: 64,   osType: 'icp6' },
    { size: 128,  osType: 'ic07' },
    { size: 256,  osType: 'ic08' },
    { size: 512,  osType: 'ic09' },
    { size: 1024, osType: 'ic10' },
  ];

  for (const { size, osType } of icnsSizeMap) {
    const buf = await sharp(svgBuffer).resize(size, size).png().toBuffer();
    const img = IcnsImage.fromPNG(buf, osType);
    icns.append(img);
  }

  fs.writeFileSync(path.join(__dirname, 'src-tauri/icons/icon.icns'), Buffer.from(icns.data));
  console.log('Generated src-tauri/icons/icon.icns');

  console.log('\nAll icons generated successfully!');
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
