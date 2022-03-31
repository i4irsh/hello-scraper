import DB from '@databases';
import { Scraper } from '@/interfaces/scraper.interface';
import { Media } from '@/interfaces/media.interface';
import { Op } from 'sequelize';
import { addNewScrapingJob } from '@/queue/scraper.queue';

class ScraperService {
  public scraper = DB.Scraper;
  public media = DB.Media;

  public async scrapeImagesAndVideos(urlsToScrape): Promise<any> {
    // const result = [];
    for (const url of urlsToScrape) {
      await addNewScrapingJob({ url });
      // const imgURLs = await this.scrape(url);
      // const imgURLs = await scrapeURL(url);
      // result.push({ url, imgURLs });
      // const scraperRecordCreated: Scraper = await this.scraper.create({ url, status: 'FINISHED' });
      // await this.media.bulkCreate(imgURLs.map(imgURL => ({ url: imgURL, type: 'IMAGE', scraperUrlId: scraperRecordCreated.id })));
    }
    return 'scraping job added';
  }

  public async saveScrapingResult(url: string, imgURLs: string[]) {
    const scraperRecordCreated: Scraper = await this.scraper.create({ url, status: 'FINISHED' });
    await this.media.bulkCreate(imgURLs.map(imgURL => ({ url: imgURL, type: 'IMAGE', scraperUrlId: scraperRecordCreated.id })));
  }

  public async getAllMedias(searchTerm: string): Promise<Media[]> {
    const whereClause = searchTerm ? { url: { [Op.substring]: searchTerm } } : {};
    const allMedias: Media[] = await this.media.findAll({ where: whereClause, order: [['id', 'DESC']] });
    return allMedias;
  }
}

export default ScraperService;
