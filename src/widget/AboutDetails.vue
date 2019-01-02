<template>
  <transition name="move">
    <div class="details">
      <div class="header">
        <i class="icon-arrow_lift" @click="dateDeatil"></i>
        <div class="icon">
          <img :src="details.imgsrc">
          <span class="source">{{details.source}}</span>
          <span class="ptime">{{details.ptime}}</span>
        </div>
        <span class="attention" @click="attentionStr">{{detailsStr}}</span>
      </div>
      <div class="box" ref="box">
        <div>
          <div class="content">
            <p class="text">{{details.digest}}</p>
            <img :src="details.imgsrc" class="icon">
            <div class="bottons">
              <div class="bottons_icon">
                <i class="icon-thumb_up"></i>
                <span class="set">{{details.commentCount}}</span>
              </div>
              <div class="bottons_icon">
                <i class="icon-thumb_down"></i>
                <span class="set">踩</span>
              </div>
              <div class="bottons_icon">
                <i class="icon-1"></i>
                <span class="set">评论</span>
              </div>
              <div class="bottons_icon">
                <i class="icon-2"></i>
                <span class="set" @click="commentStr">分享</span>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="comment">
            <div class="comment_text">3条评论</div>
            <div class="comment_box">
              <span>最新</span> |
              <span class="ts">最热</span>
            </div>
          </div>
          <div class="path">
            <div class="path_one">
              <img src="../public/img/1.jpg" class="img">
              <span class="test">网络营销推广</span>
              <i class="icon-thumb_up"></i>
              <p>看着他们就想起了曾经的我</p>
              <div class="get">
                <span class="time">30分钟前</span>
                <span class="reply">回复</span>
              </div>
            </div>
            <div class="path_one">
              <img src="../public/img/2.jpg" class="img">
              <span class="test">自媒体</span>
              <i class="icon-thumb_up"></i>
              <p>美丽的花虽然会凋谢，可是盛开的时刻值得欣赏。要在美好的时候创造出美好的东西，人生才会充满意义</p>
              <div class="get">
                <span class="time">30分钟前</span>
                <span class="reply">回复</span>
              </div>
            </div>
            <div class="path_one">
              <img src="../public/img/1.jpg" class="img">
              <span class="test">飞翔的荷兰居</span>
              <i class="icon-thumb_up"></i>
              <p>教学评价是研究教师的教和学生的学的价值的过程。教学评价一般包括对教学过程中教师、学生、教学内容、教学方法手段、教学环境、教学管理诸因素的评价，但主要是对学生学习效果的评价和教师教学工作过程的评价</p>
              <div class="get">
                <span class="time">30分钟前</span>
                <span class="reply">回复</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <share v-show="commentSet" @set="set"></share>
      <div class="inp">
        <input type="text" placeholder="写评论">
      </div>
    </div>
  </transition>
</template>

<script>
  import BScorll from 'better-scroll'
  import Share from './Share.vue'
  export default {
    props: {
      'id': String,
      required: true
    },
    data() {
      return {
        details: [],
        attention: false,
        commentSet: false
      }
    },
    created() {
      this.axios.get('api/news')
        .then(res => {
          res = res.data
          this.news = res.data
          this.details = this.news.about[this.id]
          this.$nextTick(() => {
            this.boxScroll = new BScorll(this.$refs.box, {
              click: true
            })
          })
        })
    },
    computed: {
      detailsStr() {
        return this.attention ? '已关注' : '关注'
      }
    },
    methods: {
      dateDeatil() {
        this.$router.go(-1)
      },
      attentionStr() {
        this.attention = !this.attention
      },
      commentStr() {
        this.commentSet = true
      },
      set() {
        this.commentSet = false
      }
    },
    components: {
      Share
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../public/css/style.css'
  .details
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 10
    background: #fff
    &.move-enter-active
      transition: all 0.5s
    &.move-enter
      transform: translateY(-100%)
    &.move-leave-active
      transition: all 0.5s
    &.move-leave-to
      transform: translateX(100%)
    .header
      display: flex
      margin: 5px 10px
      height: 50px
      .icon-arrow_lift
        flex: 0 0 20px
        line-height: 50px
        font-size: 16px
      .icon
        flex: 1
        position: relative
        line-height: 50px
        margin-left: 10px
        img
          width: 35px
          height: 35px
          vertical-align: middle
          border-radius: 50%
        .source
          position: absolute
          left: 40px
          top: -6px
          font-size: 14px
        .ptime
          position: absolute
          left: 40px
          top: 25%
          font-size: 12px
          color: rgba(139, 139, 139, 0.81)
      .attention
        flex: 0 0 50px
        text-align: center
        margin-top: 15px
        padding-top: 5px
        height: 20px
        border: 1px solid rgba(183, 183, 183, 0.88)
        border-radius: 20px
        font-size: 14px
        color: rgba(52, 52, 52, 0.84)
    .box
      position: fixed
      top: 60px
      left: 0
      bottom: 50px
      width: 100%
      overflow: hidden
      .content
        margin: 10px
        .text
          line-height: 20px
          font-size: 15px
        .icon
          margin: 10px
        .bottons
          display: flex
          padding: 10px 0
          border-top: 1px solid rgba(192, 192, 192, 0.53)
        .bottons_icon
          flex: 1
          text-align: center
          color: rgba(95, 95, 95, 0.75)
        .icon-2
          font-size: 18px
        .set
          vertical-align: top
          font-size: 14px
      .line
        width: 100%
        height: 5px
        background: rgba(213, 213, 213, 0.76)
      .comment
        display: flex
        margin: 10px
        .comment_text
          flex: 1
        .comment_box
          flex: 0 0 100px
          span
            padding: 0 6px
          .ts
            color: rgba(146, 146, 146, 0.76)
      .path
        .path_one
          position: relative
          padding-bottom: 10px
          border-bottom: 1px solid rgba(177, 177, 177, 0.52)
          .img
            margin: 10px
            vertical-align: middle
            width: 25px
            height: 25px
            border-radius: 50%
          .test
            margin: 10px
            color: #1b1b1b
            font-size: 12px
            margin-left: 5px
          .icon-thumb_up
            position: absolute
            right: 10px
            top: 12px
            margin: 10px
            color: rgba(95, 95, 95, 0.75)
          p
            margin: 10px 10px
            font-size: 16px
            line-height: 20px
          .get
            margin: 5px 10px
            .time
              padding-right: 10px
              font-size: 14px
              color: rgba(95, 95, 95, 0.75)
            .reply
              font-size: 14px
    .inp
      position: fixed
      bottom: 0
      left: 0
      margin-bottom: 10px
      width: 100%
      height: 40px
      text-align: center
      input
        margin: 10px
        padding: 5px 10px
        height: 20px
        width: 85%
        outline: none
        border-radius: 20px
        border: 1px solid rgba(213, 213, 213, 0.76)
</style>
