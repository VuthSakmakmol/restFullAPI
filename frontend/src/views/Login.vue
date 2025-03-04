<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center">Login</h2>

      <form @submit.prevent="login">
        <!-- Email Input -->
        <div class="mt-4">
          <label class="block text-gray-700">Email</label>
          <input 
            v-model="email" 
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
            v-model="password" 
            type="password" 
            placeholder="Enter your password" 
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" 
            required 
          />
        </div>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>

        <!-- Login Button -->
        <button 
          type="submit" 
          class="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");

    const login = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/user/login", { 
          email: email.value, 
          password: password.value 
        });
        const { role } = response.data; // Get role from response

        // ✅ Store role in localStorage
        localStorage.setItem("role", role);

        // ✅ Redirect based on role
        if (role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }

        // ✅ Reload to update navbar state
        window.location.reload();
      } catch (error) {
        console.error("Login failed:", error);
        errorMessage.value = "Invalid email or password";
      }
    };

    return {
      email,
      password,
      errorMessage,
      login,
    };
  },
};
</script>
