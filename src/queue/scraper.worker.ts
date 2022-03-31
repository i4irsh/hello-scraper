import scraperService from "@/services/scraper.service";
import scrapeURL from "@/utils/scraper";
import { Job } from "bull";
import { logger } from '@utils/logger';

const processScraping = async (job: Job) => {    
    const { url } = job.data;
    logger.info(`=========================================================================`);
    logger.info(`============== 🚀 SCRAPING STARTED ||  URL: ${ url } ====================`);
    const imgURLs = await scrapeURL(url);
    await (new scraperService()).saveScrapingResult(url, imgURLs);  
    logger.info(`=============== SCRAPING COMPLETED ||  URL: ${ url } ====================`);
    return Promise.resolve();
};

export default processScraping;