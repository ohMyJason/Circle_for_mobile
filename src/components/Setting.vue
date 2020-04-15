<template>
<div style="background-color: #f2f2f2">
  <van-nav-bar
    title="设置"
    left-text="返回"
    left-arrow
    fixed
    @click-left="onClickLeft"
  />
  <div style="margin: 0.4rem 0 0 0">
    <van-row>
      <div class="cell-interval"><span>关于你</span></div>
    </van-row>
    <van-row class="setting-cell">
      <van-cell  value="编辑个人资料" is-link to="/UserInfo"/>
    </van-row>
    <van-row>
      <div class="cell-interval"><span>关于软件</span></div>
    </van-row>
    <van-row class="setting-cell">
      <van-cell  value="用户协议" />
      <van-cell  value="隐私政策" />
    </van-row>
    <van-row>
      <div class="cell-interval"><span>其他</span></div>
    </van-row>
    <van-row class="setting-cell">
      <van-cell  value="检查新版本" />
      <van-cell  value="退出登录"  to="/"/>
    </van-row>
    <van-row>
      <div class="cell-interval" style="height: 0.3rem"></div>
    </van-row>
  </div>
</div>
</template>

<script>
export default {
  name: 'Setting',
  methods: {
    onClickLeft () {
      this.$router.push({path: '/UserHome'})
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
