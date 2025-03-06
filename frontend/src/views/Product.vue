<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const router = useRouter();

// Fetch products from backend API
const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/products");
    if (!response.ok) throw new Error("Failed to fetch product data");
    products.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Navigate to product detail page
const viewProductDetail = (productName) => {
  router.push(`/product/${encodeURIComponent(productName)}`);
};

// Fetch products on mount
onMounted(fetchProducts);
</script>

<template>
  <div class="min-h-screen bg-white py-16 mt-20">
    <div class="container mx-auto px-6 md:px-12 lg:px-24">
      <h1 class="text-4xl font-bold text-gray-900 text-center mb-16">Our Architectural Styles</h1>

      <!-- Loading -->
      <div v-if="loading" class="text-center text-lg font-semibold text-gray-600">Loading products...</div>

      <!-- Error -->
      <div v-if="error" class="text-center text-red-500 font-semibold">{{ error }}</div>

      <!-- Product List -->
      <div v-else class="space-y-16">
        <div v-for="(product, index) in products" :key="index" class="flex flex-col md:flex-row items-center" :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">
          <img 
            :src="product.images[0]" 
            :alt="product.name" 
            class="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-lg"
          />
          <div class="mt-4 md:mt-0 md:w-1/2 md:px-8">
            <h2 class="text-2xl font-semibold text-gray-900 uppercase">{{ product.name }}</h2>
            <p class="text-gray-600 mt-2">{{ product.description }}</p>
            <router-link 
              :to="`/product/${encodeURIComponent(product.name)}`" 
              class="mt-4 inline-block text-blue-600 font-medium hover:underline"
            >
              See Details →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Adjust image width for larger screens */
@media (min-width: 768px) {
  img {
    max-width: 500px;
  }
}
</style>
