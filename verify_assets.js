const fs = require('fs');
const path = require('path');

console.log('--- Verifying AMARA Workspace Assets & Code ---');
const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('css/style.css', 'utf8');
const js = fs.readFileSync('js/app.js', 'utf8');

console.log('index.html length: ' + html.length + ' bytes');
console.log('css/style.css length: ' + css.length + ' bytes');
console.log('js/app.js length: ' + js.length + ' bytes');

const images = fs.readdirSync('assets/images');
console.log('Images found in assets/images: ' + images.join(', '));

const imgRegex = /assets\/images\/([a-zA-Z0-9_\-\.]+)/g;
let match;
const referenced = new Set();
while ((match = imgRegex.exec(html)) !== null) referenced.add(match[1]);
while ((match = imgRegex.exec(js)) !== null) referenced.add(match[1]);

referenced.forEach(img => {
  const exists = fs.existsSync(path.join('assets/images', img));
  console.log('Image [' + img + ']: ' + (exists ? 'EXISTS (OK)' : 'MISSING!'));
});
