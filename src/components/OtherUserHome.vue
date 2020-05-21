<template>
  <div>
    <van-sticky>
      <div style="text-align: center;background-color: white">
        <van-row>
          <van-col span="24" style="text-align: center"><span style="line-height: 0.5rem;">{{userInfo.userName}}</span>
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
          :src="userInfo.avatarUrl"
        />
      </van-row>
      <van-row style="text-align: center;margin: 0 0 0.1rem 0"><span
        style="font-size: 0.15rem">{{userInfo.userName}}</span></van-row>
      <van-row style="text-align: center;margin: 0 0 0.1rem 0"><span
        style="margin: 0 0.1rem 0 0" @click="toFollows">{{userInfo.bloggerNum}} 关注</span><span>|</span><span
        style="margin: 0 0 0 0.07rem" @click="toFans">{{userInfo.fansNum}} 被关注</span>
      </van-row>
      <van-row style="text-align: center;margin: 0 0 0.1rem 0">
        <van-tag v-if="userInfo.sex==1 && userInfo.isSingle==0" round style="margin: 0 0.1rem 0 0" type="primary">♂
        </van-tag>
        <van-tag v-if="userInfo.sex==1 && userInfo.isSingle==1" round style="margin: 0 0.1rem 0 0" type="primary">♂ 单身
        </van-tag>
        <van-tag v-if="userInfo.sex==1 && userInfo.isSingle==2" round style="margin: 0 0.1rem 0 0" type="primary">♂ 恋爱
        </van-tag>
        <van-tag v-if="userInfo.sex==1 && userInfo.isSingle==3" round style="margin: 0 0.1rem 0 0" type="primary">♂
          一言难尽
        </van-tag>
        <van-tag v-if="userInfo.sex==2 && userInfo.isSingle==0" round style="margin: 0 0.1rem 0 0" type="danger"
                 color="#F9AAB6">♀
        </van-tag>
        <van-tag v-if="userInfo.sex==2 && userInfo.isSingle==1" round style="margin: 0 0.1rem 0 0" type="danger"
                 color="#F9AAB6">♀ 单身
        </van-tag>
        <van-tag v-if="userInfo.sex==2 && userInfo.isSingle==2" round style="margin: 0 0.1rem 0 0" type="danger"
                 color="#F9AAB6">♀ 恋爱
        </van-tag>
        <van-tag v-if="userInfo.sex==2 && userInfo.isSingle==3" round style="margin: 0 0.1rem 0 0" type="danger"
                 color="#F9AAB6">♀ 一言难尽
        </van-tag>
        <van-tag v-if="userInfo.sex==0 && userInfo.isSingle==0" round style="margin: 0 0.1rem 0 0">性别未知</van-tag>
        <van-tag v-if="userInfo.sex==0 && userInfo.isSingle==1" round style="margin: 0 0.1rem 0 0">性别未知/单身</van-tag>
        <van-tag v-if="userInfo.sex==0 && userInfo.isSingle==2" round style="margin: 0 0.1rem 0 0">性别未知/恋爱</van-tag>
        <van-tag v-if="userInfo.sex==0 && userInfo.isSingle==3" round style="margin: 0 0.1rem 0 0">性别未知/一言难尽</van-tag>
        <van-tag round style="margin: 0 0.1rem 0 0">集美大学</van-tag>
        <van-tag round style="margin: 0 0.1rem 0 0">{{userInfo.birthday}}</van-tag>
      </van-row>
      <van-row style="text-align: center;margin: 0 0 0.1rem 0"><span
        style="font-size: 0.1rem;color: #7e8c8d">{{userInfo.address}}</span></van-row>
      <van-row style="text-align: center">
        <van-col span="12">
          <van-button round type="info" size="small" color="#3C827E" v-if="isFollow==true" @click="follow()">已关注
          </van-button>
          <van-button round type="info" size="small" color="#D7D7DF" v-if="isFollow==false" @click="follow()">未关注
          </van-button>
        </van-col>
        <van-col span="12">
          <van-button round type="info" size="small" color="#FFC82C"  @click="sendLetter()">私信
          </van-button>
        </van-col>

      </van-row>

      <van-divider/>
    </div>
    <UserNews :blogListType="'byOtherUserBlog'" :targetUserId="userId"></UserNews>
  </div>
</template>

<script>
import UserNews from './UserNews'

export default {
  name: 'OtherUserHome',
  components: {UserNews},
  data () {
    return {
      userInfo: '',
      userId: 1,
      isFollow: ''
    }
  },
  methods: {
    toSetting () {
      this.$router.push({path: '/Setting'})
    },
    toFans () {
      this.$router.push({path: '/OtherFans', query: {userId: this.userId}})
    },
    toFollows () {
      this.$router.push({path: '/OtherFollows', query: {userId: this.userId}})
    },
    follow () {
      this.$http
        .post(`userInfo/addConcernOrSub`, this.$qs.stringify({
          userId: this.userId
        }))
        .then(res => {
          if (res.data.code === 0) {
            this.isFollow = true
            this.Notify({type: 'success', message: '关注了 (ฅ´ω`ฅ)'})
          } else {
            this.isFollow = false
            this.Notify({type: 'danger', message: '取消关注了（ﾉ´д｀）'})
          }
          console.log(res)
        })
    },
    sendLetter () {
      this.$router.push({path: '/LetterItem', query: {userName: this.userInfo.userName, avatarUrl: this.userInfo.avatarUrl}})
    }
  },
  created () {
    this.userId = this.$route.query.userId
    if (this.userId + '' === this.$cookies.get('userId') + '') {
      this.$router.push({path: '/UserHome'})
    } else {
      this.$http
        .post(`userInfo/getOtherInfo`, this.$qs.stringify({
          userId: this.userId
        }))
        .then(res => {
          if (res.data.code === 0) {
            this.userInfo = res.data.data
          } else {
            this.Notify({type: 'danger', message: res.data.msg})
          }
          console.log(res)
        })

      this.$http
        .post(`userInfo/ifConcern`, this.$qs.stringify({
          userId: this.userId
        }))
        .then(res => {
          if (res.data.code === 0) {
            this.isFollow = true
          } else {
            this.isFollow = false
          }
          console.log(res)
        })
    }
  }
}
</script>

<style scoped>

</style>
