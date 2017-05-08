import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/view/Dashboard'
import Detail from '@/view/ArticleDetail'

Vue.use(Router)

// const Dashboard = r => require.ensure([], () => r(require('@/view/Dashboard')), 'group-dashboard')
// const Detail = r => require.ensure([], () => r(require('@/view/ArticleDetail')), 'group-detail')

export default new Router({
  mode: 'hash',
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
