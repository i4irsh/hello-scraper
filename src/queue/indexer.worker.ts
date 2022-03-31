import scraperService from '@/services/scraper.service';
import { Job } from 'bull';
import { logger } from '@utils/logger';
import { indexMedias } from '@/utils/indexer';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const processIndexing = async (job: Job) => {
  const { id, url, imgURLs } = job.data;
  const scrapedRecord = await new scraperService().getScrapingStatus(id);
  if (scrapedRecord.status == 'FINISHED') {
    logger.info(`=========================================================================`);
    logger.info(`============== 🚀 Indexing STARTED ||  URL: ${scrapedRecord.url} ====================`);
    await indexMedias(id);
    // await (new scraperService()).saveIndexingResult(url, imgURLs);
    await sleep(20000);
    logger.info(`=============== Indexing COMPLETED ||  URL: ${scrapedRecord.url} ====================`);
  }
  return Promise.resolve();
};

export default processIndexing;
