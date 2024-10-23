// src/components/ArticleList.vue
<template>
  <div class="article-list">
    <div v-for="article in articles" :key="article.link" class="article-card">
      <h2>{{ article.title }}</h2>
      <p>{{ article.description }}</p>
      <div class="article-meta">
        <span>{{ formatDate(article.pubDate) }}</span>
        <span>Source: {{ article.source }}</span>
      </div>
      <a :href="article.link" target="_blank">Read More</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FirebaseService } from '../services/firebaseService';
import { RSSArticle } from '../types/article';

const articles = ref<RSSArticle[]>([]);
const firebaseService = new FirebaseService();

onMounted(async () => {
  articles.value = await firebaseService.getArticles();
});

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString();
};
</script>