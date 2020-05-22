<template>
  <div>
    <van-sticky>
      <div style="margin: 0 0 0 0;background-color: #ffffff;">

        <van-row>
          <van-col span="8">
            <van-tag color="#3C827E" round type="danger" style="margin:  0.15rem 0 0 0.1rem" @click="showHotCirclePopup">热门圈子</van-tag>
          </van-col>
          <van-col span="8"><img style="width: 1rem;margin-left: 0.1rem" src="../assets/logo.png" alt=""></van-col>
          <van-col span="4">
            <div style="margin:0.1rem 0 0 0.4rem">
              <van-icon name="search" size="0.3rem" @click="toSearchNews"/>
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
    <UserNews :blogListType="'byHot'"></UserNews>
    <Tabbar></Tabbar>

    <van-popup v-model="hotCircleShow" position="top" :style="{ width: '2rem',height:'100%' }">
      <div style="background-color: #f2f2f2">
        <div style="height: 0.15rem"></div>

        <div class="circle-card" v-for="(hotCircleItem,index) in hotCircleList" :key="index"
             @click="toCircleItem(hotCircleItem.circleId)">

          <van-row v-if="index<8">
            <van-col span="7">
              <van-image width="0.5rem" height="0.5rem" :src="hotCircleItem.circleImg"/>
            </van-col>
            <van-col span="17">
              <van-row class="circle-card-span"><span>{{hotCircleItem.circleName+' '}}</span><van-tag round type="danger" v-if="index<4">hot</van-tag></van-row>
              <van-row class="circle-card-span"><span style="font-size: 0.134rem;color: #7e8c8d">{{hotCircleItem.circleTitle}}</span>
              </van-row>
              <van-row class="circle-card-span">
                <van-col span="20">
                  <van-icon name="friends-o" :badge="hotCircleItem.circleScore"/>
                </van-col>
              </van-row>
            </van-col>
          </van-row>

        </div>
        <div style="height: 0.15rem"></div>

      </div>

    </van-popup>
  </div>
</template>

<script>
import UserNews from './UserNews'
import Tabbar from './Tabbar'

export default {
  name: 'MainIndex',
  data () {
    return {
      hotCircleShow: false,
      hotCircleList: []
    }
  },
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
    },
    showHotCirclePopup () {
      this.hotCircleShow = true
    },
    toCircleItem (circleId) {
      this.$router.push({path: '/CircleItem', query: {circleId: circleId}})
    }
  },
  created () {
    this.$http
      .post(`circle/hotCircle`, this.$qs.stringify({}))
      .then(res => {
        if (res.data.code === 0) {
          this.hotCircleList = res.data.data
        } else {
          // this.Notify({type: 'danger', message: '热门圈子获取错误'})
        }
        console.log(res)
      })
  }
}
</script>

<style scoped>
  .circle-card-span {
    line-height: 0.3rem;
    font-size:0.1rem;

  }

  .circle-card {
    margin: 0.1rem 0 0 0;
    background-color: white;
  }
</style>
