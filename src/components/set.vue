<template>
  <transition name="move">
    <div class="login">
      <div class="x">
        <i class="icon-close" @click="clickStr()"></i>
      </div>
      <div class="logo">
        <img src="../public/img/al4.png" class="icon">
      </div>
      <div class="loginStr">
        <div class="set">手机号登录</div>
        <div class="cell">
          <input type="tel" placeholder="手机号码" v-model="phoneNum" class="inp"
                 oninput="if(value.length>11)value=value.slice(0,11)">
          <span class="verification" @click="sendSmsCode" ref="count">获取验证码</span>
        </div>
        <div class="cell">
          <input type="text" placeholder="验证码" class="inp" v-model="input">
          <span v-show="show" class="text">{{checkCode}}</span>
        </div>
        <div class="use" @click="useCode" :class="{active:input}" ref="use">开始使用</div>
        <div class="emailLogin">
          <div class="email">
            <i class="icon-bubbles4"></i>
            <span class="test">邮箱账号登录</span>
          </div>
          <span class="tel">手机号注册</span>
        </div>
      </div>
      <div class="image">
        <img src="../public/img/al7.png">
        <img src="../public/img/al9.png">
        <img src="../public/img/al5.png">
      </div>
      <div class="text">
        登录即代表您已经同意 <span>服务条款</span> 和 <span>隐私政策</span>
      </div>
    </div>
  </transition>
</template>

<script>
  const $ = require('jquery')
  export default {
    data() {
      return {
        phoneNum: '',
        show: true,
        checkCode: '',
        input: '',
        array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    },
    watch: {
      input(newTel, oldTel) {
        if (newTel.length === 4) {
          this.$refs.use.setAttribute('style', 'background:red')
        }
      },
      phoneNum(newTel, oldTel) {
        if (newTel.length === 11) {
          this.$refs.count.setAttribute('style', 'color:#000')
        }
      }
    },
    methods: {
      clickStr() {
        this.$router.go(-1)
      },
      sendSmsCode() {
        if (!(/^1[34578]\d{9}$/.test(this.phoneNum))) {
          console.log('电话号码格式错误')
        } else {
          console.log('输入成功')
          this.show = true
          this.createCode()
        }
      },
      createCode() {
        let codeLength = 4
//        eslint-disable-next-line
        let random = this.array
        for (let i = 0; i < codeLength; i++) {
          let index = Math.floor(Math.random() * 10)
          this.checkCode += random[index]
        }
        console.log(this.checkCode)
      },
      useCode() {
        let val = $('.inp').eq(1).val()
        if (val === this.checkCode && val !== '') {
          this.$router.go(-1)
        } else {
          console.log('验证码输入错误')
        }
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import "../public/css/style.css"
  .login
    position: relative
    left: 0
    top: 0
    width: 100%
    background: #fff
    &.move-enter-active
      transition: all 0.5s
    &.move-enter
      transform: translateX(100%)
    &.move-leave-active
      transition: all 0.5s
    &.move-leave-to
      transform: translateX(100%)
    .x
      margin: 10px
      height: 20px
      .icon-close
        position: absolute
        top: 10px
        right: 20px
        font-size: 22px
        color: rgb(68, 68, 68)
    .logo
      text-align: center
      padding: 30px 0 50px
      .icon
        width: 100px
        height: 100px
        text-align: center
    .loginStr
      box-sizing: border-box
      padding: 0 15px
      .set
        margin-bottom: 40px
        width: 100%
        height: 50px
        line-height: 50px
        font-size: 22px
        font-weight: bold
        color: rgb(40, 40, 40)
      .cell
        display: flex
        margin-bottom: 10px
        border-bottom: 1px solid rgba(138, 138, 138, 0.3)
        .inp
          flex: 1
          padding: 10px
          height: 20px
          line-height: 20
          border-radius: 20px
          outline: none
          border: none
          color: red
        .text
          display: inline-block
          text-align: center
          color: red
        .verification
          flex: 0 0 60px
          font-size: 10px
          padding: 10px
          height: 10px
          text-align: center
          border-radius: 20px
          border: 1px solid rgba(138, 138, 138, 0.65)
          color: rgba(138, 138, 138, 0.65)
      .use
        margin-top: 25px
        height: 20px
        line-height: 20px
        padding: 10px
        border-radius: 20px
        text-align: center
        color: #fff
        background: rgb(255, 186, 186)
      .emailLogin
        margin: 20px 0
        display: flex
        .email
          display: inline-block
          flex: 1
          .icon-bubbles4, .test
            font-size: 16px
            color: rgba(40, 40, 40, 0.7)
        .tel
          flex: 1
          text-align: right
          color: rgba(40, 40, 40, 0.7)
    .image
      box-sizing: border-box
      margin-top: 35px
      text-align: center
      img
        display: inline-block
        width: 55px
        height: 55px
        margin: 10px
    .text
      text-align: center
      padding: 15px
      font-size: 14px
      color: rgba(156, 156, 156, 0.6)
      span
        text-decoration: underline
</style>
