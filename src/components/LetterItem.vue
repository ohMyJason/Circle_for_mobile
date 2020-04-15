<template>
  <div style="background-color: #7e8c8d">
    <van-nav-bar
      title="不如你美"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />

    <div style="margin: 0.5rem 0 0 0;">
      <div style="background-color: white">
        <van-row style="text-align: center"><span style="font-size: 0.1rem;color: #7e8c8d">2019-10-26 17:23:18</span></van-row>
        <van-row>
          <van-col style="margin: 0 0 0 0.1rem" span="4">
            <van-image
              round
              width="0.5rem"
              height="0.5rem"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </van-col>
          <van-col  span="17" style="margin: 0.05rem 0 0 0">
            <div style="border: #151515 solid 2px;border-radius: 0.1rem;padding: 0.1rem 0.1rem 0.1rem 0.1rem"><span style="line-height: 0.2rem;font-size: 0.13rem;margin: 0 0.1rem 0 0.1rem">你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀</span></div>
          </van-col>
        </van-row>
      </div>

      <div style="background-color: white">
        <van-row style="text-align: center"><span style="font-size: 0.1rem;color: #7e8c8d">2019-10-26 17:23:18</span></van-row>
        <van-row>
          <van-col style="margin: 0 0 0 0.1rem;float: right;" span="4">
            <van-image
              round
              width="0.5rem"
              height="0.5rem"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </van-col>
          <van-col  style="margin: 0.05rem 0 0 0.2rem;float: right" span="17">
            <div style="border: #151515 solid 2px;border-radius: 0.1rem;padding: 0.1rem 0.1rem 0.1rem 0.1rem;background-color: #3C827E"><span style="line-height: 0.2rem;font-size: 0.13rem;margin: 0 0.1rem 0 0.1rem">你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀</span></div>
          </van-col>
        </van-row>
      </div>
    </div>

    <van-tabbar>
      <van-row style="width: 100%">
        <van-col span="3">
          <van-icon style="margin: 0.1rem 0 0 0.1rem" size="0.25rem" name="smile"/>
        </van-col>
        <van-col span="17">
          <van-field
            v-model="message"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入留言"
          />
        </van-col>
        <van-col span="4">
          <van-button color="#3C827E" style="margin: 0.1rem 0 0 0" type="primary" size="small">发送</van-button>
        </van-col>
      </van-row>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'LetterItem',
  data () {
    return {
      message: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({path: '/Letters'})
    }

  }
}
</script>
<!--深入修改组件样式-->
<style scoped>

  /deep/ .van-nav-bar .van-icon {
    color: #3C827E;
  }

  /deep/ .van-nav-bar__text {
    color: #3C827E;
  }
</style>
