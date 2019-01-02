<template>
  <div class="top">
    <div class="inp">
      <input type="text" class="input" placeholder="请输入关键字搜索..." >
      <span class="cancal" @click="$emit('close')">取消</span>
    </div>
    <div class="text">热门搜索</div>
    <div class="hot" v-for="(item,index) in home" :key="index">
      <span class="number">{{item.id}}.</span>
      <span class="val">{{item.description}}</span>
      <span class="hot-out">{{item.heat}}</span>
    </div>
  </div>
</template>

<script>
export default {
 props: {
   home: {
     type: Array,
     required: true
   }
 }
}
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .top
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #fff
    z-index: 1
    .inp
      display: flex
      margin-top: 15px
      .input
        flex: 1 auto
        margin: 0 10px
        height: 20px
        padding: 5px 10px
        border-radius: 20px
        outline: none
        border: 1px solid rgba(116, 116, 116, 0.42)
      .cancal
        flex: 0 50px
        display: inline-block
        line-height: 30px
        color: rgb(26, 26, 26)
    .text
      margin: 30px 0 5px 15px
      color: rgb(188, 188, 188)
      padding: 10px 0
      border-bottom: 1px solid rgb(188, 188, 188)
    .hot
      margin: 0 10px
      width: 100%
      border-bottom: 1px solid rgb(188, 188, 188)
      .number
        font-size: 14px
        color: rgb(196, 196, 196)
      .val
        line-height: 40px
        font-size: 14px
        color: rgb(27, 27, 27)
      .hot-out
        font-size: 10px
        border-radius: 2px
        color: rgb(255, 248, 243)
        background: rgb(254, 93, 16)
</style>
