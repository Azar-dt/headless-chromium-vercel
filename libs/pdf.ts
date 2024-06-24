import { chromium as playwrightChromium } from "playwright";

export const createPdf = async (pdfGenerateUrl: string): Promise<Buffer> => {
  // const executablePath = await chromium.executablePath(
  //   'https://github.com/Sparticuz/chromium/releases/download/v123.0.0/chromium-v123.0.0-pack.tar',
  // );

  // const browser = await playwrightChromium.launch({
  //   args: chromium.args,
  //   executablePath,
  //   headless: true,
  // });

  // const browser = await playwright.chromium.launch();
  console.info("start pdf generation");

  const browser = await playwrightChromium.launch();

  console.info("browser launched");

  // const context = await browser.newContext();

  const page = await browser.newPage();

  await page.goto(pdfGenerateUrl, {
    waitUntil: "networkidle", // wait until there are no more than 0 network connections for at least 500 ms
  });

  // await page.emulateMediaType('screen');

  await page.emulateMedia({
    media: "screen",
  });

  // When the PDF becomes more than two pages, the margin of the second and subsequent PDFs is not reflected correctly, so use the margin setting on the puppeteer side.
  const pdfBuffer = await page.pdf({
    format: "a4",
    scale: 0.8,
    printBackground: true,
    // margin top and bottom to show page number and watermark
    margin: {
      top: "5mm",
      bottom: "22mm",
    },
    // bottom show page number and watermark text
    displayHeaderFooter: true,
    // show on the bottom right
    // font size is 10px
    footerTemplate: `
      <span style="font-size: 10px; margin: auto;">
        <span class="pageNumber"></span>/<span class="totalPages"></span>
        ©️DevJob
      </span>
    `,
    path: "pdf.pdf",
  });

  await browser.close();

  return pdfBuffer;
};
