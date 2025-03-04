<template>
  <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
    <div class="container mx-auto flex justify-between items-center p-4">
      <!-- Logo -->
      <router-link to="/">
        <img src="" alt="Logo" class="h-10">
      </router-link>

      <!-- Hamburger Icon (Mobile Menu) -->
      <button @click="toggleMenu" class="lg:hidden focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex space-x-4">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path" 
          class="px-4 py-2 font-semibold uppercase text-black transition-all duration-200 rounded-md"
          :class="{ 'bg-gray-300': route.path === link.path }"
        >
          {{ link.name }}
        </router-link>

        <!-- Admin Dashboard (only for admins) -->
        <router-link 
          v-if="role === 'admin'" 
          to="/admin/dashboard" 
          class="px-4 py-2 font-semibold uppercase text-black transition-all duration-200 rounded-md"
          :class="{ 'bg-gray-300': route.path === '/admin/dashboard' }"
        >
          Admin Dashboard
        </router-link>
      </div>

      <!-- Authentication Buttons -->
      <div class="hidden lg:flex space-x-4">
        <router-link v-if="!role" to="/register" class="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 text-white">
          Register
        </router-link>
        <router-link v-if="!role" to="/login" class="bg-green-500 px-4 py-2 rounded hover:bg-green-600 text-white">
          Login
        </router-link>
        <button v-if="role" @click="logout" class="bg-red-500 px-4 py-2 rounded hover:bg-red-600 text-white">
          Logout
        </button>
      </div>
    </div>

    <!-- Mobile Navigation (Hidden by Default) -->
    <div v-if="menuOpen" class="lg:hidden bg-white border-t shadow-md">
      <div class="flex flex-col items-center py-4 space-y-4">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path" 
          class="text-black text-lg font-semibold"
          @click="toggleMenu"
        >
          {{ link.name }}
        </router-link>

        <!-- Admin Dashboard (only for admins) -->
        <router-link 
          v-if="role === 'admin'" 
          to="/admin/dashboard" 
          class="text-black text-lg font-semibold"
          @click="toggleMenu"
        >
          Admin Dashboard
        </router-link>

        <!-- Authentication Buttons -->
        <router-link v-if="!role" to="/register" class="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 text-white">
          Register
        </router-link>
        <router-link v-if="!role" to="/login" class="bg-green-500 px-4 py-2 rounded hover:bg-green-600 text-white">
          Login
        </router-link>
        <button v-if="role" @click="logout" class="bg-red-500 px-4 py-2 rounded hover:bg-red-600 text-white">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const role = ref(localStorage.getItem("role") || null);
    const menuOpen = ref(false);

    // Watch localStorage to dynamically update role
    watch(() => localStorage.getItem("role"), (newRole) => {
      role.value = newRole;
    });

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    const logout = () => {
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      role.value = null;
      router.push("/");
      window.location.reload(); // Refresh to update navbar
    };

    return {
      route,
      role,
      menuOpen,
      toggleMenu,
      logout,
      navLinks: [
        { name: "Home", path: "/" },
        { name: "Product", path: "/product" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Blog", path: "/blog" },
        { name: "FAQ", path: "/faq" },
        { name: "Contact", path: "/contact" },
      ]
    };
  }
};
</script>
