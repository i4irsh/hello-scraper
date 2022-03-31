import { indexingQueue, scrapingQueue } from './queue';
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const serverAdapter = new ExpressAdapter();

createBullBoard({
  queues: [new BullAdapter(scrapingQueue), new BullAdapter(indexingQueue)],
  serverAdapter: serverAdapter,
});

serverAdapter.setBasePath('/admin/queues');

export { serverAdapter };
