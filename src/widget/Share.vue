<template>
  <transition name="move">
    <div class="flex">
      <div class="share">
        <div class="share_one">
          <img src="../public/img/bf9.png" class="icon">
          <span class="text">生成卡片</span>
        </div>
        <div class="share_one">
          <img src="../public/img/alb.png" class="icon">
          <span class="text">微信好友</span>
        </div>
        <div class="share_one">
          <img src="../public/img/bfi.png" class="icon">
          <span class="text">微信朋友圈</span>
        </div>
        <div class="share_one">
          <img src="../public/img/al2.png" class="icon">
          <span class="text">QQ好友</span>
        </div>
        <div class="share_one">
          <img src="../public/img/bfb.png" class="icon">
          <span class="text">QQ空间</span>
        </div>
        <div class="share_one">
          <img src="../public/img/bfg.png" class="icon">
          <span class="text">新浪微博</span>
        </div>
        <div class="share_one">
          <img src="../public/img/bfk.png" class="icon">
          <span class="text">易信好友</span>
        </div>
        <div class="share_one">
          <img src="../public/img/bfl.png" class="icon">
          <span class="text">易信朋友圈</span>
        </div>
      </div>
      <div class="cancal" @click="shareStr">取消</div>
    </div>
  </transition>
</template>

<script>
  export default {
    methods: {
      shareStr() {
        this.$emit('share')
        this.$emit('set')
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .flex
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    z-index: 100
    background: #fff
    &.move-enter-active
      transition: all 0.5s
    &.move-enter
      transform: translateY(100%)
    &.move-leave-active
      transition: all 0.5s
    &.move-leave-to
      transform: translateY(100%)
    .share
      margin: 10px 10px
      text-align: center
      .share_one
        display: inline-block
        text-align: center
        margin: 5px
        width: 20%
        .icon
          width: 60px
          height: 60px
        .text
          display: block
          font-size: 12px
    .cancal
      text-align: center
      height: 46px
      line-height: 46px
</style>
