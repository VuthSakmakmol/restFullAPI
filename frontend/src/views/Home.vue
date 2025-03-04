<template>
  <div class="min-h-screen bg-gray-100 relative">
    <!-- Hero Section -->
    <div class="relative w-full h-[700px] overflow-hidden">
      <!-- Auto-sliding images -->
      <div
        v-for="(image, index) in images"
        :key="index"
        class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
        :style="{ backgroundImage: `url(${image})`, opacity: index === activeIndex ? 1 : 0 }"
      ></div>

      <!-- Overlay and Text -->
      <div class="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/30"></div>
      <div class="absolute inset-0 flex flex-col justify-center items-center text-center">
        <h1 class="text-7xl font-extrabold text-white drop-shadow-lg leading-tight">
          {{ title }}
        </h1>
        <button class="mt-8 bg-black text-white px-8 py-4 text-lg rounded-lg shadow-lg hover:bg-gray-800 transition">
          + VIEW MORE
        </button>
        <p class="text-2xl font-semibold text-white drop-shadow-lg mt-4">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      activeIndex: 0,
      images: [],
      title: "Loading...",
      description: "Fetching data...",
      intervalId: null,
    };
  },
  async mounted() {
    await this.fetchHomepageData();

    // Start the image slider interval
    this.startImageSlider();
  },
  beforeUnmount() {
    // Clear the interval when component is unmounted
    clearInterval(this.intervalId);
  },
  methods: {
    async fetchHomepageData() {
      try {
        const response = await axios.get("http://localhost:5000/api/homepage");
        console.log("✅ API Response:", response.data);
        if (response.data && response.data.content) {
          this.images = [
            response.data.content.image1,
            response.data.content.image2,
            response.data.content.image3,
          ].filter(img => img); // Remove empty values
          this.title = response.data.content.title || "No Title";
          this.description = response.data.content.description || "No Description";

          // Restart the slider if new images are available
          if (this.images.length > 1) {
            this.startImageSlider();
          }
        } else {
          console.error("🚨 Incorrect Data Structure:", response.data);
        }
      } catch (error) {
        console.error("❌ Error fetching homepage data:", error);
        this.title = "Error loading data";
      }
    },
    startImageSlider() {
      // Stop previous interval if exists
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

      // Start new interval to update images every 3 seconds
      this.intervalId = setInterval(() => {
        this.activeIndex = (this.activeIndex + 1) % this.images.length;
      }, 3000);
    },
  },
};
</script>

<style scoped>
h1, h2, h3 {
  font-family: 'Poppins', sans-serif;
}
</style>
