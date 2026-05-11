/* eslint-disable @typescript-eslint/no-var-requires */
const { PDFDocument, StandardFonts, rgb, PDFString, PDFName } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

const URL = "https://junhyeong7083.github.io/PortFolio/#";
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "portfolio-pdfs");
const OUTPUT = path.join(OUT_DIR, "portfolio-combined.pdf");

const FILES = [
  "00-main.pdf",
  "01-history.pdf",
  "02-escape.pdf",
  "03-sushi-master.pdf",
  "04-rl-npc.pdf",
];

async function main() {
  for (const f of FILES) {
    const p = path.join(OUT_DIR, f);
    if (!fs.existsSync(p)) {
      console.error(`\n❌ 파일이 없습니다: ${p}`);
      console.error("   먼저 dev 서버를 띄우고 npm run pdf 를 실행해주세요.\n");
      process.exit(1);
    }
  }

  const merged = await PDFDocument.create();
  const helv = await merged.embedFont(StandardFonts.Helvetica);
  const helvBold = await merged.embedFont(StandardFonts.HelveticaBold);

  const cover = merged.addPage([595.28, 841.89]);
  const W = cover.getWidth();
  const H = cover.getHeight();

  cover.drawRectangle({
    x: 0,
    y: 0,
    width: W,
    height: H,
    color: rgb(0.05, 0.07, 0.12),
  });

  const titleText = "PORTFOLIO";
  const titleSize = 60;
  const tw = helvBold.widthOfTextAtSize(titleText, titleSize);
  cover.drawText(titleText, {
    x: (W - tw) / 2,
    y: H / 2 + 90,
    size: titleSize,
    font: helvBold,
    color: rgb(1, 1, 1),
  });

  const authorText = "Park Junhyeong";
  const aSize = 22;
  const aw = helv.widthOfTextAtSize(authorText, aSize);
  cover.drawText(authorText, {
    x: (W - aw) / 2,
    y: H / 2 + 40,
    size: aSize,
    font: helv,
    color: rgb(0.72, 0.74, 0.82),
  });

  cover.drawLine({
    start: { x: W / 2 - 60, y: H / 2 + 10 },
    end: { x: W / 2 + 60, y: H / 2 + 10 },
    thickness: 1,
    color: rgb(0.4, 0.5, 0.85),
  });

  const labelText = "Live Web Portfolio";
  const lSize = 12;
  const lw = helv.widthOfTextAtSize(labelText, lSize);
  cover.drawText(labelText, {
    x: (W - lw) / 2,
    y: H / 2 - 30,
    size: lSize,
    font: helv,
    color: rgb(0.65, 0.67, 0.75),
  });

  const urlSize = 14;
  const urlW = helv.widthOfTextAtSize(URL, urlSize);
  const urlX = (W - urlW) / 2;
  const urlY = H / 2 - 60;
  cover.drawText(URL, {
    x: urlX,
    y: urlY,
    size: urlSize,
    font: helv,
    color: rgb(0.42, 0.62, 1),
  });
  cover.drawLine({
    start: { x: urlX, y: urlY - 2 },
    end: { x: urlX + urlW, y: urlY - 2 },
    thickness: 0.7,
    color: rgb(0.42, 0.62, 1),
  });

  const linkAnnotation = merged.context.register(
    merged.context.obj({
      Type: "Annot",
      Subtype: "Link",
      Rect: [urlX - 4, urlY - 6, urlX + urlW + 4, urlY + urlSize + 2],
      Border: [0, 0, 0],
      A: {
        Type: "Action",
        S: "URI",
        URI: PDFString.of(URL),
      },
    }),
  );
  cover.node.set(PDFName.of("Annots"), merged.context.obj([linkAnnotation]));

  const hintText = "Click the link above to open the interactive portfolio";
  const hSize = 9;
  const hw = helv.widthOfTextAtSize(hintText, hSize);
  cover.drawText(hintText, {
    x: (W - hw) / 2,
    y: H / 2 - 95,
    size: hSize,
    font: helv,
    color: rgb(0.5, 0.52, 0.6),
  });

  const tocLabel = "Contents";
  const tlSize = 11;
  const tlw = helvBold.widthOfTextAtSize(tocLabel, tlSize);
  cover.drawText(tocLabel, {
    x: (W - tlw) / 2,
    y: 200,
    size: tlSize,
    font: helvBold,
    color: rgb(0.85, 0.86, 0.9),
  });

  const tocItems = [
    "1.  Main",
    "2.  History",
    "3.  Escape",
    "4.  Sushi Master",
    "5.  RL Co-op NPC",
  ];
  const itSize = 11;
  let lineY = 175;
  for (const it of tocItems) {
    const iw = helv.widthOfTextAtSize(it, itSize);
    cover.drawText(it, {
      x: (W - iw) / 2,
      y: lineY,
      size: itSize,
      font: helv,
      color: rgb(0.7, 0.72, 0.8),
    });
    lineY -= 18;
  }

  console.log("\n📑 PDF 병합 시작\n");
  console.log("✓ Cover page (clickable URL)");

  for (const file of FILES) {
    const bytes = fs.readFileSync(path.join(OUT_DIR, file));
    const doc = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    for (const p of pages) merged.addPage(p);
    console.log(`✓ ${file.padEnd(28, " ")} (${doc.getPageCount()} pages)`);
  }

  merged.setTitle("Park Junhyeong — Portfolio");
  merged.setAuthor("Park Junhyeong");
  merged.setSubject("Portfolio");
  merged.setKeywords(["portfolio", "unity", "game development"]);
  merged.setProducer("pdf-lib");
  merged.setCreator("portfolio-combined script");

  const bytes = await merged.save();
  fs.writeFileSync(OUTPUT, bytes);

  console.log(`\n✅ 완료: ${OUTPUT}`);
  console.log(`   총 ${merged.getPageCount()} 페이지\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
