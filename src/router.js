import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './views/index.vue'

Vue.use(VueRouter)

const Routes = [{
  path: '/',
  redirect: '/phaser-demo',
  name: 'index',
  component: Index,
  children: [{
    path: 'foo',
    name: 'foo',
    component: () => import(/* webpackChunkName: "foo" */ './views/foo.vue')
  },
  {
    path: 'bar',
    name: 'bar',
    component: () => import(/* webpackChunkName: "bar" */ './views/bar.vue')
  }, {
    path: 'user/:id',
    name: 'user',
    props: true,
    component: () => import(/* webpackChunkName: "user" */ './views/user.vue')
  }]
}, {
  path: '/vuex',
  name: 'vuex',
  component: () => import(/* webpackChunkName: "vuex" */ './views/vuex.vue')
}, {
  path: '/lianxi',
  name: 'lianxi',
  component: () => import(/* webpackChunkName: "lianxi" */ './views/lianxi.vue')
}, {
  path: '/canvas',
  name: 'canvas',
  component: () => import(/* webpackChunkName: "canvas" */ './canvas/basic-knowledge.vue')
}, {
  path: '/transform-related',
  name: 'transform-related',
  component: () => import(/* webpackChunkName: "canvas" */ './canvas/transform-related-knowledge.vue')
}, {
  path: '/threeJs',
  name: 'threeJs',
  component: () => import(/* webpackChunkName: "canvas" */ './views/threeJs.vue')
}, {
  path: '/knova',
  name: 'knova',
  component: () => import(/* webpackChunkName: "canvas" */ './views/konva.vue')
}, {
  path: '/mark',
  name: 'mark',
  component: () => import(/* webpackChunkName: "canvas" */ './views/mark/mark.vue')
}, {
  path: '/svg',
  name: 'svg',
  component: () => import(/* webpackChunkName: "canvas" */ './views/svg.vue')
}, {
  path: '/phaser-demo',
  name: 'phaser-demo',
  component: () => import(/* webpackChunkName: "canvas" */ './views/phaser-demo.vue')
}, {

  path: '/phase',
  name: 'phaser',
  component: () => import(/* webpackChunkName: "canvas" */ './views/phaser.vue')

}, {

  path: '/video',
  name: 'video',
  component: () => import(/* webpackChunkName: "canvas" */ './views/video.vue')

}]
const Router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: Routes
})
export { Routes, Router }
