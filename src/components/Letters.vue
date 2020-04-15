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
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item,index) in list" :key="index" style="margin: 0 0 0.1rem 0;background-color: white">
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
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }
        for (let i = 0; i < 10; i++) {
          this.list.push({
            avatarUrl: '//47.98.46.243:8080/userImg/20190921015211_avatar5.png',
            letterContent: '你好呀',
            userName: '隔岸观火',
            userId: 1,
            sendTime: '2020-04-12 17:54:48'
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
    }
  }
}
</script>

<style scoped>

</style>
