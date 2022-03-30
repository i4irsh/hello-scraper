import puppeteer from 'puppeteer';


class ScraperService {
  public async scrapeImagesAndVideos(urlsToScrape): Promise<any[]> {
    // return urlsToScrape.forEach(async url => {
    //     const imgURLs = await this.scrape(url);
    //     return { url, imgURLs };
    // }); 
    const result = []; 
    for (const url of urlsToScrape) {
        const imgURLs = await this.scrape(url);
        result.push({ url, imgURLs });
    }  
    return result;
  }

  private async scrape(url): Promise<string[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const imgURLs = await page.evaluate(() => Array.from(document.querySelectorAll('img'), ({ src }) => src));
    await browser.close();
    return imgURLs;
  }
}

export default ScraperService;
