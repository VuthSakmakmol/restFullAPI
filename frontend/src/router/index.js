import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Login from '../views/Login.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import Services from '../views/Services.vue';
import Product from '../views/Product.vue';
import ProductDetail from "../views/ProductDetail.vue";
import ProductEdit from "../views/ProductEdit.vue";
import Blog from '../views/Blog.vue';
import FAQ from '../views/FAQ.vue';
import Contact from '../views/Contact.vue';
import Register from '../views/Register.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/login', component: Login },
  { 
    path: '/admin/dashboard', 
    component: AdminDashboard,
    meta: { requiresAdmin: true } // ✅ Protect this route
  },
  { path: "/products", component: Product },
  { path: "/product/:name", component: ProductDetail },
  { path: "/product/:name/edit", component: ProductEdit },


  { path: '/services', component: Services },
  { path: '/product', component: Product },
  { path: '/blog', component: Blog },
  { path: '/faq', component: FAQ },
  { path: '/contact', component: Contact },
  { path: '/register', component: Register }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// ✅ Navigation Guard: Only allow admin access to the dashboard
router.beforeEach((to, from, next) => {
  const isAdmin = localStorage.getItem("role") === "admin";
  if (to.meta.requiresAdmin && !isAdmin) {
    alert("🚫 Access Denied: Admins only.");
    return next('/'); // Redirect non-admins to home
  }
  next();
});

export default router;
