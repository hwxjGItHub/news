<template>
  <div class="my" ref="menu">
    <div>
      <div class="header">
        <div class="left">
          <i class="icon-eye" v-show="dayNight"></i>
          <i class="icon-brightness-contrast" v-show="show"></i>
          <span class="text" @click="dayConversion">{{day}}</span>
        </div>
        <div class="right">
          <i class="icon-coin-yen"></i>
          <span class="sign">签到</span>
        </div>
      </div>
      <div class="icon_one" v-if="login">
        <div class="icon">
          <img src="../public/img/bed.png">
          <img src="../public/img/al7.png">
          <img src="../public/img/al9.png">
          <img src="../public/img/al5.png">
        </div>
        <div class="login">
          <span class="loginStr" @click="loginStr">登录/注册</span>
          <login-view v-show="count" @loginGet="loginGet" @go="go"></login-view>
        </div>
      </div>
      <div class="icon_two" v-if="icon">
        <div class="icon">
          <img src="../public/img/m1.jpg" class="img">
          <span class="loginStr">太多的语言无法表达</span>
          <span class="text">关注： 0</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="box">
        <div class="item">
          <i class="icon-bubble2"></i>
          <span>跟帖</span>
        </div>
        <div class="item">
          <i class="icon-star-empty"></i>
          <span>收藏</span>
        </div>
        <div class="item">
          <i class="icon-alarm"></i>
          <span>历史</span>
        </div>
      </div>
      <div class="set">
        <span class="line"></span>
        <div class="message">
          <span class="test">我的消息</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="shopping">
          <span class="test">我的已购</span>
          <span class="describe">购买的课程/直播</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="gold">
          <span class="test">金币商城</span>
          <span class="describe">嘿!你的五百金币，在这里</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="jd">
          <span class="test">京东特供</span>
          <span class="describe">新人领188元红包</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="money">
          <span class="test">我的钱包</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
        <span class="line"></span>
        <div class="money">
          <span class="test">免费看新闻</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="money">
          <span class="test">扫一扫</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="money">
          <span class="test">设置</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import LoginView from './LoginView'
  export default {
    created() {
      this.$nextTick(() => {
        this.menuScroll = new BScroll(this.$refs.menu, {
          click: true
        })
      })
    },
    data() {
      return {
        show: false,
        dayNight: true,
        count: false,
        login: true,
        icon: false
      }
    },
    computed: {
      day() {
        return this.show ? '日间' : '夜间'
      }
    },
    methods: {
      loginStr() {
        this.count = true
      },
      go() {
        this.count = false
      },
      loginGet() {
        this.login = false
        this.icon = true
      },
      dayConversion() {
        this.show = !this.show
        this.$emit('citycange')
        if (this.show === true) {
          document.querySelector('body').setAttribute('style', 'background:rgba(136, 136, 136, 0.6)')
          this.dayNight = false
        } else {
          document.querySelector('body').setAttribute('style', 'background:#fff')
          this.dayNight = true
        }
      }
    },
    components: {
      LoginView
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import "../public/css/style.css"
  .my
    position: absolute
    top: 0
    left: 0
    bottom: 60px
    width: 100%
    overflow: hidden
    .header
      position: relative
      padding: 10px
      .left
        display: inline-block
        padding: 5px
        border-radius: 20px
        border: 1px solid rgba(136, 136, 136, 0.36)
        .icon-eye, .icon-brightness-contrast
          font-size: 14px
          color: rgba(92, 92, 92, 0.7)
        .text
          font-size: 14px
      .right
        position: absolute
        top: 10px
        right: 10px
        padding: 5px
        border-radius: 20px
        border: 1px solid rgba(136, 136, 136, 0.36)
        .icon-coin-yen
          font-size: 14px
          color: rgb(255, 180, 44)
        .sign
          font-size: 14px
    .icon_one
      .icon
        box-sizing: border-box
        display: flex
        margin: 20px 10px
        img
          flex: 1
          width: 60px
          height: 50px
          padding: 10px
      .login
        width: 100%
        height: 50px
        line-height: 50px
        text-align: center
        margin-bottom: 20px
        .loginStr
          display: inline-block
          font-size: 14px
          padding: 5px 25px
          line-height: 34px
          text-align: center
          border-radius: 22px
          background: rgb(238, 26, 26)
          color: #fff
    .icon_two
      position: relative
      .icon
        margin: 20px 20px
        .img
          width: 60px
          height: 60px
          border-radius: 50%
        .loginStr
          position: absolute
          top: 5px
          left: 100px
          font-size: 14px
          color: rgba(52, 52, 52, 0.78)
        .text
          position: absolute
          left: 100px
          bottom: 10px
          font-size: 14px
          color: rgba(52, 52, 52, 0.6)
        .icon-keyboard_arrow_right
          position: absolute
          top: 40%
          right: 20px
          font-size: 22px
    .box
      display: flex
      width: 100%
      height: 60px
      .item
        text-align: center
        flex: 1
        color: rgba(85, 85, 85, 0.5)
        .icon-bubble2, .icon-star-empty, .icon-alarm
          display: inline-block
          font-size: 16px
          vertical-align: bottom
        span
          display: block
          font-size: 14px
          line-height: 24px
    .set
      width: 100%
      .line
        display: block
        margin-top: 10px
        height: 5px
        background: rgba(121, 121, 121, 0.15)
      .message, .shopping, .gold, .jd, .money
        box-sizing: border-box
        position: relative
        padding: 0 15px
        width: 100%
        height: 50px
        font-size: 16px
        line-height: 50px
        color: rgb(102, 102, 102)
        border-bottom: 1px solid rgba(121, 121, 121, 0.15)
        .describe
          float: right
          margin-right: 30px
          font-size: 12px
          color: rgb(137, 137, 137)
        .icon-keyboard_arrow_right
          position: absolute
          right: 15px
          top: 15px
          color: rgba(85, 85, 85, 0.5)
</style>
