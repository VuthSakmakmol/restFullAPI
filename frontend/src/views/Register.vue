<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center">Register</h2>

      <form @submit.prevent="registerUser">
        <!-- Username Input -->
        <div class="mt-4">
          <label class="block text-gray-700">Username</label>
          <input 
            v-model="user.username" 
            type="text" 
            placeholder="Enter your username" 
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" 
            required 
          />
        </div>

        <!-- Email Input -->
        <div class="mt-4">
          <label class="block text-gray-700">Email</label>
          <input 
            v-model="user.email" 
            type="email" 
            placeholder="Enter your email" 
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" 
            required 
          />
        </div>

        <!-- Password Input -->
        <div class="mt-4">
          <label class="block text-gray-700">Password</label>
          <input 
            v-model="user.password" 
            type="password" 
            placeholder="Enter your password" 
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" 
            required 
          />
        </div>

        <!-- Register Button -->
        <button 
          type="submit" 
          class="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const user = ref({ username: "", email: "", password: "" });
    const errorMessage = ref("");

    const registerUser = async () => {
      try {
        await axios.post("http://localhost:5000/api/user/register", user.value);
        alert("Registration successful!");
        
        // Automatically store role as "user" and redirect to home
        localStorage.setItem("role", "user");
        localStorage.setItem("email", user.value.email);
        router.push("/");
        window.location.reload();
      } catch (error) {
        console.error("Registration failed:", error.response?.data || error.message);
        errorMessage.value = "Registration failed. Please try again.";
      }
    };

    return {
      user,
      errorMessage,
      registerUser
    };
  },
};
</script>

<style scoped>
input {
  outline: none;
}
</style>
