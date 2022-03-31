import puppeteer from 'puppeteer';
import DB from '@databases';
import { Scraper } from '@/interfaces/scraper.interface';

class ScraperService {
  
  public scraper = DB.Scraper;
  public media = DB.Media;

  public async scrapeImagesAndVideos(urlsToScrape): Promise<any[]> {
    // return urlsToScrape.forEach(async url => {
    //     const imgURLs = await this.scrape(url);
    //     return { url, imgURLs };
    // }); 
    const result = []; 
    for (const url of urlsToScrape) {
        const imgURLs = await this.scrape(url);
        result.push({ url, imgURLs });
        const scraperRecordCreated: Scraper = await this.scraper.create({ url, status: 'FINISHED' });        
        await this.media.bulkCreate(imgURLs.map(imgURL => ({ url: imgURL, type: 'IMAGE', scraperUrlId: scraperRecordCreated.id })));
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
