<template>
  <div>
    <van-sticky>
      <div style="text-align: center;background-color: white">
        <van-row>
          <van-col span="12" style="text-align: right"><span style="line-height: 0.5rem;">我</span>
          </van-col>
          <van-col span="12" style="text-align: right">
            <van-icon size="0.2rem" style="margin: 0.15rem 0.1rem 0 0" name="setting-o" @click="toSetting"/>
          </van-col>
        </van-row>
        <van-divider/>
      </div>
    </van-sticky>
    <div>
      <van-row style="text-align: center;margin: 0 0 0.1rem 0">
        <van-image
          round
          width="0.5rem"
          height="0.5rem"
          :src="currentUser.avatarUrl"
        />
      </van-row>
      <van-row style="text-align: center;margin: 0 0 0.1rem 0"><span style="font-size: 0.15rem">{{currentUser.userName}}</span></van-row>
      <van-row style="text-align: center;margin: 0 0 0.1rem 0"><span
        style="margin: 0 0.1rem 0 0" @click="toFollows">{{currentUser.bloggerNum}} 关注</span><span>|</span><span style="margin: 0 0 0 0.07rem" @click="toFans">{{currentUser.fansNum}} 被关注</span>
      </van-row>
      <van-row style="text-align: center;margin: 0 0 0.1rem 0">
        <van-tag v-if="userInfo.sex==1 && userInfo.isSingle==0" round style="margin: 0 0.1rem 0 0" type="primary">♂</van-tag>
        <van-tag v-if="userInfo.sex==1 && userInfo.isSingle==1" round style="margin: 0 0.1rem 0 0" type="primary">♂ 单身</van-tag>
        <van-tag v-if="userInfo.sex==1 && userInfo.isSingle==2" round style="margin: 0 0.1rem 0 0" type="primary">♂ 恋爱</van-tag>
        <van-tag v-if="userInfo.sex==1 && userInfo.isSingle==3" round style="margin: 0 0.1rem 0 0" type="primary">♂ 一言难尽</van-tag>
        <van-tag v-if="userInfo.sex==2 && userInfo.isSingle==0" round style="margin: 0 0.1rem 0 0" type="danger">♀</van-tag>
        <van-tag v-if="userInfo.sex==2 && userInfo.isSingle==1" round style="margin: 0 0.1rem 0 0" type="danger">♀ 单身</van-tag>
        <van-tag v-if="userInfo.sex==2 && userInfo.isSingle==2" round style="margin: 0 0.1rem 0 0" type="danger">♀ 恋爱</van-tag>
        <van-tag v-if="userInfo.sex==2 && userInfo.isSingle==3" round style="margin: 0 0.1rem 0 0" type="danger">♀ 一言难尽</van-tag>
        <van-tag v-if="userInfo.sex==0 && userInfo.isSingle==0" round style="margin: 0 0.1rem 0 0" >性别未知</van-tag>
        <van-tag v-if="userInfo.sex==0 && userInfo.isSingle==1" round style="margin: 0 0.1rem 0 0" >性别未知/单身</van-tag>
        <van-tag v-if="userInfo.sex==0 && userInfo.isSingle==2" round style="margin: 0 0.1rem 0 0" >性别未知/恋爱</van-tag>
        <van-tag v-if="userInfo.sex==0 && userInfo.isSingle==3" round style="margin: 0 0.1rem 0 0" >性别未知/一言难尽</van-tag>
        <van-tag round style="margin: 0 0.1rem 0 0">集美大学</van-tag>
        <van-tag round style="margin: 0 0.1rem 0 0">{{userInfo.birthday}}</van-tag>
      </van-row>
      <van-row style="text-align: center;margin: 0 0 0.1rem 0"><span
        style="font-size: 0.1rem;color: #7e8c8d">{{userInfo.address}}</span></van-row>
      <van-divider/>
    </div>
    <UserNews :blogListType="'byMyBlog'"></UserNews>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import UserNews from './UserNews'
import Tabbar from './Tabbar'

export default {
  name: 'UserHome',
  components: {UserNews, Tabbar},
  data () {
    return {
      currentUser: '',
      userInfo: ''
    }
  },
  methods: {
    toSetting () {
      this.$router.push({path: '/Setting'})
    },
    toFans () {
      this.$router.push({path: '/Fans'})
    },
    toFollows () {
      this.$router.push({path: '/Follows'})
    }
  },
  created () {
    this.$http
      .post(`userInfo/getUserAvatarAndRelation`, this.$qs.stringify({
      }))
      .then(res => {
        if (res.data.code === 0) {
          this.currentUser = res.data.data
        } else {
          this.Notify({ type: 'danger', message: res.data.msg })
        }
        console.log(res)
      })

    this.$http
      .post(`userInfo/getUserInfo`, this.$qs.stringify({
      }))
      .then(res => {
        if (res.data.code === 0) {
          this.userInfo = res.data.data
        } else {
          this.Notify({ type: 'danger', message: res.data.msg })
        }
        console.log(res)
      })
    // this.$http
    //   .post(`userInfo/getUserInfo`, this.$qs.stringify({
    //   }))
    //   .then(res => {
    //     if (res.data.code === 0) {
    //       this.currentUser = res.data.data
    //     } else {
    //       this.Notify({ type: 'danger', message: res.data.msg })
    //     }
    //     console.log(res)
    //   })
  }
}
</script>

<style scoped>

</style>
