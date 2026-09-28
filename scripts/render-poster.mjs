import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const htmlPath = path.resolve(__dirname, "../public/poster/index.html");
  const outPng = path.resolve(__dirname, "../public/aws-carnival-poster.png");
  const outJpg = path.resolve(__dirname, "../public/aws-carnival-poster.jpg");
  const fileUrl = "file:///" + htmlPath.replace(/\\/g, "/");

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1100, height: 1500 },
    deviceScaleFactor: 3,
  });

  await page.goto(fileUrl, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const hint = document.querySelector(".screen-hint");
    if (hint) hint.remove();
    document.body.style.background = "transparent";
    document.body.style.margin = "0";
  });

  const poster = page.locator(".poster");
  await poster.waitFor();
  await poster.screenshot({ path: outPng, type: "png" });
  await poster.screenshot({ path: outJpg, type: "jpeg", quality: 95 });

  await browser.close();

  console.log(`Wrote ${outPng} (${fs.statSync(outPng).size} bytes)`);
  console.log(`Wrote ${outJpg} (${fs.statSync(outJpg).size} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
