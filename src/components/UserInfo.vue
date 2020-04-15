<template>
<div style="background-color: #f2f2f2;">
  <van-nav-bar
    title="编辑个人信息"
    left-text="返回"
    left-arrow
    fixed
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
  <div style="margin: 0.42rem 0 0 0">
    <div style="text-align: center;padding: 0.2rem 0 0.2rem 0">
      <van-row><van-image
        round
        width="0.7rem"
        height="0.7rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      /></van-row>
      <van-row><van-button color="#3C827E" round type="info" size="mini">更换</van-button></van-row>
    </div>
    <van-row class="setting-cell">
      <van-cell title="用户名" value="刘刘Jason" />
      <van-cell title="性别" value="男" />
      <van-cell title="感情状况" value="一言难尽" />
      <van-cell title="生日" value="1998-3-24" />
    </van-row>
    <van-row>
      <div class="cell-interval"></div>
    </van-row>
    <van-row>
      <van-cell title="手机号" value="xxxxx" />
      <van-cell title="邮箱" value="xxxxx" />
      <van-cell title="注册时间" value="xxxxx" />
      <van-cell title="所在地" value="xxxxx" />
    </van-row>
    <van-row>
      <div class="cell-interval" style="height: 0.3rem"></div>
    </van-row>
  </div>
</div>
</template>

<script>
export default {
  name: 'UserInfo',
  methods: {
    onClickLeft () {
      this.$router.push({path: '/Setting'})
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
