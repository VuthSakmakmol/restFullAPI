<template>
    <div class="min-h-screen bg-gray-100">
      <div class="container mx-auto py-12 px-6">
        <h1 class="text-4xl font-bold text-gray-800 text-center mb-8">Our Blog</h1>
        <p class="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Explore our latest articles on architectural trends, design inspirations, and industry insights.
        </p>
  
        <!-- Blog Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(post, index) in blogPosts" :key="index" class="bg-white p-6 rounded-lg shadow-lg">
            <img :src="post.image" :alt="post.title" class="w-full h-56 object-cover rounded-lg mb-4">
            <h2 class="text-2xl font-semibold text-gray-800">{{ post.title }}</h2>
            <p class="text-gray-600 mt-2">{{ post.excerpt }}</p>
            <router-link :to="`/blog/${post.id}`" class="mt-4 inline-block text-blue-600 font-medium hover:underline">
              Read More →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        blogPosts: [
          { 
            id: 1,
            title: "Modern Architecture Trends in 2024", 
            excerpt: "Discover the latest innovations shaping modern architectural design this year.", 
            image: "https://source.unsplash.com/500x300/?modern-building"
          },
          { 
            id: 2,
            title: "The Future of Sustainable Architecture", 
            excerpt: "How eco-friendly designs are revolutionizing the way we build and live.", 
            image: "https://source.unsplash.com/500x300/?green-building"
          },
          { 
            id: 3,
            title: "Interior Design Inspirations for Your Home", 
            excerpt: "Explore trending interior design styles that bring warmth and personality to spaces.", 
            image: "https://source.unsplash.com/500x300/?interior-design"
          },
          { 
            id: 4,
            title: "Minimalist Architecture: Less is More", 
            excerpt: "Understanding the beauty of simplicity in architectural design.", 
            image: "https://source.unsplash.com/500x300/?minimalist-house"
          },
          { 
            id: 5,
            title: "Reviving Traditional Architecture in Modern Homes", 
            excerpt: "Blending old-world charm with contemporary functionality.", 
            image: "https://source.unsplash.com/500x300/?traditional-architecture"
          },
          { 
            id: 6,
            title: "Why Smart Homes Are the Future of Living", 
            excerpt: "Exploring how smart technology is reshaping modern home design.", 
            image: "https://source.unsplash.com/500x300/?smart-home"
          }
        ]
      };
    }
  };
  </script>
  