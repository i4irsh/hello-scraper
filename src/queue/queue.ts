const Queue = require('bull');
import { REDIS_URL } from '@config';

import processIndexing from './indexer.worker';
import processScraping from './scraper.worker';

const scrapingQueue = new Queue('scraper', {
  redis: REDIS_URL || 'redis:6379',
});

const indexingQueue = new Queue('indexer', {
  redis: REDIS_URL || 'redis:6379',
});

scrapingQueue.process(2, processScraping);
indexingQueue.process(processIndexing);

const addNewScrapingJob = (data: any) => {
  scrapingQueue.add(data);
};

const addNewIndexingJob = (data: any) => {
  indexingQueue.add(data);
};

export { addNewScrapingJob, addNewIndexingJob, scrapingQueue, indexingQueue };
