<template>
  <div  id="message-box">
    <van-nav-bar
      :title="this.$route.query.userName"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />

    <div style="margin: 0.5rem 0 0.6rem 0;"  >
      <div v-for="(messageItem,index) in messageList" :key="index" >

        <div v-if="myUserInfo.userId!=messageItem.senterId" style="background-color: white">
          <van-row style="text-align: center"><span style="font-size: 0.1rem;color: #7e8c8d">{{messageItem.sendTime}}</span>
          </van-row>
          <van-row>
            <van-col style="margin: 0 0 0 0.1rem" span="4" @click="toUserHome(messageItem.senterId)">
              <van-image
                round
                width="0.5rem"
                height="0.5rem"
                :src="friendAvatarUrl"
              />
            </van-col>
            <van-col span="17" style="margin: 0.05rem 0 0 0">
              <div style="border: #151515 solid 2px;border-radius: 0.1rem;padding: 0.1rem 0.1rem 0.1rem 0.1rem"><span
                style="line-height: 0.2rem;font-size: 0.13rem;margin: 0 0.1rem 0 0.1rem" v-html="messageItem.letterContent">{{messageItem.letterContent}}</span>
              </div>
            </van-col>
          </van-row>
        </div>

        <div v-else style="background-color: white">
          <van-row style="text-align: center"><span style="font-size: 0.1rem;color: #7e8c8d">{{messageItem.sendTime}}</span>
          </van-row>
          <van-row>
            <van-col style="margin: 0 0 0 0.1rem;float: right;" span="4" @click="toUserHome(messageItem.senterId)" >
              <van-image
                round
                width="0.5rem"
                height="0.5rem"
                :src="myUserInfo.avatarUrl"
              />
            </van-col>
            <van-col style="margin: 0.05rem 0 0 0.2rem;float: right" span="17">
              <div
                style="border: #151515 solid 2px;border-radius: 0.1rem;padding: 0.1rem 0.1rem 0.1rem 0.1rem;background-color: #3C827E">
                <span style="line-height: 0.2rem;font-size: 0.13rem;margin: 0 0.1rem 0 0.1rem" v-html="messageItem.letterContent">{{messageItem.letterContent}}</span>
              </div>
            </van-col>
          </van-row>
        </div>
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
          <van-button color="#3C827E" style="margin: 0.1rem 0 0 0" type="primary" size="small" @click="send">发送</van-button>
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
      message: '',
      messageList: [],
      myUserInfo: '',
      // 朋友的头像
      friendAvatarUrl: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    send () {
      this.$http
        .post(`session/sendMsg`, this.$qs.stringify({
          userName: this.$route.query.userName,
          letterContent: this.message
        }))
        .then(res => {
          if (res.data.code === 0) {
            this.Notify({type: 'success', message: '发送成功'})
            this.messageList.push({
              senterId: this.myUserInfo.userId,
              letterContent: this.message,
              type: 0,
              sendTime: '2019-09-01 20:20:20'
            })
            this.message = ''
          } else {
            this.Notify({type: 'danger', message: res.data.msg})
          }
          console.log(res)
        })
    },
    toUserHome (senterId) {
      this.$router.push({path: '/OtherUserHome', query: {userId: senterId}})
    }
  },
  created () {
    this.friendAvatarUrl = this.$route.query.avatarUrl
    this.$http
      .post(`session/getMessageLog`, this.$qs.stringify({
        userName: this.$route.query.userName
      }))
      .then(res => {
        if (res.data.code === 0) {
          this.messageList = this.messageList.concat(res.data.data)
        } else {
          this.Notify({type: 'danger', message: res.data.msg})
        }
        console.log(res)
      })

    this.$http
      .post(`session/getUserInfo`, this.$qs.stringify())
      .then(res => {
        if (res.data.code === 0) {
          this.myUserInfo = res.data.data
        } else {
          this.Notify({type: 'danger', message: res.data.msg})
        }
        console.log(res)
      })

    // todo 滚动条不能默认滚动最下
    this.$nextTick(function () {
      console.log('ssssdasda')
      var content = document.getElementById('message-box')
      if (content != null) {
        content.scrollTop = 1000
        console.log(content.scrollTop)
      } else { console.log('sssda') }
    })
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
