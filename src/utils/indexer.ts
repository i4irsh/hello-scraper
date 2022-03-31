import { MeiliSearch } from 'meilisearch';
import scraperService from '@/services/scraper.service';

const client = new MeiliSearch({
  host: 'http://127.0.0.1:7700',
});

const indexMedias = async (id: number): Promise<any> => {
  const index = client.index('media');
  const documents = await new scraperService().getAllMediasByParentId(id);
  await index.addDocuments(documents);
  return Promise.resolve();
};

const searchMedias = async (searchTerm: string): Promise<any> => {
    const index = client.index('media');
    const searchResults = await index.search(searchTerm);
    return Promise.resolve(searchResults.hits);
  };

export { indexMedias, searchMedias };
