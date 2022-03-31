const Queue = require('bull');

import processScraping from './scraper.worker';

const scrapingQueue = new Queue('scraper', {
  redis: process.env.REDIS_URL || 'redis:6379',
});

scrapingQueue.process(2, processScraping);

const addNewScrapingJob = (data: any) => {
  scrapingQueue.add(data);
};

export { addNewScrapingJob, scrapingQueue };
