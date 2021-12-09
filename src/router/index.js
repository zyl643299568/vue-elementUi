import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import index from '@/views/layout/index.vue'
import login from '@/views/login/index.vue'
import home from '@/views/home.vue'
import mergeTable from '@/views/mergeTable.vue'
import quillEditor from '@/views/quillEditor/index.vue'

Vue.use(Router)
Vue.use(ElementUI)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: home
        }
      ]
    },
    {
      path: '/mergeTable',
      name: 'mergeTable',
      component: mergeTable
    },
    {
      path: '/quillEditor',
      name: 'quillEditor',
      component: quillEditor
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') next()
  // const tokenStr = sessionStorage.getItem("token");
  // if (!tokenStr) next("/login")
  next()
})

export default router
