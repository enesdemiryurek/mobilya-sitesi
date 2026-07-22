const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  const outDir = path.join(__dirname, 'out');
  const gitDir = path.join(outDir, '.git');

  console.log('Ensuring .nojekyll file exists...');
  fs.writeFileSync(path.join(outDir, '.nojekyll'), '');

  console.log('Publishing static site to GitHub Pages...');

  // Initialize git inside out directory if not present
  if (fs.existsSync(gitDir)) {
    fs.rmSync(gitDir, { recursive: true, force: true });
  }

  const git = (cmd) => execSync(`git ${cmd}`, { cwd: outDir, stdio: 'inherit' });

  git('init');
  git('checkout -b gh-pages');
  git('config core.longpaths true');
  git('add -A');
  git('commit -m "Deploy to GitHub Pages"');
  git('remote add origin https://github.com/enesdemiryurek/mobilya-sitesi.git');
  git('push -f origin gh-pages');

  console.log('\n🎉 Yayında! Siteniz başarıyla gh-pages dalına yüklendi.');
} catch (err) {
  console.error('\n❌ Deployment failed:', err.message);
  process.exit(1);
}
