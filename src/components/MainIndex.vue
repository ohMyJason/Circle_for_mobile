<template>
  <div>
    <van-sticky>
      <div style="margin: 0 0 0 0;background-color: #ffffff;">
        <van-row>
          <van-col span="8"></van-col>
          <van-col span="8"><img style="width: 1rem;margin-left: 0.1rem" src="../assets/logo.png" alt=""></van-col>
          <van-col span="4">
            <div style="margin:0.1rem 0 0 0.4rem">
              <van-icon name="search" size="0.3rem" @click="toSearchNews" />
            </div>
          </van-col>
          <van-col span="4">
            <div style="margin:0.08rem 0 0 0.3rem">
              <van-icon name="add-o" size="0.3rem" @click="toPublishNews"/>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-sticky>
    <UserNews></UserNews>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import UserNews from './UserNews'
import Tabbar from './Tabbar'

export default {
  name: 'MainIndex',
  components: {
    UserNews,
    Tabbar
  },
  methods: {
    toPublishNews () {
      this.$router.push({path: '/PublishNews'})
    },
    toSearchNews () {
      this.$router.push({path: '/SearchPage'})
    }
  }
}
</script>

<style scoped>

</style>
