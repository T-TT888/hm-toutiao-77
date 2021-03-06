/* jshint esversion: 6 */
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import Notfound from '@/views/404'
import store from '@/store'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/', name: 'welcome', component: Welcome
        },
        {
          path: '/article', name: 'article', component: Article
        },
        {
          path: '/image', name: 'image', component: Image
        },
        {
          path: '/publish', name: 'publish', component: Publish
        },
        {
          path: '/comment', name: 'comment', component: Comment
        }
      ]
    },
    { path: '*', name: '404', component: Notfound }
  ]
})
router.beforeEach((to, from, next) => {
  // if (to.path === '/login') return next()
  // if (!store.getUser().token) return next('/login')
  // next()
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router
