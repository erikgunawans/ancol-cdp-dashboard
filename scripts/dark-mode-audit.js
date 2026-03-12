const puppeteer = require('puppeteer');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const OUT_DIR = path.join(__dirname, '../screenshots');

const DARK_PAGES = [
  { slug: 'home', path: '/' },
  { slug: 'architecture', path: '/architecture' },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const page of DARK_PAGES) {
    const tab = await browser.newPage();
    await tab.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    // Emulate prefers-color-scheme: dark
    await tab.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);

    // Set the data-theme attribute via localStorage before navigation
    await tab.evaluateOnNewDocument(() => {
      localStorage.setItem('theme', 'dark');
    });

    await tab.goto(`${BASE_URL}${page.path}`, { waitUntil: 'networkidle0', timeout: 30000 });

    // Force dark mode via DOM if ThemeProvider uses data-theme
    await tab.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    // Scroll through for animations
    await tab.evaluate(async () => {
      const pageHeight = document.body.scrollHeight;
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < pageHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });

    await new Promise(r => setTimeout(r, 800));

    const file = path.join(OUT_DIR, `${page.slug}--1440--dark.png`);
    await tab.screenshot({ path: file, fullPage: true });
    console.log(`✓ dark: ${page.slug} → ${file}`);
    await tab.close();
  }

  await browser.close();
  console.log('\nDark mode screenshots done.');
})();
