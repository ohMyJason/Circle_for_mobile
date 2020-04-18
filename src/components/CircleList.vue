<template>
  <div>
    <div>
      <van-row>
        <van-col span="6">
          <van-image width="0.9rem" height="0.9rem" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
        </van-col>
        <van-col span="18">
          <van-row class="circle-card-span"><span>你去过哪些地方</span></van-row>
          <van-row class="circle-card-span"><span>分享你去过的地方</span></van-row>
          <van-row class="circle-card-span"><van-icon name="friends-o" badge="32" /><van-icon name="chat-o" badge="23" /></van-row>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CircleList'
}
</script>

<style scoped>
  .circle-card-span{
    line-height: 0.3rem

  }
</style>
