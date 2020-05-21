<template>

  <div>
    <van-nav-bar
      title="动态详情"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <div style="margin: 0.5rem 0.01rem 0.1rem 0.01rem;background-color: #ffffff;">
      <!--头像，昵称，时间-->
      <van-row>
        <van-col span="4"><img v-bind:src="item.avatarUrl"
                               style="width: 0.5rem;height: 0.5rem;border-radius: 100%;margin: 0.05rem 0 0 0.05rem"
                               alt=""></van-col>
        <van-col style="margin: 0.1rem 0 0 0" span="8"><span>{{item.userName}}</span><br><span
          style="font-size: 0.1rem;color: #7e8c8d">{{item.createTime}}</span></van-col>
        <van-col span="12" style="text-align: right"><van-tag style="margin: 0.1rem 0.1rem 0 0" color="#3C827E">{{item.circleName}}</van-tag></van-col>

      </van-row>
      <!--内容-->
      <van-row>
        <van-col>
          <div style="margin: 0.1rem 0 0.2rem 0.1rem ">
            <span v-html="item.content">{{item.content}}</span>
          </div>
        </van-col>
      </van-row>
      <!--图片-->
      <van-row>
        <van-col>
          <!--没有图片-->
          <div v-if="item.resourceList.length==1&&item.resourceList[0]==null" :border="true" :column-num="2">
          </div>

          <!--4个以上9宫格-->
          <van-grid v-if="item.resourceList.length>4" :border="true" :column-num="3">
            <van-grid-item v-for="img in item.resourceList" :key="img">
              <van-image width="1rem"
                         height="1rem"
                         fit="fill" v-on:click="openImg(img)" v-bind:src="img"/>
            </van-grid-item>
          </van-grid>
          <!--4个及以下4宫格-->
          <van-grid v-if="item.resourceList.length>1 && item.resourceList.length<5" :border="true" :column-num="2">
            <van-grid-item v-for="img in item.resourceList" :key="img">
              <van-image width="1rem"
                         height="1rem"
                         fit="fill" v-on:click="openImg(img)" v-bind:src="img"/>
            </van-grid-item>
          </van-grid>
          <!--一张图片-->
          <van-grid v-if="item.resourceList.length==1&&item.resourceList[0]!=null&&item.type==1" :border="true" :column-num="0">
            <van-grid-item v-for="img in item.resourceList" :key="img">
              <van-image width="3.5rem"
                         height="3.5rem"
                         fit="fill" v-on:click="openImg(img)" v-bind:src="img"/>
            </van-grid-item>
          </van-grid>

          <!--视频-->
          <van-grid v-if="item.resourceList.length==1&&item.resourceList[0]!=null&&item.type==2" :border="true" :column-num="0">
            <van-grid-item v-for="img in item.resourceList" :key="img">
              <video :src="img" controls="controls" width="100%" height="260px">
                您的浏览器不支持播放该视频！
              </video>
            </van-grid-item>
          </van-grid>

        </van-col>
      </van-row>
      <van-row>
        <div v-if="item.isRepost==1" style="background-color: #f2f2f2">
          <!--(zhuanfa)头像，昵称，时间-->
          <van-row @click="toUserHome(item.blogInfo.userId)">
            <van-col span="4"><img v-bind:src="item.blogInfo.avatarUrl"
                                   style="width: 0.5rem;height: 0.5rem;border-radius: 100%;margin: 0.05rem 0 0 0.05rem"
                                   alt="">
            </van-col>
            <van-col style="margin: 0.1rem 0 0 0" span="8"><span>{{item.blogInfo.userName}}</span><br><span
              style="font-size: 0.1rem;color: #7e8c8d">{{item.blogInfo.createTime}}</span>
            </van-col>

          </van-row>
          <!--转发内容-->
          <div @click="toBlogItem(item)" >

            <van-row>
              <van-col>
                <div style="margin: 0.1rem 0 0.2rem 0.1rem;line-height: 0.2rem">
                  <span v-html="item.blogInfo.content">{{item.blogInfo.content}}</span>
                </div>
              </van-col>
            </van-row>
            <!--图片-->
            <van-row>
              <van-col>

                <!--没有图片-->
                <div v-if="item.blogInfo.resourceList.length==1&&item.blogInfo.resourceList[0]==null" :border="true" :column-num="2">
                </div>

                <!--4个以上9宫格-->
                <van-grid :gutter="3" v-if="item.blogInfo.resourceList.length>4" :border="false" :column-num="3">
                  <van-grid-item v-for="img in item.blogInfo.resourceList" :key="img">
                    <van-image width="1rem"
                               height="1rem"
                               v-on:click="openImg(img)" v-bind:src="img"/>
                  </van-grid-item>
                </van-grid>
                <!--4个及以下4宫格-->
                <van-grid v-if="item.blogInfo.resourceList.length>1 && item.blogInfo.resourceList.length<5" :border="true"
                          :column-num="2">
                  <van-grid-item v-for="img in item.blogInfo.resourceList" :key="img">
                    <van-image width="1rem"
                               height="1rem"
                               fit="fill" v-on:click="openImg(img)" v-bind:src="img"/>
                  </van-grid-item>
                </van-grid>
                <!--一张图片-->
                <van-grid v-if="item.blogInfo.resourceList.length==1&&item.blogInfo.resourceList[0]!=null&&item.blogInfo.type==1" :border="true" :column-num="0">
                  <van-grid-item v-for="img in item.blogInfo.resourceList" :key="img">
                    <van-image width="3.5rem"
                               height="3.5rem"
                               fit="fill" v-on:click="openImg(img)" v-bind:src="img"/>
                  </van-grid-item>
                </van-grid>

                <!--转发视频-->
                <van-grid v-if="item.blogInfo.resourceList.length==1&&item.blogInfo.resourceList[0]!=null&&item.blogInfo.type==2" :border="true" :column-num="0">
                  <van-grid-item v-for="img in item.blogInfo.resourceList" :key="img">
                    <video :src="img" controls="controls" width="100%" height="260px">
                      您的浏览器不支持播放该视频！
                    </video>
                  </van-grid-item>
                </van-grid>

              </van-col>
            </van-row>

          </div>

        </div>
        <van-divider/>

      </van-row>
      <!--转评赞-->
      <van-row style="line-height: 0.2rem;text-align: center;">
        <van-col span="8" style="text-align: center">
          <div>
            <van-icon name="share" @click="toShowShare(item.blogId)"/>
          </div>
        </van-col>
        <van-col span="8" style="text-align: center">
          <div>
            <van-icon v-if="item.commentNum>0" name="chat" :badge="item.commentNum"/>
            <van-icon v-if="item.commentNum==0" name="chat"/>
          </div>
        </van-col>
        <van-col span="8" style="text-align: center">
          <div @click="addLike">
            <van-icon v-if="item.likeNum != 0" name="good-job" :badge="item.likeNum"/>
            <van-icon v-else name="good-job" />
          </div>
        </van-col>
      </van-row>

    </div>
    <van-popup v-model="shareShow" round position="bottom" :style="{ height: '8%' }" >
      <van-row style="width: 100%">

        <van-col span="19">
          <van-field
            v-model="shareContent"
            rows="1"
            autosize
            type="textarea"
            placeholder="说说分享心得..."
          />
        </van-col>
        <van-col span="5">
          <van-button color="#3C827E" style="margin: 0.1rem 0 0 0;" type="primary" size="small" @click="toShare">转发</van-button>
        </van-col>
      </van-row>

    </van-popup>
    <!-- 评论 -->
    <van-tabs color="#3C827E" v-model="active" sticky animated>
      <van-tab style="margin: 0 0 0.6rem 0;" v-for="tabItem in tabs" :key="tabItem" :title=tabItem>

      <div v-for="(comment,index) in commentList" :key="index" style="margin: 0 0 0.1rem 0;background-color: white">
      <van-row>
        <van-col span="4" @click="toUserHome(comment.userId)">
          <van-image
            round
            width="0.5rem"
            height="0.5rem"
            v-bind:src="comment.avatarUrl"
            style="margin: 0.1rem 0 0.1rem 0.1rem"
          />
        </van-col>
        <van-col span="19" >
          <van-row style="margin: 0.05rem 0 0 0;text-align: right"><span style="font-size: 0.1rem;color: #7e8c8d ">{{comment.commentTime}}</span></van-row>
          <van-row style="margin: 0 0 0 0.1rem;" @click="toUserHome(comment.userId)" ><span>{{comment.userName}}</span></van-row>
          <van-row style="margin: 0.05rem 0 0 0.1rem;"><span style="font-size: 0.1rem;color: #7e8c8d;" v-html="comment.commentContent">{{comment.commentContent}}</span>
          </van-row>
        </van-col>
      </van-row>
    </div>
      </van-tab>
    </van-tabs>
    <!--评论输入框 吸底-->
    <van-tabbar>
      <van-row style="width: 100%">
        <van-col span="3">
          <van-icon style="margin: 0.1rem 0 0 0.1rem" size="0.25rem" name="smile"/>
        </van-col>
        <van-col span="17">
          <van-field
            v-model="commentContent"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入留言"
          />
        </van-col>
        <van-col span="4">
          <van-button color="#3C827E" style="margin: 0.1rem 0 0 0;" type="primary" size="small" @click="toComment">发送</van-button>
        </van-col>
      </van-row>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'BlogItem',
  data () {
    return {
      commentContent: '',
      item: {},
      tabs: ['最新评论'],
      active: 1,
      commentList: [],
      shareShow: false,
      shareContent: '',
      shareBlogId: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    openImg (url) {
      this.ImagePreview([url])
    },
    addLike () {
      this.$http
        .post(`blog/insertLike`, this.$qs.stringify({
          blogId: this.item.blogId
        }))
        .then(res => {
          if (res.data.code === 0) {
            if (res.data.data === 1) {
              this.item.likeNum--
              this.Notify({ type: 'success', message: '取消点赞' })
            } else {
              this.item.likeNum++
              this.Notify({ type: 'success', message: '╭( `∀´ )╯╰( ’ ’ )╮' })
            }
          } else {
            this.Notify({ type: 'danger', message: res.data.msg })
          }
          console.log(res)
        })
    },
    toUserHome (userId) {
      this.$router.push({path: '/OtherUserHome', query: {userId: userId}})
    },
    toShowShare (shareBlogId) {
      this.shareShow = true
      this.shareBlogId = shareBlogId
    },
    toShare () {
      this.$http
        .post(`blog/forwardBlog`, this.$qs.stringify({
          blogId: this.shareBlogId,
          forwardContent: this.shareContent
        }))
        .then(res => {
          if (res.data.code === 0) {
            this.Notify({ type: 'success', message: '分享成功(*•̀ㅂ•́)و' })
            setTimeout(() => {
              this.$router.push({path: '/NewsSquare'})
            }, 2000)
          } else {
            this.Notify({ type: 'danger', message: res.data.msg })
          }
          console.log(res)
        })
    },
    toComment () {
      this.$http
        .post(`blog/insertComment`, this.$qs.stringify({
          blogId: this.item.blogId,
          commentContent: this.commentContent
        }))
        .then(res => {
          if (res.data.code === 0) {
            this.Notify({ type: 'success', message: '评论成功(*•̀ㅂ•́)و' })
            this.commentContent = ''
            this.commentList.push(res.data.data)
          } else {
            this.Notify({ type: 'danger', message: res.data.msg })
          }
          console.log(res)
        })
    }
  },
  created () {
    this.$http
      .post(`blog/getBlogById`, this.$qs.stringify({
        blogId: this.$route.query.blogId}))
      .then(res => {
        if (res.data.code === 0) {
          this.item = res.data.data
        } else {
          this.Notify({ type: 'danger', message: res.data.msg })
        }
        console.log(res)
      })
    this.$http
      .post(`blog/showComment`, this.$qs.stringify({
        blogId: this.$route.query.blogId}))
      .then(res => {
        if (res.data.code === 0) {
          this.commentList = this.commentList.concat(res.data.data)
        } else {
          this.Notify({ type: 'danger', message: res.data.msg })
        }
        console.log(res)
      })
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
