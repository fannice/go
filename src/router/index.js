import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/page/ShoppingMall'
import register from '@/components/page/register'
import login from '@/components/page/login'
import goods from '@/components/page/goods'
import categorylist from '@/components/page/categorylist'
import cart from '@/components/page/cart'
import footernav from '@/components/page/footernav'
import personal from '@/components/page/personal'
import error from '@/components/page/error404'
Vue.use(Router)

export default new Router({
  
  routes: [
   
    {
      path: '/',
      name: 'footernav',
      component: footernav,
      children:[
        {
          path: '/',
          name: 'ShoppingMall',
          component: ShoppingMall
        },
        {
          path: '/personal',
          name: 'personal',
          component: personal
        },
        
    {
      path: '/categorylist',
      name: 'categorylist',
      component: categorylist
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    }
      ]
    },
    
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path:'*',
      name: 'error',
      component: error
    }
   
  ]
})
