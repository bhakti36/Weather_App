import Vue from 'vue'
import VueRouter from 'vue-router'
// import SearchCity from '../views/SearchCity.vue'
import '@fortawesome/fontawesome-free/css/all.css';

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'searchcity',
  //   component: SearchCity
  // }
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
