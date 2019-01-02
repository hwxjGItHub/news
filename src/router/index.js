import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../components/HomeView.vue'
import AboutView from '../components/AboutView.vue'
import VideoView from '../components/VideoView.vue'
import MyView from '../components/MyView.vue'
import LoginView from '../components/LoginView.vue'
import FunView from '../widget/FunView.vue'
import ColumnView from '../widget/ColumnView.vue'
import Share from '../widget/Share.vue'
import AboutDetails from '../widget/AboutDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/home', component: HomeView},
    {path: '/about', component: AboutView},
    {path: '/video', component: VideoView},
    {path: '/my', component: MyView},
    {path: '/login', component: LoginView},
    {path: '/fun', component: FunView},
    {path: '/column', component: ColumnView},
    {path: '/share', component: Share},
    {path: '/details/:id', component: AboutDetails, props: true}
  ],
  linkActiveClass: 'active'
})
