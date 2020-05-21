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
      <van-cell  value="编辑个人资料" @click="toUserInfo" />
    </van-row>
    <van-row>
      <div class="cell-interval"><span>关于软件</span></div>
    </van-row>
    <van-row class="setting-cell">
      <van-cell  value="用户协议" to="/UserAgreement"/>
      <!--<van-cell  value="隐私政策" />-->
    </van-row>
    <van-row>
      <div class="cell-interval"><span>其他</span></div>
    </van-row>
    <van-row class="setting-cell">
      <van-cell  value="检查新版本" @click="checkVersion"/>
      <van-cell  value="退出登录" @click="exitLogin"/>
    </van-row>
    <van-row>
      <div class="cell-interval" style="height: 0.3rem"></div>
    </van-row>
  </div>
</div>
</template>

<script>
import { Toast } from 'vant'

export default {
  name: 'Setting',
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    exitLogin () {
      this.$cookies.remove('userId')
      this.$cookies.remove('token')
      this.$router.push({path: '/'})
    },
    toUserInfo () {
      this.$router.push({ path: '/UserInfo', query: {firstFlag: 0} }) // post成功后跳到用户信息页面
    },
    checkVersion () {
      Toast('当前已经是最新版本')
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
