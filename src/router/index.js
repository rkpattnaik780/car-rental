import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import CarDetails from '@/components/CarDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/cars',
      name: 'CarDetails',
      component: CarDetails
    }
  ]
})
