// src/controllers/scraperController.ts
import { RSSService } from '../services/rssService';
import { FirebaseService } from '../services/firebaseService';

export class ScraperController {
  private rssService: RSSService;
  private firebaseService: FirebaseService;

  constructor() {
    this.rssService = new RSSService();
    this.firebaseService = new FirebaseService();
  }

  async runScraper() {
    try {
      // 1. Fetch and parse RSS feeds
      const articles = await this.rssService.fetchAndParseFeeds();
      
      // 2. Save to Firebase
      await this.firebaseService.saveArticles(articles);
      
      // 3. Return success
      return { success: true, articlesProcessed: articles.length };
    } catch (error) {
      console.error('Error in scraper:', error);
      return { success: false, error };
    }
  }
}