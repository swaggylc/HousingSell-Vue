import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import first from '../components/first.vue'
import second from '../components/second.vue'
import cus from '../components/cus.vue'
import fan from '../components/fan.vue'
import liu from '../components/liu.vue'
Vue.use(VueRouter)

const routes = [
  {path:'/Login',component:Login},
  {path:'/',redirect:'/Login'},
  {path:'/user',component:first},
  {path:'/second',component:second,
  children:[{path:'/cus',component:cus},
  {path:'/fan',component:fan},
  {path:'/liu',component:liu}] }
  
]

const router = new VueRouter({
  routes
})

export default router
