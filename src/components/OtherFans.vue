<template>
  <div style="background-color: #f2f2f2">
    <van-nav-bar
      title="关注Ta的人"
      left-arrow
      fixed
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div style="margin: 0.44rem 0 0 0">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="(item,index) in fansList" :key="index" style="margin: 0.1rem 0 0 0;background-color: white">
            <van-row>
              <van-col span="4">
                <van-image
                  round
                  width="0.4rem"
                  height="0.4rem"
                  v-bind:src="item.avatarUrl"
                  style="margin: 0.1rem 0 0.1rem 0.1rem"
                />
              </van-col>
              <van-col span="15" style="padding: 0.1rem 0 0 0">
                <van-row style="margin: 0 0 0 0.1rem;"><span style="font-size: 0.14rem">{{item.fansName}}</span></van-row>
                <van-row style="margin: 0.05rem 0 0 0.1rem;"><span style="font-size: 0.1rem;color: #7e8c8d;" >{{item.birthday}}</span>
                </van-row>
              </van-col>
              <van-col span="4" style="margin: 0.15rem 0 0 0">
                <!--<van-button round type="info" size="small" color="#3C827E" v-if="item.flag==0" @click="follow(item.fansId)">已关注</van-button>-->
                <!--<van-button round type="info" size="small" color="#D7D7DF" v-if="item.flag==1" @click="follow(item.fansId)">未关注</van-button>-->
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
  name: 'OtherFans',
  data () {
    return {
      fansList: [],
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
        this.fansList = []
        this.refreshing = false
      }

      this.$http
        .post(`userInfo/getAllFansOthers`, this.$qs.stringify({
          page: this.page,
          size: 10,
          userId: this.userId
        }))
        .then(res => {
          if (res.data.code === 0) {
            this.fansList = this.fansList.concat(res.data.data)
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
      this.$router.go(-1)
    },
    onClickRight () {},
    follow (fansId) {
      this.$http
        .post(`userInfo/addConcernOrSub`, this.$qs.stringify({
          userId: fansId
        }))
        .then(res => {
          if (res.data.code === 0) {
            this.Notify({ type: 'success', message: '关注了 (ฅ´ω`ฅ) ' })
            setTimeout(() => {
              this.$router.go(0)
            }, 1000)
          } else {
            this.Notify({ type: 'danger', message: res.data.msg + '了(๑•́ ₃•̀๑)' })
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
