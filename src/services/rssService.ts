// src/services/rssService.ts
import { db } from '../firebase/index';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { type RSSArticle } from '../components/types/article';

export class RSSService {
  private feeds = [
    "https://www.aero-news.net/news/rssfeed.xml",
    "https://theaviationist.com/feed/",
    "https://www.airlinereporter.com/feed/"
  ];

  async fetchAndParseFeeds(): Promise<RSSArticle[]> {
    const articles: RSSArticle[] = [];
    
    for (const feed of this.feeds) {
      try {
        const response = await fetch(feed);
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        
        const items = xmlDoc.querySelectorAll("item");
        
        items.forEach((item) => {
          const article: RSSArticle = {
            title: item.querySelector("title")?.textContent || "",
            description: item.querySelector("description")?.textContent || "",
            link: item.querySelector("link")?.textContent || "",
            pubDate: new Date(item.querySelector("pubDate")?.textContent || ""),
            source: feed
          };
          
          articles.push(article);
        });
      } catch (error) {
        console.error(`Error fetching feed ${feed}:`, error);
      }
    }
    
    return articles;
  }
}