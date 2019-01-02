<template>
  <div class="fun">
    <div class="header">
      <i class="icon--1"></i>
      <input type="text" placeholder="收搜网易新闻用户" class="inp">
      <span class="cancal" @click="clickStr">取消</span>
    </div>
    <div class="content" ref="num">
      <div>
        <div class="attention">推荐关注</div>
        <div class="logo_icon" v-for="(item,index) in massage" :key="index">
          <div class="icon">
            <img :src="item.icon" class="img">
            <span class="icon_one">{{item.tname}}</span>
            <span class="text" @click="loginStr">关注</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        massage: []
      }
    },
    props: ['xw'],
    created() {
      this.axios.get('api/news')
        .then(res => {
          res = res.data
          if (res.errno === 0) {
            this.news = res.data
            this.massage = this.news.uesr
          }
        })
      this.$nextTick(() => {
        this.numScroll = new BScroll(this.$refs.num, {
          click: true
        })
      })
    },
    methods: {
      clickStr() {
        this.$router.go(-1)
      },
      loginStr() {
        this.$router.push('/Login')
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../public/css/style.css'
  .fun
    margin: 0 10px
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 1000
    background: #fff
    .header
      position: relative
      display: flex
      margin: 20px 0
      box-sizing: border-box
      .icon--1
        position: absolute
        top: 10px
        left: 10px
        font-size: 18px
        color: rgba(106, 106, 106, 0.4)
      .inp
        flex: 1
        padding: 10px 0 10px 28px
        height: 15px
        outline: none
        border-radius: 25px
        border: 1px solid rgba(106, 106, 106, 0.2)
      .cancal
        flex: 0 0 40px
        text-align: center
        margin: 0 15px
        font-size: 14px
        line-height: 37px
        color: #2f2f2f
    .content
      position: absolute
      top: 80px
      left: 0
      bottom: 0
      overflow: hidden
      .attention
        margin-top: 10px
        text-align: center
        font-weight: 500
      .logo_icon
        box-sizing: border-box
        display: inline-block
        margin-top: 15px
        width: 33%
        .icon
          width: 100%
          .img
            display: block
            margin: 10px auto
            width: 50px
            height: 50px
            border-radius: 50%
        .icon_one
          display: block
          text-align: center
          font-size: 14px
          color: rgba(106, 106, 106, 0.72)
        .text
          display: block
          margin: 10px auto
          text-align: center
          width: 40%
          padding: 5px
          border: 1px solid rgba(106, 106, 106, 0.2)
          border-radius: 20px
          font-size: 12px
</style>
