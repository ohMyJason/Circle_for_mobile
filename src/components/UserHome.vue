<template>
  <div>
    <van-sticky>
      <div style="text-align: center;background-color: white">
        <van-row>
          <van-col span="12" style="text-align: right"><span style="line-height: 0.5rem;">我</span>
          </van-col>
          <van-col span="12" style="text-align: right">
            <van-icon size="0.2rem" style="margin: 0.15rem 0.1rem 0 0" name="setting-o" @click="toSetting"/>
          </van-col>
        </van-row>
        <van-divider/>
      </div>
    </van-sticky>
    <div>
      <van-row style="text-align: center;margin: 0 0 0.1rem 0">
        <van-image
          round
          width="0.5rem"
          height="0.5rem"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-row>
      <van-row style="text-align: center;margin: 0 0 0.1rem 0"><span style="font-size: 0.15rem">刘刘Jason</span></van-row>
      <van-row style="text-align: center;margin: 0 0 0.1rem 0"><span
        style="margin: 0 0.1rem 0 0" @click="toFollows">31 关注</span><span>|</span><span style="margin: 0 0 0 0.07rem" @click="toFans">11 被关注</span>
      </van-row>
      <van-row style="text-align: center;margin: 0 0 0.1rem 0">
        <van-tag round style="margin: 0 0.1rem 0 0" type="primary">♂</van-tag>
        <van-tag round style="margin: 0 0.1rem 0 0">厦门</van-tag>
        <van-tag round style="margin: 0 0.1rem 0 0">互联网技术</van-tag>
        <van-tag round style="margin: 0 0.1rem 0 0">集美大学</van-tag>
        <van-tag round style="margin: 0 0.1rem 0 0">白羊座</van-tag>
      </van-row>
      <van-row style="text-align: center;margin: 0 0 0.1rem 0"><span
        style="font-size: 0.1rem;color: #7e8c8d">心情垃圾箱</span></van-row>
      <van-divider/>
    </div>
    <UserNews></UserNews>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import UserNews from './UserNews'
import Tabbar from './Tabbar'

export default {
  name: 'UserHome',
  components: {UserNews, Tabbar},
  methods: {
    toSetting () {
      this.$router.push({path: '/Setting'})
    },
    toFans () {
      this.$router.push({path: '/Fans'})
    },
    toFollows () {
      this.$router.push({path: '/Follows'})
    }
  }
}
</script>

<style scoped>

</style>
