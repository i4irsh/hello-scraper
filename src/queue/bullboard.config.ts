import { scrapingQueue } from "./scraper.queue";
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const serverAdapter = new ExpressAdapter();

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(scrapingQueue)],
  serverAdapter: serverAdapter,
});

serverAdapter.setBasePath('/admin/queues');

export { serverAdapter };
