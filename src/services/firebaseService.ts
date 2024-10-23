// src/services/firebaseService.ts
import { db } from '../firebase/index';
import { collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import  { type RSSArticle }  from '../components/types/article';

export class FirebaseService {
  private articlesCollection = collection(db, 'articles');

  async saveArticles(articles: RSSArticle[]): Promise<void> {
    for (const article of articles) {
      // Check if article already exists
      const q = query(
        this.articlesCollection, 
        where("link", "==", article.link)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        await addDoc(this.articlesCollection, {
          ...article,
          createdAt: new Date()
        });
      }
    }
  }

  async getArticles(): Promise<RSSArticle[]> {
    const querySnapshot = await getDocs(this.articlesCollection);
    return querySnapshot.docs.map(doc => doc.data() as RSSArticle);
  }
}