import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import PortfolioSlider from '@/pages/PortfolioSlider'
import Project from '@/pages/Project'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: PortfolioSlider
    },
    {
      path: '/portfolio/:id',
      name: 'Project',
      component: Project
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
})

export default router
