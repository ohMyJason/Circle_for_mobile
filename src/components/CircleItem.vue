<template>
  <div>
    <van-sticky>

      <div style="text-align: center;background-color: white"><span style="line-height: 0.5rem;">{{circleItem.circleName}}</span>
        <van-divider/>
      </div>
    </van-sticky>

    <div class="circle-card">
      <van-row>
        <van-col span="7">
          <van-image width="1rem" height="1rem" :src="circleItem.circleImgUrl"/>
        </van-col>
        <van-col span="17">
          <van-row class="circle-card-span"><span>{{circleItem.circleName}}</span></van-row>
          <van-row class="circle-card-span"><span
            style="font-size: 0.134rem;color: #7e8c8d">{{circleItem.circleTitle}}</span></van-row>
          <van-row class="">
            <van-col span="20">
              <span style="font-size: 0.1rem">创建人:{{circleItem.createName}}<br/>创建时间：:{{circleItem.createTime}}</span>
            </van-col>
            <van-col span="4">
              <van-icon name="chat-o" :badge="circleItem.blogNum"/>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>

    <UserNews :blogListType="'byCircleItem'" :targetCircleId="circleId"></UserNews>

  </div>
</template>

<script>
import UserNews from './UserNews'
export default {
  name: 'CircleItem',
  data () {
    return {
      circleItem: '',
      circleId: ''
    }
  },
  components: {UserNews},
  methods: {},
  created () {
    this.circleId = this.$route.query.circleId
    this.$http
      .post(`circle/circleInfo`, this.$qs.stringify({
        circleId: this.$route.query.circleId
      }))
      .then(res => {
        if (res.data.code === 0) {
          this.circleItem = res.data.data
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
