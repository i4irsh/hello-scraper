import puppeteer from 'puppeteer';

const scrapeURL =  async (url: string): Promise<string[]> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  const imgURLs = await page.evaluate(() => Array.from(document.querySelectorAll('img'), ({ src }) => src));
  await browser.close();
  return imgURLs;
}

export default scrapeURL;
