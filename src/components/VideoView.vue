<template>
  <div class="header">
    <div class="search">
      <input type="" class="inp" placeholder="收搜你想要看的视频">
      <i class="icon--1"></i>
    </div>
    <div class="homVideo" ref="menu">
      <div>
        <div class="content" v-for="(item,index) in video" :key="index">
          <div class="str">
            <span class="text">{{item.title}}</span>
            <video src="../public/video/app.mp4" class="video" :poster="item.fullSizeImg" width="100%"
                   controls="controls"></video>
          </div>
          <div class="comment">
            <div class="icon">
              <img :src="item.cover">
              <span class="name">{{item.topicName}}</span>
            </div>
            <div class="cate">
              <span class="cate_box">#{{item.category}}</span>
            </div>
            <div class="give">
              <div class="border">
                <i class="icon-thumb_up" @click="getShow(index)" ref="num"></i>
                <span class="big">{{item.length}}</span>
                <i class="icon--11"></i>
                <span class="but">{{item.replyCount}}</span>
                <i class="icon-uniE90C"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Bscroll from 'better-scroll'
  export default {
    data() {
      return {
        video: [],
        get: false
      }
    },
    props: ['xw'],
    created() {
      this.axios.get('api/news')
        .then(res => {
          res = res.data
          this.$nextTick(() => {
            this.news = res.data
            this.video = this.news.video
            setTimeout(() => {
              this.menuScroll = new Bscroll(this.$refs.menu, {
                click: true
              })
            }, 300)
          })
        })
    },
    methods: {
      getShow(index) {
        this.get = !this.get
        if (this.get) {
          this.video[index].length++
          this.$refs.num[index].setAttribute('style', 'color: red')
        } else {
          this.video[index].length--
          this.$refs.num[index].setAttribute('style', '')
        }
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../public/css/style.css'
  .header
    width: 100%
    .search
      display: flex
      margin: 10px 15px
      .inp
        flex: 1
        padding: 10px
        height: 10px
        outline: none
        border-radius: 20px
        border: 1px solid rgba(95, 95, 95, 0.2)
      .icon--1
        flex: 0 0 20px
        margin: 0 5px
        line-height: 37px
        font-size: 22px
        color: rgba(95, 95, 95, 0.6)
    .homVideo
      position: absolute
      top: 47px
      left: 0
      bottom: 46px
      overflow: hidden
      .content
        margin: 10px 0
        width: 100%
        overflow: hidden
        border-bottom: 1px solid rgba(143, 143, 143, 0.44)
        .str
          position: relative
          margin: 10px 10px
          overflow: hidden
          .text
            position: absolute
            top: 10px
            left: 10px
            z-index: 10
            color: #fff
            overflow: hidden
          .video
            width: 100%
        .comment
          display: flex
          margin: 10px 10px
          .icon
            flex: 1
            img
              width: 15px
              height: 15px
              border-radius: 50%
            .name
              vertical-align: top
              font-size: 14px
              color: rgba(106, 106, 106, 0.71)
          .cate
            flex: 1
            text-align: center
            .cate_box
              padding: 2px 8px
              border: 1px solid rgba(106, 106, 106, 0.2)
              border-radius: 10px
              font-size: 12px
              background: rgba(23, 255, 252, 0.11)
          .give
            position: relative
            flex: 0 0 140px
            .border
              text-align: right
              .icon-thumb_up
                font-size: 16px
                padding-right: 26px
                margin-bottom: 4px
                color: rgba(95, 95, 95, 0.6)
              .icon--11
                font-size: 20px
                padding-right: 26px
              .icon-uniE90C
                font-size: 18px
              .big, .but
                position: absolute
                top: 0
                left: 36px
                font-size: 10px
                color: rgba(95, 95, 95, 0.6)
              .but
                left: 90px
</style>
