import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import index from '@/views/layout/index.vue'
import login from '@/views/login/index.vue'

Vue.use(Router)
Vue.use(ElementUI)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
router.beforeEach((to, from, next) => {
  // if (to.path === '/login') next()
  // const tokenStr = sessionStorage.getItem("token");
  // if (!tokenStr) next("/login")
  next()
})

export default router
