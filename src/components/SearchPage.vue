<template>
  <div style="background-color: #f2f2f2">
    <van-nav-bar
      title="动态搜索"
      left-arrow
      fixed
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <div style="margin: 0.44rem 0 0 0">

      <van-sticky >
        <form action="/">
          <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
          />
        </form>
      </van-sticky>
      <UserNews></UserNews>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant'
import UserNews from './UserNews'
export default {
  name: 'SearchPage',
  components: {UserNews},
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({path: '/MainIndex'})
    },
    onClickRight () {
    },
    onSearch (val) {
      Toast(val)
    },
    onCancel () {
      Toast('取消')
    }
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
