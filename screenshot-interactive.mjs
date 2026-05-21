import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

mkdirSync('/tmp/screenshots', { recursive: true });

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// Desktop — Captures view with detail panel open
await page.goto('http://localhost:5173/desktop', { waitUntil: 'networkidle' });
await page.click('button:has-text("Captures")');
await page.waitForTimeout(400);
const firstCard = page.locator('[role="button"]').first();
await firstCard.click();
await page.waitForTimeout(300);
await page.screenshot({ path: '/tmp/screenshots/interactive-01-captures-detail.png' });
console.log('✓ captures with detail open');

// Approve a photo — watch status change
await page.click('button:has-text("Approve")');
await page.waitForTimeout(600); // wait for toast
await page.screenshot({ path: '/tmp/screenshots/interactive-02-after-approve.png' });
console.log('✓ after photo approve (toast visible)');

// Desktop Today — approve the draft post
await page.click('button:has-text("Today")');
await page.waitForTimeout(300);
await page.screenshot({ path: '/tmp/screenshots/interactive-03-today-before-approve.png' });
console.log('✓ today before approve');

// Find and click approve in right rail
const approveBtn = page.locator('button:has-text("Approve · 1 tap")').first();
await approveBtn.click();
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/screenshots/interactive-04-today-after-approve.png' });
console.log('✓ today after approve (draft gone, toast)');

// Desktop Plan — pipeline view shows updated state
await page.click('button:has-text("Plan")');
await page.waitForTimeout(300);
await page.click('button:has-text("Pipeline")');
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/screenshots/interactive-05-plan-pipeline-updated.png' });
console.log('✓ pipeline after approval');

await ctx.close();

// Mobile — capture handoff flow
const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const mPage = await mCtx.newPage();

await mPage.goto('http://localhost:5173/capture', { waitUntil: 'networkidle' });
await mPage.waitForTimeout(400);
await mPage.screenshot({ path: '/tmp/screenshots/interactive-06-brief-before-handoff.png', fullPage: true });
console.log('✓ brief before handoff');

await mPage.click('button:has-text("Hand to Atomic")');
await mPage.waitForTimeout(600);
await mPage.screenshot({ path: '/tmp/screenshots/interactive-07-brief-after-handoff.png', fullPage: true });
console.log('✓ brief after handoff (owner changed, toast)');

// Shoot flow
await mPage.goto('http://localhost:5173/shoot', { waitUntil: 'networkidle' });
await mPage.waitForTimeout(400);
await mPage.screenshot({ path: '/tmp/screenshots/interactive-08-shoot.png' });
console.log('✓ shoot screen');

// Click shutter 3 times to complete
const shutter = mPage.locator('button[aria-label*="Capture shot"]');
await shutter.click(); await mPage.waitForTimeout(400);
await shutter.click(); await mPage.waitForTimeout(400);
await shutter.click(); await mPage.waitForTimeout(600);
// Should be on handoff now
await mPage.screenshot({ path: '/tmp/screenshots/interactive-09-handoff.png', fullPage: true });
console.log('✓ handoff after 3 shots');

// Strategy — b-roll checkbox
await mPage.goto('http://localhost:5173/strategy', { waitUntil: 'networkidle' });
await mPage.waitForTimeout(400);
const firstCheckbox = mPage.locator('input[type="checkbox"]').first();
await firstCheckbox.click();
await mPage.waitForTimeout(400);
await mPage.screenshot({ path: '/tmp/screenshots/interactive-10-strategy-broll.png', fullPage: true });
console.log('✓ strategy b-roll toggled');

await mCtx.close();
await browser.close();
console.log('\nAll done.');
