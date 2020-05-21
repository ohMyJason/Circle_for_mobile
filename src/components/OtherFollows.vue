<template>
  <div style="background-color: #f2f2f2">
    <van-nav-bar
      title="Ta关注的人"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <div style="margin: 0.44rem 0 0 0">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="(item,index) in blogerList" :key="index" style="margin: 0.1rem 0 0 0;background-color: white" >
            <van-row>
              <van-col span="4" @click="toBloggerHome(item.bloggerId)">
                <van-image
                  round
                  width="0.4rem"
                  height="0.4rem"
                  v-bind:src="item.avatarUrl"
                  style="margin: 0.1rem 0 0.1rem 0.1rem"
                />
              </van-col >
              <van-col span="15" style="padding: 0.1rem 0 0 0" @click="toBloggerHome(item.bloggerId)">
                <van-row style="margin: 0 0 0 0.1rem;"><span style="font-size: 0.14rem">{{item.bloggerName}}</span></van-row>
                <van-row style="margin: 0.05rem 0 0 0.1rem;"><span style="font-size: 0.1rem;color: #7e8c8d;" >{{item.birthday+''+item.address}}</span>
                </van-row>
              </van-col>
              <van-col span="4" style="margin: 0.15rem 0 0 0" @click="cancelFollow(item.bloggerId)">
                <!--<van-button round type="info" size="small" color="#3C827E">已关注</van-button>-->
              </van-col>
            </van-row>
          </div>

        </van-list>
      </van-pull-refresh>
    </div>

  </div>
</template>

<script>
export default {
  name: 'OtherFollows',
  data () {
    return {
      blogerList: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      userId: 2
    }
  },
  methods: {
    onLoad () {
      if (this.refreshing) {
        this.blogerList = []
        this.refreshing = false
      }

      this.$http
        .post(`userInfo/getAllBloggerOthers`, this.$qs.stringify({
          page: this.page,
          size: 10,
          userId: this.userId
        }))
        .then(res => {
          if (res.data.code === 0) {
            this.blogerList = this.blogerList.concat(res.data.data)
            this.page++
          } else {
            this.Notify({ type: 'danger', message: res.data.msg })
          }
          console.log(res)
        })
      this.loading = false
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false
      this.page = 1
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    onClickLeft () {
      this.$router.push({path: '/UserHome'})
    },
    toBloggerHome (bloggerId) {
      this.$router.push({path: '/OtherUserHome', query: {userId: bloggerId}})
    },
    cancelFollow (bloggerId) {
      this.$http
        .post(`userInfo/addConcernOrSub`, this.$qs.stringify({
          userId: bloggerId
        }))
        .then(res => {
          if (res.data.code === 0) {
            this.Notify({ type: 'success', message: '取消关注了(๑•́ ₃•̀๑) ' })
          } else {
            this.Notify({ type: 'danger', message: res.data.msg + '了(๑•́ ₃•̀๑)' })
            // this.blogerList.splice(index, index)
            setTimeout(() => {
              this.$router.go(0)
            }, 1000)
          }
          console.log(res)
        })
    }
  },
  created () {
    this.userId = this.$route.query.userId
  }
}
</script>

<style scoped>
  /deep/ .van-nav-bar .van-icon {
    color: #3C827E;
  }

  /deep/ .van-nav-bar__text {
    color: #3C827E;
  }
</style>
