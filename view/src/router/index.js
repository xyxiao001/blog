import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/view/Dashboard'
import Detail from '@/view/ArticleDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
