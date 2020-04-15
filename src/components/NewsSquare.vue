<template>
  <div>
    <van-sticky>
      <div style="text-align: center;background-color: white"><span style="line-height: 0.5rem;">动态广场</span></div>
    </van-sticky>
    <van-tabs color="#3C827E" v-model="active" sticky animated>
      <van-tab title="最新动态">
        <UserNews></UserNews>
      </van-tab>
      <van-tab title="最热动态">
        <UserNews></UserNews>
      </van-tab>
      <van-tab title="热门圈子">
        <UserNews></UserNews>
      </van-tab>
    </van-tabs>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import UserNews from './UserNews'
import Tabbar from './Tabbar'

export default {
  name: 'NewsSquare',
  components: {UserNews, Tabbar},
  data () {
    return {
      active: 1
    }
  }

}
</script>

<style scoped>

</style>
