const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
//const unzipper = require('unzipper');

const PATCH_DIR = path.join('src', 'compositions', 'pd');
// eslint-disable-next-line prettier/prettier
const ANDROID_ASSETS_DIR = path.join(
  'android',
  'app',
  'src',
  'main',
  'assets',
  'pd',
);

if (!fs.existsSync(ANDROID_ASSETS_DIR)) {
  fs.mkdirSync(ANDROID_ASSETS_DIR, { recursive: true });
}

const archive = archiver('zip');
const outputPath = path.join(ANDROID_ASSETS_DIR, 'patches.zip');
const output = fs.createWriteStream(outputPath);

archive.pipe(output);
archive.glob('**/*.pd', { cwd: PATCH_DIR });
archive.finalize();

// fs.readdirSync(`${PATCH_DIR}/lib`).forEach((file) => {
//   const src = path.join(`${PATCH_DIR}/lib`, file);
//   const dest = path.join(ANDROID_ASSETS_DIR, file);
//   fs.copyFileSync(src, dest);
// });
