<template>
  <div style="background-color: #f2f2f2">
    <div class="circle-card" v-for="(circleItem,index) in circleList" :key="index"
         @click="toCircleItem(circleItem.circleId)">
      <van-row>
        <van-col span="7">
          <van-image width="0.9rem" height="0.9rem" :src="circleItem.circleImgUrl"/>
        </van-col>
        <van-col span="17">
          <van-row class="circle-card-span"><span>{{circleItem.circleName}}</span></van-row>
          <van-row class="circle-card-span"><span
            style="font-size: 0.134rem;color: #7e8c8d">{{circleItem.circleTitle}}</span></van-row>
          <van-row class="circle-card-span">
            <van-col span="20">
              <van-icon name="friends-o" :badge="circleItem.userNum"/>
            </van-col>
            <van-col span="4">
              <van-icon name="chat-o" :badge="circleItem.blogNum"/>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>
    <div style="height: 1rem"></div>
  </div>
</template>

<script>
export default {
  name: 'CircleList',
  data () {
    return {
      circleList: []
    }
  },
  methods: {
    toCircleItem (circleId) {
      this.$router.push({path: '/CircleItem', query: {circleId: circleId}})
    }
  },
  created () {
    this.$http
      .post(`circle/showAllCircle`, this.$qs.stringify({}))
      .then(res => {
        if (res.data.code === 0) {
          this.circleList = this.circleList.concat(res.data.data)
        } else {
          this.Notify({type: 'danger', message: res.data.msg})
        }
        console.log(res)
      })
  }
}
</script>

<style scoped>
  .circle-card-span {
    line-height: 0.3rem

  }

  .circle-card {
    margin: 0.1rem 0 0 0;
    background-color: white;
  }
</style>
