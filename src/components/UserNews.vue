<template>
  <div style="background-color: #f2f2f2">

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!--单个动态模版-->
        <div style="margin: 0.1rem 0.01rem 0.1rem 0.01rem;background-color: #ffffff" v-for="(item,index) in list" :key="index">
          <!--头像，昵称，时间-->
          <van-row>
            <van-col span="4"><img v-bind:src="item.avatarUrl"
                                   style="width: 0.5rem;height: 0.5rem;border-radius: 100%;margin: 0.05rem 0 0 0.05rem"
                                   alt=""></van-col>
            <van-col style="margin: 0.1rem 0 0 0" span=""><span>{{item.userName}}</span><br><span
              style="font-size: 0.1rem;color: #7e8c8d">{{item.createTime}}</span></van-col>
          </van-row>
          <!--内容-->
          <van-row>
            <van-col>
              <div style="margin: 0.1rem 0 0.2rem 0.1rem;">
                <span v-html="item.content">{{item.content}}</span>
              </div>
            </van-col>
          </van-row>
          <!--图片-->
          <van-row>
            <van-col>
              <!--4个以上9宫格-->
              <van-grid v-if="item.resourceList.length>3" :border="true" :column-num="3">
                <van-grid-item v-for="img in item.resourceList" :key="img">
                  <van-image width="1rem"
                             height="1rem"
                             fit="fill" v-on:click="openImg(img)" v-bind:src="img"/>
                </van-grid-item>
              </van-grid>
              <!--4个及以下4宫格-->
              <van-grid v-else :border="true" :column-num="2">
                <van-grid-item v-for="img in item.resourceList" :key="img">
                  <van-image width="1rem"
                             height="1rem"
                             fit="fill" v-on:click="openImg(img)" v-bind:src="img"/>
                </van-grid-item>
              </van-grid>
            </van-col>
          </van-row>
          <van-row>
            <van-divider/>
          </van-row>
          <!--转评赞-->
          <van-row style="line-height: 0.2rem;text-align: center">
            <van-col span="8" style="text-align: center">
              <div>
                <van-icon name="share" />
              </div>
            </van-col>
            <van-col span="8" style="text-align: center">
              <div>
                <van-icon name="chat" :badge="item.commentNum" />
              </div>
            </van-col>
            <van-col span="8" style="text-align: center">
              <div>
                <van-icon v-if="item.likeNum != 0" name="good-job" :badge="item.likeNum"/>
                <van-icon v-else name="good-job" />
              </div>
            </van-col>
          </van-row>

        </div>

      </van-list>
    </van-pull-refresh>
    <!--图片放大-->
    <!--todo 超长图片显示问题-->
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block"><img width="100%" v-bind:src="imgShowUrl" alt=""/></div>
      </div>
    </van-overlay>

  </div>

</template>

<script>

export default {
  name: 'UserNews',

  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      show: false,
      imgShowUrl: '',
      curHeight: 0
    }
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          this.list.push({
            blogId: 357,
            userId: 30,
            userName: '王某某',
            avatarUrl: '//47.98.46.243:8080/userImg/20190916200754_wa.jpg',
            createTime: '2019-12-11 12:00:54',
            content: '淦、还有人么！',
            likeNum: 5,
            commentNum: 1,
            isRepost: 0,
            repostId: null,
            circleId: 21,
            circleName: '你去过哪些地方',
            type: null,
            weight: 1,
            resourceList: [
              '//47.98.46.243:8080/blogImg/20190921033918_timg (1).jpeg',
              '//47.98.46.243:8080/blogImg/20190921033925_timg (2).jpeg',
              '//47.98.46.243:8080/blogImg/20190921033930_timg (3).jpeg',
              '//47.98.46.243:8080/blogImg/20190921033937_timg (5).jpeg',
              '//47.98.46.243:8080/blogImg/20190921033943_timg.jpeg'
            ],

            blogInfo: null
          })
        }
        this.loading = false

        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    openImg (url) {
      console.log(url)
      this.imgShowUrl = url
      this.show = true
    }
  }
}
</script>

<style scoped>
  <!--
  遮罩层样式-- >
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50% 0 0 0;
    /*height: 100%;*/
  }

  .block {
    width: 100%;
    margin: 2rem 0 0 0;
  }
</style>
