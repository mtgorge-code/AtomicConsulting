import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

// Desktop Results view
await page.goto('http://localhost:5173/desktop');
await page.waitForTimeout(1200);

// Click Results nav
await page.click('button:has-text("Results")');
await page.waitForTimeout(800);
await page.screenshot({ path: 'screenshots/desktop-results.png', fullPage: false });

// Click Integrations nav
await page.click('button:has-text("Integrations")');
await page.waitForTimeout(800);
await page.screenshot({ path: 'screenshots/desktop-integrations.png', fullPage: false });

// Mobile Results
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:5173/results');
await page.waitForTimeout(1000);
await page.screenshot({ path: 'screenshots/mobile-results.png', fullPage: true });

await browser.close();
console.log('Done!');
