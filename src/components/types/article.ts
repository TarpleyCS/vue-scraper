export interface RSSArticle {
  title: string;
  description: string;
  link: string;
  pubDate: Date;
  headline?: string;
  articleText?: string;
  summary?: string;
  source: string;
  relevanceScore?: number;
}