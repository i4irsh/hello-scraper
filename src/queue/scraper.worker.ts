import scraperService from "@/services/scraper.service";
import scrapeURL from "@/utils/scraper";
import { Job } from "bull";
import { logger } from '@utils/logger';
import { addNewIndexingJob } from "./queue";

const sleep = ms => new Promise(r => setTimeout(r, ms));

const processScraping = async (job: Job) => {    
    const { id, url } = job.data;
    logger.info(`=========================================================================`);
    logger.info(`============== 🚀 SCRAPING STARTED ||  URL: ${ url } ====================`);
    const imgURLs = await scrapeURL(url);
    await (new scraperService()).saveScrapingResult(id, url, imgURLs);
    await addNewIndexingJob({ id, url, imgURLs });
    await sleep(15000);
    logger.info(`=============== SCRAPING COMPLETED ||  URL: ${ url } ====================`);
    return Promise.resolve();
};

export default processScraping;