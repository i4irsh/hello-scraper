import { NextFunction, Request, Response } from 'express';
import scraperService from '@/services/scraper.service';
import { Media } from '@/interfaces/media.interface';

class ScraperController {
  public scraperService = new scraperService();

  public scrapeImagesAndVideos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { urls } = req.body;      
      const scrapeImagesAndVideos: any[] = await this.scraperService.scrapeImagesAndVideos(urls);
      res.status(200).json({ data: scrapeImagesAndVideos, message: 'scrapeImagesAndVideos' });
    } catch (error) {
      next(error);
    }
  };

  public getMedias = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q: searchTerm }  = req.query;      
      // const getAllMediasData: Media[] = await this.scraperService.getAllMedias(searchTerm as string);
      const getAllMediasData: Media[] = await this.scraperService.searchMedias(searchTerm as string);
      res.status(200).json({ data: getAllMediasData, message: 'getAllMediasData' });
    } catch (error) {
      next(error);
    }
  };
}

export default ScraperController;