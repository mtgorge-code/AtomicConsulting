import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

mkdirSync('/tmp/screenshots', { recursive: true });

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const screens = [
  { path: '/',         name: '01-today',    mobile: true },
  { path: '/push',     name: '02-push',     mobile: true },
  { path: '/capture',  name: '03-brief',    mobile: true },
  { path: '/shoot',    name: '04-shoot',    mobile: true },
  { path: '/handoff',  name: '05-handoff',  mobile: true },
  { path: '/plan',     name: '06-plan',     mobile: true },
  { path: '/strategy', name: '07-strategy', mobile: true },
  { path: '/desktop',  name: '08-desktop',  mobile: false },
];

for (const s of screens) {
  const ctx = await browser.newContext(
    s.mobile
      ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }
      : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }
  );
  const page = await ctx.newPage();
  await page.goto(`http://localhost:5173${s.path}`, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `/tmp/screenshots/${s.name}.png`, fullPage: s.mobile });
  console.log(`✓ ${s.name}`);
  await ctx.close();
}

await browser.close();
console.log('All done.');
