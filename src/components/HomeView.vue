<template>
  <div id="app">
    <header-view v-show="show" @close="closeDetail" :home="home" :xw="news" ></header-view>
    <div class="header">
      <div class="wy">
        <img src="../public/img/logo.png">
      </div>
      <div class="inp">
        <input type="text" @click="showDetail">
        <transition-group name="fade">
          <div class="carousel" v-for="(item,index) in home" :key="index" v-show="currentIndex==index"
               @click="showDetail">
            <img src="../public/img/carousel.png">
            <span class="text">{{item.description}}</span>
          </div>
        </transition-group>
      </div>
      <div class="right">
        <img src="../public/img/skin1_news_main_live_icon.png">
      </div>
    </div>
    <div class="home">
      <div class="overview" ref="menu">
        <ul>
          <li class="set" v-for="(set,index) in str" :key="index" @click="getText(set.num),homeDetail(index)"><span
            class="icon" :class="{active:index==homeStr}"></span>{{set.text}}
          </li>
        </ul>
      </div>
      <div class="Img">
        <img src="../public/img/night_asr.png" @click="countDetail">
        <column-view v-show="count" @set="setDetail" @getText="getText(str.num)"></column-view>
      </div>
    </div>
    <div class="scrollStr" ref="name">
      <div>
        <div class="new" v-for="(page,index) in dataOut" :key="index">
          <p class="text">{{page.title}}
            <span class="source">{{page.source}}&nbsp;{{page.priority}}跟帖</span>
          </p>
          <img :src="page.imgsrc" class="icon">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import HeaderView from '../components/HeaderView'
  import ColumnView from '../widget/ColumnView.vue'
  export default {
    mounted() {
      this.$nextTick(() => {
        setInterval(() => {
          this.currentIndex++
          if (this.currentIndex >= this.home.length) {
            this.currentIndex = 0
          }
        }, 1400)
      })
    },
    data() {
      return {
        home: [],
        news: [],
        get: '',
        dataOut: [],
        currentIndex: 0,
        homeStr: 0,
        show: false,
        count: false,
        str: [
          {
            num: 'toutiao',
            text: '头条'
          },
          {
            num: 'tech',
            text: '科技'
          },
          {
            num: 'auto',
            text: '娱乐'
          },
          {
            num: 'money',
            text: '要闻'
          },
          {
            num: 'sports',
            text: '体育'
          },
          {
            num: 'dy',
            text: '娱乐'
          },
          {
            num: 'duanzi',
            text: '段子'
          },
          {
            num: 'about',
            text: '广州'
          },
          {
            num: 'gk',
            text: '公开课'
          },
          {
            num: 'topic',
            text: '话题'
          }
        ]
      }
    },
    created() {
      this.axios.get('api/news')
        .then(res => {
          res = res.data
          if (res.errno === 0) {
            this.news = res.data
            this.dataOut = this.news.toutiao
          }
        })
//      eslint-disable-next-line
      this.axios.get('/api/home')
        .then(res => {
          res = res.data
          if (res.errno === 0) {
            this.home = res.data
            this.$nextTick(() => {
              this.menuScroll = new BScroll(this.$refs.menu, {
                scrollX: true,
                click: true
              })
            })
            this.$nextTick(() => {
              this.nameScroll = new BScroll(this.$refs.name, {
                click: true
              })
            })
          }
        })
    },
    methods: {
      showDetail() {
        this.show = true
      },
      closeDetail() {
        this.show = false
      },
      countDetail() {
        this.count = true
      },
      setDetail() {
        this.count = false
      },
      getText(add) {
        this.dataOut = this.news[add]
      },
      go(add) {
        this.dataOut = this.news[add]
      },
      homeDetail(index) {
        this.homeStr = index
      }
    },
    components: {
      HeaderView,
      ColumnView
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../public/css/style.css'
  #app
    width: 100%
    .header
      position: relative
      display: flex
      width: 100%
      height: 60px
      background: rgb(226, 40, 41)
      .wy
        flex: 0 0
        margin-left: 15px
        img
          width: 50px
          height: 20px
          margin-top: 18px
      .inp
        flex: 1 0 auto
        margin: 14px 10px
        position: relative
        overflow: hidden
        input
          width: 95%
          padding: 5px
          height: 20px
          border-radius: 20px
          outline: none
          border: none
          background: rgb(232, 83, 84)
        .carousel
          position: absolute
          top: 6px
          left: 20%
          &.fade-enter-active
            transition: all 0.5s
          &.fade-enter
            transform: translateY(100%)
          &.fade-leave-active
            transition: all 0.5s
          &.fade-leave-to
            transform: translateY(-100%)
          img
            width: 14px
            height: 14px
            vertical-align: bottom
          .text
            margin-left: 4px
            font-size: 14px
            color: rgb(252, 232, 233)
      .right
        flex: 0 35px
        margin: 13px 15px 0 10px
        img
          width: 35px
          height: 35px
    .home
      display: flex
      flex: 0 0
      width: 100%
      .overview
        flex: 1 0 auto
        width: 80%
        height: 45px
        overflow: hidden
        ul
          width: 160%
          height: 45px
          .set
            position: relative
            display: inline-block
            margin: 15px 10px
            .icon
              position: absolute
              top: -6px
              right: -6px
              display: none
              width: 4px
              height: 4px
              border-radius: 50%
              border: 2px solid red
              &.active
                display: block
      .Img
        flex: 0 0 20px
        width: 20px
        margin: 10px 10px 0
        img
          height: 24px
    .scrollStr
      position: absolute
      top: 105px
      left: 0
      bottom: 0
      overflow: hidden
      .new
        position: relative
        display: flex
        border-top: 1px solid rgb(199, 199, 199)
        width: 100%
        height: 105px
        &:last-child
          padding-bottom: 34px
        .text
          display: inline-block
          flex: 0 auto
          height: 100%
          margin-right: 130px
          padding: 10px
          font-size: 14px
          line-height: 18PX
          .source
            display: block
            margin-top: 30px
            font-size: 12px
            color: rgb(183, 183, 183)
        .icon
          flex: 0 0 120px
          position: absolute
          top: 0
          right: 0
          padding: 10px
          width: 120px
          height: 80px
</style>
