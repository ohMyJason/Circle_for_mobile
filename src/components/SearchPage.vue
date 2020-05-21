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
            v-model="blogContent"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
          />
        </form>
      </van-sticky>
      <UserNews :key="timer" :blogListType="'bySearch'" :targetBlogContent="this.blogContent"></UserNews>
    </div>

  </div>
</template>

<script>

import UserNews from './UserNews'
export default {
  name: 'SearchPage',
  components: {UserNews},
  data () {
    return {
      blogContent: '',
      timer: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
    },
    onSearch () {
      this.timer = new Date().getTime()
      console.log('search·')
    },
    onCancel () {
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
