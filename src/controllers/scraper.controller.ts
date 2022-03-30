import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import scraperService from '@/services/scraper.service';

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
}

export default ScraperController;