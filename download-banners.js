const fs = require('fs');
const path = require('path');
const https = require('https');

const banners = [
  { url: 'https://alliakids.com/wp-content/uploads/2026/02/1.png', name: 'banner-1.png' },
  { url: 'https://alliakids.com/wp-content/uploads/2026/02/2.png', name: 'banner-2.png' },
  { url: 'https://alliakids.com/wp-content/uploads/2026/02/3.png', name: 'banner-3.png' },
  { url: 'https://alliakids.com/wp-content/uploads/2025/09/Tidak-Ada-Akun-Admin-Tidak-Ada-Rekapan-Tidak-Pernah-DM-atau.png', name: 'announcement-1.png' },
  { url: 'https://alliakids.com/wp-content/uploads/2026/02/Tidak-Ada-Akun-Admin-Tidak-Ada-Rekapan-Tidak-Pernah-DM-atau-1.png', name: 'announcement-2.png' }
];

const targetDir = path.join(__dirname, 'public', 'assets', 'img', 'banner');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Starting to download banner images...');

banners.forEach((banner) => {
  const filePath = path.join(targetDir, banner.name);
  const file = fs.createWriteStream(filePath);

  https.get(banner.url, (response) => {
    if (response.statusCode === 200) {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Successfully downloaded: ${banner.name}`);
      });
    } else {
      console.error(`Failed to download ${banner.name}: HTTP Status ${response.statusCode}`);
      file.close();
      fs.unlink(filePath, () => {});
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${banner.name}:`, err.message);
    file.close();
    fs.unlink(filePath, () => {});
  });
});
