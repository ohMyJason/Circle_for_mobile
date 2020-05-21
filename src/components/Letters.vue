<template>
  <div style="background-color: #f2f2f2">
    <van-sticky>
      <div style="text-align: center;background-color: white"><span style="line-height: 0.5rem;">消息</span>
        <van-divider/>
      </div>
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
      >
        <div v-for="(item,index) in list" :key="index" style="margin: 0 0 0.1rem 0;background-color: white" @click="toLetterItem(item.userName,item.avatarUrl)">
          <van-row>
            <van-col span="4">
              <van-image
                round
                width="0.5rem"
                height="0.5rem"
                v-bind:src="item.avatarUrl"
                style="margin: 0.1rem 0 0.1rem 0.1rem"
              />
            </van-col>
            <van-col span="19" >
              <van-row style="margin: 0.05rem 0 0 0;text-align: right"><span style="font-size: 0.1rem;color: #7e8c8d ">{{item.sendTime}}</span></van-row>
              <van-row style="margin: 0 0 0 0.1rem;"><span>{{item.userName}}</span></van-row>
              <van-row style="margin: 0.05rem 0 0 0.1rem;"><span style="font-size: 0.1rem;color: #7e8c8d;" v-html="item.letterContent">{{item.letterContent}}</span>
              </van-row>
            </van-col>
          </van-row>
        </div>

      </van-list>
    </van-pull-refresh>
    <Tabbar ></Tabbar>

  </div>
</template>

<script>
import Tabbar from './Tabbar'

export default {
  name: 'Letters',
  components: {Tabbar},
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    onLoad () {
      if (this.refreshing) {
        this.list = []
        this.refreshing = false
      }
      this.$http
        .post(`session/getUserList`, this.$qs.stringify())
        .then(res => {
          if (res.data.code === 0) {
            this.list = this.list.concat(res.data.data)
          } else {
            this.Notify({ type: 'danger', message: res.data.msg })
          }
          console.log(res)
        })
      this.loading = false
      this.finished = true
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    toLetterItem (username, avatarUrl) {
      this.$router.push({path: '/LetterItem', query: {userName: username, avatarUrl: avatarUrl}})
    }
  }
}
</script>

<style scoped>

</style>
