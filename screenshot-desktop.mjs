import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

mkdirSync('/tmp/screenshots', { recursive: true });

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const BASE = 'http://localhost:5173/desktop';
const VIEWS = [
  { hash: '',          name: '08a-desktop-today',    label: 'Today view (default)' },
  { hash: '#captures', name: '08b-desktop-captures', label: 'Captures / Media Library' },
  { hash: '#plan',     name: '08c-desktop-plan',      label: 'Plan / Calendar' },
  { hash: '#strategy', name: '08d-desktop-strategy',  label: 'Strategy' },
];

// We need to click the sidebar nav items since it's state-driven
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto('http://localhost:5173/desktop', { waitUntil: 'networkidle', timeout: 15000 });
await page.waitForTimeout(800);

// Today (default)
await page.screenshot({ path: '/tmp/screenshots/08a-desktop-today.png' });
console.log('✓ 08a today');

// Captures
await page.click('button:has-text("Captures")');
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/screenshots/08b-desktop-captures.png' });
console.log('✓ 08b captures');

// Plan
await page.click('button:has-text("Plan")');
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/screenshots/08c-desktop-plan.png' });
console.log('✓ 08c plan');

// Strategy
await page.click('button:has-text("Strategy")');
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/screenshots/08d-desktop-strategy.png' });
console.log('✓ 08d strategy');

// Captures with photo selected
await page.click('button:has-text("Captures")');
await page.waitForTimeout(300);
const firstPhoto = page.locator('[role="button"]').first();
await firstPhoto.click();
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/screenshots/08e-desktop-captures-detail.png' });
console.log('✓ 08e captures detail panel');

// Plan — month view
await page.click('button:has-text("Plan")');
await page.waitForTimeout(300);
await page.click('[aria-pressed] ~ button, button:has-text("Month")');
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/screenshots/08f-desktop-plan-month.png' });
console.log('✓ 08f plan month view');

// Plan — pipeline view
await page.click('button:has-text("Pipeline")');
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/screenshots/08g-desktop-plan-pipeline.png' });
console.log('✓ 08g plan pipeline view');

await ctx.close();
await browser.close();
console.log('All done.');
