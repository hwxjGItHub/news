<template>
  <div class="column">
    <div class="header">
      <span class="header_top">所有栏目</span>
      <i class="icon-close" @click="$emit('set')"></i>
    </div>
    <div class="column_content" ref="column">
      <div>
        <div class="content">
          <div class="content_box">
            <span class="my">我的栏目</span>
            <span class="clickCon">点击进入栏目</span>
          </div>
          <span class="edit" @click="favoriteFunc">{{favoriteText}}</span>
        </div>
        <div class="banner">
          <div class="test" v-for="(str,index) in str" :key="index" ref="test" @click="clickColumn(index), strClick(index)">
            <span class="set">
              <i class="icon-close" v-show="show"></i>{{str.text}}
            </span>
          </div>
        </div>
        <div class="more">
          <span class="more_str">更多栏目</span>
          <span class="more_add">点击添加更多栏目</span>
        </div>
        <div class="addcount">
          <div class="over" v-for="(item,index) in arr" :key="index" @click="add(index)" ref="over">
        <span class="get">
          <i class="icon-uniE90D"></i>{{item.num}}
        </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props: ['xw'],
    data() {
      return {
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
            num: 'gz',
            text: '广州'
          },
          {
            num: 'gk',
            text: '公开课'
          },
          {
            num: 'dy',
            text: '话题'
          }
        ],
        arr: [
          {num: '薄荷'}, {num: '财经'}, {num: '网易云'}, {num: '热点'}, {num: '跟帖'}, {num: '航空'}, {num: '漫画'}, {num: '彩票'}, {num: 'CBA'}, {num: '亲子'}, {num: '教育'}, {num: '数码'}, {num: '手机'}, {num: '艺术'}, {num: '星座'}, {num: '京东'}, {num: '天猫'}, {num: '萌宠'}, {num: '佛学'}, {num: '双创'}, {num: '电脑'}, {num: 'NBA'}, {num: '搞笑'}, {num: '淘宝'}, {num: '游戏'}, {num: '房产'}, {num: '图片'}, {num: '历史'}, {num: '音乐'}
        ],
        news: [],
        dataOut: [],
        favorite: false,
        show: false
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
      this.$nextTick(() => {
        this.columnScroll = new BScroll(this.$refs.column, {
          click: true
        })
      })
    },
    computed: {
      favoriteText() {
        return this.favorite ? '完成' : '编辑'
      }
    },
    methods: {
      favoriteFunc() {
        this.favorite = !this.favorite
        this.show = !this.show
      },
      add(index) {
        let arry = ''
        arry = this.arr[index].num
        this.str.push({'text': arry})
        this.$refs.over[index].setAttribute('style', 'display:none')
      },
      clickColumn(index) {
        if (this.favorite === true) {
          let arry = ''
          arry = this.str[index].text
          this.arr.push({'num': arry})
          this.$refs.test[index].setAttribute('style', 'display:none')
        }
      },
      strClick(index) {
        let arry = ''
        arry = this.str[index].num
        this.$emit('getText', arry)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../public/css/style.css'
  .column
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 100
    background: #fff
    .header
      display: flex
      margin: 10px
      height: 40px
      line-height: 40px
      .header_top
        flex: 1 0 auto
        text-align: center
        padding-left: 50px
        font-size: 16px
        font-weight: 600
      .icon-close
        flex: 0 0 25px
        line-height: 40px
        margin-right: 10px
        font-size: 20px
    .column_content
      position: absolute
      top: 60px
      left: 0
      bottom: 0
      overflow: hidden
      .content
        display: flex
        margin: 15px
        .content_box
          flex: 1 0 auto
          .my
            margin-right: 5px
            font-size: 15px
          .clickCon
            font-size: 12px
            color: rgba(129, 129, 129, 0.61)
        .edit
          flex: 0 0 40px
          padding: 4px 6px
          text-align: center
          font-size: 12px
          border-radius: 30px
          color: rgba(255, 0, 0, 0.85)
          border: 1px solid rgba(255, 0, 0, 0.85)
      .banner
        margin: 10px 10px
        overflow: hidden
        .test
          box-sizing: border-box
          display: inline-block
          margin: 10px 5px
          width: 20%
          text-align: center
          border: 1px solid rgba(118, 118, 118, 0.49)
          border-radius: 30px
          .set
            display: inline-block
            padding: 5px
            font-size: 12px
      .more
        margin: 15px 15px
        .more_str
          font-size: 15px
        .more_add
          margin-left: 5px
          font-size: 12px
          color: rgba(129, 129, 129, 0.61)
      .addcount
        margin: 10px 5px 10px 10px
        overflow: hidden
        .over
          box-sizing: border-box
          display: inline-block
          margin: 10px 5px
          width: 20%
          text-align: center
          border: 1px solid rgba(118, 118, 118, 0.49)
          border-radius: 30px
          .get
            display: inline-block
            padding: 5px
            font-size: 10px
            .icon-uniE90D
              font-size: 12px
</style>
