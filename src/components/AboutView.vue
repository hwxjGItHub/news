<template>
  <div class="about">
    <div class="header">
      <span class="recommend" @click="showTer">推荐</span>
      <span class="attention" @click="showStr">关注</span>
      <i class="icon-user-plus icon" @click="loginStr"></i>
    </div>
    <div class="box" v-show="show" ref="count">
      <div>
        <div class="hot">
          <img src="../public/img/axb.png" class="img">
          <span class="str">热门话题</span>
        </div>
        <div class="content" v-for="(item,index) in data" :key="index">
          <div class="aboutNews">
            <img :src="item.imgsrc" class="aboutImg">
            <span class="num">{{item.source}}</span>
            <span class="aboutNews_j">讲讲新闻报道员</span>
            <span class="attention_to" @click="jumpStr(index)">关注</span>
          </div>
          <div class="describe">{{item.digest}}</div>
          <div class="icon">
            <img :src="item.imgsrc" @click="DetailsStr(item.id)">
          </div>
          <div class="message">
            <div class="message_one" @click="getShow(index)">
              <i class="icon-thumb_up" ref="num"></i>
              <span>{{item.commentCount}}</span>
            </div>
            <div class="message_two">
              <i class="icon-1"></i>
              <span>{{item.priority}}</span>
            </div>
            <div class="message_three">
              <i class="icon-2"></i>
              <span @click="shareStr">分享</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="banner" v-show="showAtt">
      <div>
        <div class="images" v-show="images">
          <img src="../public/img/night_bcu.png">
          <span class="test">你还未关注任何人</span>
        </div>
        <div class="myPaid" v-show="myPaid">我的关注</div>
        <div class="paid" v-for="(count,index) in data" :key="index+'-label'">
          <div class="iconImg" v-show="count.focus">
            <img :src="count.imgsrc" class="img">
            <span class="icon_one">{{count.source}}</span>
            <span class="text" @click="paidText(index)">取消关注</span>
          </div>
        </div>
        <!--<div class="attention">推荐关注</div>-->
        <!--<div class="logo_icon" v-for="(set,index) in massage" v-show="index<=11" :key="index">-->
        <!--<div class="iconImg">-->
        <!--<img :src="set.icon" class="img">-->
        <!--<span class="icon_one">{{set.tname}}</span>-->
        <!--<span class="text">关注</span>-->
        <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <Share v-show="share" @share="shareSet"></Share>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Share from '../widget/Share'
  const $ = require('jquery')
  export default {
    data() {
      return {
        data: [],
        massage: [],
        show: true,
        showAtt: false,
        get: false,
        share: false,
        attention: false,
        images: true,
        myPaid: false
      }
    },
    props: ['xw'],
    mounted() {
      this.axios.get('api/news')
        .then(res => {
          res = res.data
          this.news = res.data
          this.data = this.news.about
          this.massage = this.news.uesr
          setTimeout(() => {
            this.$nextTick(() => {
              this.countScroll = new BScroll(this.$refs.count, {
                click: true
              })
            })
          }, 800)
        })
    },
    methods: {
      loginStr() {
        this.$router.push('/fun')
      },
      attStr(i) {
        if (this.data[i].focus) {
          $('.attention_to').eq(i).text('已关注')
        } else {
          $('.attention_to').eq(i).text('关注')
        }
      },
      jumpStr(index) {
//        this.$store.push('/Login')
        this.attention = !this.attention
        if (this.attention) {
          this.images = false
          this.myPaid = true
          this.focusFun(index)
        } else {
          this.images = true
          this.myPaid = false
        }
      },
      focusFun(i) {
        if (this.data[i].focus) {
          this.data[i].focus = !this.data[i].focus
        } else {
          // 使用$set方法判断this.dyData[i]里面有没有focus这个值,如果没有，就set一个 值为 true 的'focus'对象 ( 'focus': true )
          this.$set(this.data[i], 'focus', true)
        }
        this.attStr(i)
      },
      showStr() {
        this.show = false
        this.showAtt = true
      },
      showTer() {
        this.show = true
        this.showAtt = false
      },
      shareStr() {
        this.share = true
      },
      shareSet() {
        this.share = false
      },
      cancalStr() {
        this.share = false
      },
      getShow(index) {
        this.get = !this.get
        if (this.get) {
          this.data[index].commentCount++
          this.$refs.num[index].setAttribute('style', 'color: red')
        } else {
          this.data[index].commentCount--
          this.$refs.num[index].setAttribute('style', '')
        }
      },
      paidText(index) {
        this.focusFun(index)
        this.myPaid = false
        this.images = true
      },
      DetailsStr(id) {
        this.$router.push({path: `/details/${id}`})
      }
    },
    components: {
      Share
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import "../public/css/style.css"
  .about
    width: 100%
    overflow: hidden
    .header
      display: flex
      margin: 10px
      height: 50px
      line-height: 50px
      .recommend
        flex: 1
        text-align: right
      .attention
        flex: 1
        text-align: center
      .icon
        font-size: 22px
        padding: 14px
        color: rgba(101, 101, 101, 0.49)
    .box
      position: absolute
      top: 70px
      left: 0
      bottom: 60px
      width: 100%
      overflow: hidden
      .hot
        margin: 20px 15px
        .img
          vertical-align: middle
          width: 20px
          height: 20px
        .str
          font-size: 14px
      .content
        position: relative
        margin: 10px 15px
        padding-top: 20px
        border-top: 4px solid rgba(128, 128, 128, 0.38)
        &:last-child
          margin-bottom: 80px
        .aboutNews
          position: relative
          .aboutImg
            width: 30px
            height: 30px
            border-radius: 30px
          .num
            display: inline-block
            margin-left: 5px
            vertical-align: top
            font-size: 14px
            color: rgba(15, 15, 15, 0.87)
          .aboutNews_j
            position: absolute
            left: 40px
            top: 15px
            display: inline-block
            font-size: 10px
            padding-top: 4px
            color: rgba(96, 96, 96, 0.6)
          .attention_to
            position: absolute
            top: 10px
            right: 0
            padding: 2px 10px
            border-radius: 20px
            font-size: 14px
            border: 1px solid rgba(96, 96, 96, 0.2)
        .describe
          padding: 10px 0
          font-size: 16px
          line-height: 27px
          word-break: break-all
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 2
          text-overflow: ellipsis
          overflow: hidden
        .icon
          width: 100%
          img
            width: 100%
        .message
          display: flex
          text-align: center
          width: 100%
          margin: 10px 0
          .message_one, .message_two, .message_three
            flex: 1
            padding: 10px
            font-size: 14px
            color: rgba(95, 95, 95, 0.75)
            .icon-2
              font-size: 18px
            .icon-thumb_up, .icon-1
              font-size: 16px
              &.active
                color: red
    .banner
      width: 100%
      overflow: hidden
      text-align: center
      .images
        text-align: center
        width: 100%
        img
          width: 150px
          height: 150px
        .test
          display: block
          margin-top: 10px
          text-align: center
          font-size: 14px
          color: rgba(109, 109, 109, 0.62)
      .myPaid
        margin: 20px auto
        padding: 10px 0
        width: 80%
        border-radius: 36px
        background: #adffd5
      .paid
        box-sizing: border-box
        float: left
        margin-left: 10px
        width: 30%
        .iconImg
          text-align: center
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
            width: 55%
            padding: 5px
            border: 1px solid rgba(106, 106, 106, 0.2)
            border-radius: 20px
            font-size: 12px
      .attention
        margin-top: 20px
        text-align: center
        font-weight: 500
        &.active
          background: #eee
      .logo_icon
        box-sizing: border-box
        display: inline-block
        margin-top: 15px
        width: 33%
        .iconImg
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
