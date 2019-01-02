<template>
  <div id="app">
    <router-view @citycange="citycange"></router-view>
    <div class="bottom">
      <div class="item">
        <router-link to="/home">
          <i class="icon-file-text2"></i><span>首页</span>
        </router-link>
      </div>
      <div class="item">
        <router-link to="/video">
          <i class="icon-play3"></i><span>视频</span>
        </router-link>
      </div>
      <div class="item">
        <router-link to="/about">
          <i class="icon-compass"></i><span>讲讲</span>
        </router-link>
      </div>
      <div class="item">
        <router-link to="/my">
          <i class="icon-user"></i><span>我的</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        home: [],
        news: [],
        component: false
      }
    },
    methods: {
      citycange() {
        this.component = !this.component
       if (this.component === true) {
         document.querySelector('.bottom').setAttribute('style', 'background:rgba(136, 136, 136, 0.6)')
       } else {
         document.querySelector('.bottom').setAttribute('style', 'background:rgb(255, 255, 255)')
       }
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import './public/css/style.css'
#app
  .bottom
    position: fixed
    bottom: 0
    left: 0
    display: flex
    width: 100%
    line-height: 20px
    background: rgb(255, 255, 255)
    .item
      flex: 1
      margin-top: 5px
      text-align: center
      i
        font-size: 14px
        color: rgb(117, 117, 123)
      span
        margin: -4px 0 5px 0
        display: block
      & > a
        display: block
        font-size: 14px
        color: rgb(117, 117, 123)
        &.active
          color: rgb(238, 26, 26)
          i
            color: rgb(238, 26, 26)
</style>
