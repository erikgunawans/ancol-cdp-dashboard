const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:3000';

const PAGES = [
  { slug: 'home', path: '/' },
  { slug: 'problem', path: '/problem' },
  { slug: 'architecture', path: '/architecture' },
  { slug: 'data-flow', path: '/data-flow' },
  { slug: 'overview', path: '/overview' },
  { slug: 'visitors', path: '/visitors' },
  { slug: 'revenue', path: '/revenue' },
  { slug: 'engagement', path: '/engagement' },
  { slug: 'segments', path: '/segments' },
  { slug: 'realtime', path: '/realtime' },
  { slug: 'journey', path: '/journey' },
  { slug: 'use-cases', path: '/use-cases' },
  { slug: 'roadmap', path: '/roadmap' },
];

const WIDTHS = [
  { label: '375', width: 375, height: 812 },
  { label: '768', width: 768, height: 1024 },
  { label: '1024', width: 1024, height: 768 },
  { label: '1440', width: 1440, height: 900 },
];

const OUT_DIR = path.join(__dirname, '../screenshots');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let total = 0;
  for (const page of PAGES) {
    for (const viewport of WIDTHS) {
      const tab = await browser.newPage();
      await tab.setViewport({ width: viewport.width, height: viewport.height, deviceScaleFactor: 1 });
      const url = `${BASE_URL}${page.path}`;
      try {
        await tab.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        // Scroll through the full page so IntersectionObserver fires for all whileInView elements
        await tab.evaluate(async () => {
          const pageHeight = document.body.scrollHeight;
          const step = window.innerHeight * 0.8;
          for (let y = 0; y < pageHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise(r => setTimeout(r, 120));
          }
          window.scrollTo(0, 0);
        });
        // Wait for animations to complete
        await new Promise(r => setTimeout(r, 800));
        const file = path.join(OUT_DIR, `${page.slug}--${viewport.label}.png`);
        await tab.screenshot({ path: file, fullPage: true });
        console.log(`✓ ${page.slug} @ ${viewport.label}px → ${file}`);
        total++;
      } catch (err) {
        console.error(`✗ ${page.slug} @ ${viewport.label}px → ${err.message}`);
      }
      await tab.close();
    }
  }

  await browser.close();
  console.log(`\nDone. ${total} screenshots saved to ./screenshots/`);
})();
