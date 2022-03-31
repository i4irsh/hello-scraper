import { Router } from 'express';
import UsersController from '@controllers/users.controller';
// import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import ScraperController from '@/controllers/scraper.controller';

class ScraperRoute implements Routes {
  public path = '/scraper';
  public router = Router();
  public scraperController = new ScraperController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.scraperController.getMedias);
    this.router.post(`${this.path}`, this.scraperController.scrapeImagesAndVideos);   
  }
}

export default ScraperRoute;
