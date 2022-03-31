import DB from '@databases';
import { Scraper } from '@/interfaces/scraper.interface';
import { Media } from '@/interfaces/media.interface';
import { Op } from 'sequelize';
import { addNewScrapingJob } from '@/queue/queue';
import { searchMedias } from '@/utils/indexer';

class ScraperService {
  public scraper = DB.Scraper;
  public media = DB.Media;

  public async scrapeImagesAndVideos(urlsToScrape): Promise<any> {
    for (const url of urlsToScrape) {
      const scraperRecordCreated: Scraper = await this.scraper.create({ url, status: 'STARTED' });
      await addNewScrapingJob({ id: scraperRecordCreated.id, url });
    }
    return 'scraping job added';
  }

  public async getScrapingStatus(id: number): Promise<Scraper> {
    const scraperRecord: Scraper = await this.scraper.findOne({ where: { id } });
    return scraperRecord;
  }

  public async saveScrapingResult(id: number, url: string, imgURLs: string[]) {    
    await this.media.bulkCreate(imgURLs.map(imgURL => ({ url: imgURL, type: 'IMAGE', scraperUrlId: id })));
    await this.scraper.update({ status: 'FINISHED' }, { where: { id } });
  }

  public async getAllMedias(searchTerm: string): Promise<Media[]> {
    const whereClause = searchTerm ? { url: { [Op.substring]: searchTerm } } : {};
    const allMedias: Media[] = await this.media.findAll({ where: whereClause, order: [['id', 'DESC']] });
    return allMedias;
  }

  public async searchMedias(searchTerm: string): Promise<any> {
    // await this.media.findAll({ where: whereClause, order: [['id', 'DESC']] });    
    return await searchMedias(searchTerm);
  }

  public async getAllMediasByParentId(id: number): Promise<Media[]> {
    const allMedias: Media[] = await this.media.findAll({ where: { scraperUrlId: id }});
    return allMedias;
  }
}

export default ScraperService;
