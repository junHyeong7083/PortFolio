/* eslint-disable @typescript-eslint/no-var-requires */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const BASE = `http://localhost:${PORT}`;
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "portfolio-pdfs");
const PORTFOLIOS_DIR = path.join(ROOT, "data", "portfolios");

const PDF_OPTIONS = {
  format: "A4",
  printBackground: true,
  margin: { top: "12mm", bottom: "12mm", left: "10mm", right: "10mm" },
  preferCSSPageSize: false,
};

async function waitForRender(page) {
  try {
    await page.evaluateHandle("document.fonts.ready");
  } catch {}
  await new Promise((r) => setTimeout(r, 2000));
}

async function urlToPdf(browser, url, outPath) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1800, deviceScaleFactor: 2 });
  await page.emulateMediaType("print");
  await page.goto(url, { waitUntil: "networkidle0", timeout: 90000 });
  await waitForRender(page);
  await page.pdf({ path: outPath, ...PDF_OPTIONS });
  await page.close();
}

function loadPortfolios() {
  return fs
    .readdirSync(PORTFOLIOS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const data = JSON.parse(fs.readFileSync(path.join(PORTFOLIOS_DIR, f), "utf8"));
      return {
        id: f.replace(/\.json$/, ""),
        order: data.order || 99,
        title: data.title || f,
      };
    })
    .sort((a, b) => a.order - b.order);
}

async function checkServer() {
  const http = require("http");
  return new Promise((resolve) => {
    const req = http.get(BASE, () => resolve(true));
    req.on("error", () => resolve(false));
    req.setTimeout(3000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function main() {
  const alive = await checkServer();
  if (!alive) {
    console.error(`\n❌ ${BASE} 에 접속할 수 없습니다.`);
    console.error("   다른 터미널에서 먼저 dev 서버를 실행해주세요:");
    console.error("     npm run dev\n");
    process.exit(1);
  }

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const portfolios = loadPortfolios();

  console.log(`\n🎯 PDF 생성 시작 (총 ${portfolios.length + 1}개)\n`);

  const browser = await puppeteer.launch({ headless: "new" });

  try {
    const mainOut = path.join(OUT_DIR, "00-main.pdf");
    console.log(`📄 메인 페이지              → ${path.basename(mainOut)}`);
    await urlToPdf(browser, `${BASE}/?print=1`, mainOut);

    for (const p of portfolios) {
      const file = `${String(p.order).padStart(2, "0")}-${p.id}.pdf`;
      const outPath = path.join(OUT_DIR, file);
      console.log(`📄 ${p.title.padEnd(24, " ")}→ ${file}`);
      await urlToPdf(browser, `${BASE}/portfolio/${p.id}?print=1`, outPath);
    }
  } finally {
    await browser.close();
  }

  console.log(`\n✅ 완료! 출력 경로: ${OUT_DIR}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
