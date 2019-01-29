import Vue from 'vue'
import Router from 'vue-router'
import tabla from './components/Tabla.vue'
import Otro from  './components/Otro.vue'
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
        path: '/tabla',
        name :'tabla',
        component: tabla        
    },
    {
        path:'/otro',
        name:'otro',
        component: Otro
    }
]});