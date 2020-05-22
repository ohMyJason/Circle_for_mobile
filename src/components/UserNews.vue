<template>
  <div style="background-color: #f2f2f2">

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!--单个动态模版-->
        <div style="margin: 0.1rem 0.01rem 0.1rem 0.01rem;background-color: #ffffff" v-for="(item,index) in list"
             :key="index">
          <!--头像，昵称，时间-->
          <van-row >
            <van-col span="4" @click="toUserHome(item.userId)"><img v-bind:src="item.avatarUrl"
                                   style="width: 0.5rem;height: 0.5rem;border-radius: 100%;margin: 0.05rem 0 0 0.05rem"
                                   alt="">
            </van-col>
            <van-col span="8" style="margin: 0.1rem 0 0 0" ><span @click="toUserHome(item.userId)">{{item.userName}}</span><br><span
              style="font-size: 0.1rem;color: #7e8c8d">{{item.createTime}}</span>
            </van-col>
            <van-col span="12" style="text-align: right"><van-tag style="margin: 0.1rem 0.1rem 0 0" color="#3C827E" @click="toCircleItem(item.circleId)">{{item.circleName}}</van-tag></van-col>
          </van-row>
          <!--内容-->
          <div >

            <van-row>
              <van-col @click="toBlogItem(item.blogId)">
                <div style="margin: 0.1rem 0 0.2rem 0.1rem;line-height: 0.2rem">
                  <span v-html="item.content">{{item.content}}</span>
                </div>
              </van-col>
            </van-row>
            <!--图片-->
            <van-row>
              <van-col>

                <!--没有图片-->
                <div v-if="item.resourceList.length==1&&item.resourceList[0]==null&&item.type==1" :border="true" :column-num="2">
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
                <van-grid v-if="item.resourceList.length>1 && item.resourceList.length<5" :border="true"
                          :column-num="2">
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

          </div>
          <!--转发微博-->
          <div v-if="item.isRepost==1" style="background-color: #f2f2f2">
            <!--(zhuanfa)头像，昵称，时间-->
            <van-row @click="toUserHome(item.blogInfo.userId)">
              <van-col span="4"><img v-bind:src="item.blogInfo.avatarUrl"
                                     style="width: 0.5rem;height: 0.5rem;border-radius: 100%;margin: 0.05rem 0 0 0.05rem"
                                     alt="">
              </van-col>
              <van-col style="margin: 0.1rem 0 0 0" span=""><span>{{item.blogInfo.userName}}</span><br><span
                style="font-size: 0.1rem;color: #7e8c8d">{{item.blogInfo.createTime}}</span>
              </van-col>
            </van-row>
            <!--转发内容-->
            <div @click="toBlogItem(item.blogId)" >

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
            <van-divider/>

          </div>
          <!--转评赞-->
          <van-divider/>

          <van-row style="line-height: 0.2rem;text-align: center">
            <van-col span="8" style="text-align: center">
              <div>
                <van-icon name="share" @click="toShowShare(item.blogId)"/>
              </div>
            </van-col>
            <van-col span="8" style="text-align: center">
              <div>
                <van-icon v-if="item.commentNum>0" name="chat" :badge="item.commentNum" @click="toBlogItem(item.blogId)"/>
                <van-icon v-if="item.commentNum==0" name="chat" @click="toBlogItem(item.blogId)"/>
              </div>
            </van-col>
            <van-col span="8" style="text-align: center">
              <div @click="addLike(item.blogId,index)">
                <van-icon v-if="item.likeNum > 0" name="good-job" :badge="item.likeNum"/>
                <van-icon v-else name="good-job"/>
              </div>
            </van-col>
          </van-row>

        </div>

      </van-list>
    </van-pull-refresh>

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

  </div>

</template>

<script>

export default {
  name: 'UserNews',

  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      curHeight: 0,
      page: 1,
      shareShow: false,
      shareContent: '',
      shareBlogId: ''
    }
  },
  methods: {
    onLoad () {
      if (this.refreshing) {
        this.list = []
        this.refreshing = false
      }
      this.loadingBlog()
      this.page++
      this.loading = false
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.page = 1
      this.onLoad()
    },
    openImg (url) {
      this.ImagePreview([url])
    },
    loadingBlog () {
      var requestUrl = ''
      if (this.blogListType === 'byTime') {
        requestUrl = 'blog/showBlogByCreateTime'
      } else if (this.blogListType === 'byHot') {
        requestUrl = 'blog/showAllBlog'
      } else if (this.blogListType === 'byFollow') {
        requestUrl = 'blog/showConcernBlog'
      } else if (this.blogListType === 'byOriginal') {
        requestUrl = 'blog/showOriginalBlog'
      } else if (this.blogListType === 'byMyBlog') {
        requestUrl = 'userInfo/getUserAllBlog'
      } else if (this.blogListType === 'byOtherUserBlog') {
        requestUrl = 'userInfo/getOtherBlog'
      } else if (this.blogListType === 'byCircleItem') {
        requestUrl = 'circle/circleBlog'
      } else if (this.blogListType === 'bySearch') {
        requestUrl = 'blog/searchBlogByContent'
      }

      if (requestUrl === 'circle/circleBlog') {
        this.$http
          .post(requestUrl, this.$qs.stringify({
            page: this.page,
            size: 10,
            circleId: this.targetCircleId
          }))
          .then(res => {
            if (res.data.code === 0) {
              this.list = this.list.concat(res.data.data)
            } else {
              this.Notify({type: 'danger', message: '系统异常：' + res.data.msg})
            }
            console.log(res)
          })
      } else if (requestUrl === 'userInfo/getOtherBlog') {
        this.$http
          .post(requestUrl, this.$qs.stringify({
            page: this.page,
            size: 10,
            userId: this.targetUserId
          }))
          .then(res => {
            if (res.data.code === 0) {
              this.list = this.list.concat(res.data.data)
            } else {
              this.Notify({type: 'danger', message: '系统异常：' + res.data.msg})
            }
            console.log(res)
          })
      } else if (requestUrl === 'blog/searchBlogByContent') {
        if (this.targetBlogContent === '') {
          requestUrl = 'blog/showAllBlog'
          this.$http
            .post(requestUrl, this.$qs.stringify({
              page: this.page,
              size: 10
            }))
            .then(res => {
              if (res.data.code === 0) {
                this.list = this.list.concat(res.data.data)
              } else {
                this.Notify({type: 'danger', message: '系统异常：' + res.data.msg})
              }
              console.log(res)
            })
        } else {
          this.$http
            .post(requestUrl, this.$qs.stringify({
              page: this.page,
              size: 10,
              content: this.targetBlogContent
            }))
            .then(res => {
              if (res.data.code === 0) {
                this.list = this.list.concat(res.data.data)
              } else {
                this.Notify({type: 'danger', message: '系统异常：' + res.data.msg})
              }
              console.log(res)
            })
        }
      } else {
        this.$http
          .post(requestUrl, this.$qs.stringify({
            page: this.page,
            size: 10
          }))
          .then(res => {
            if (res.data.code === 0) {
              this.list = this.list.concat(res.data.data)
            } else {
              this.Notify({type: 'danger', message: res.data.msg})
            }
            console.log(res)
          })
      }
    },
    toBlogItem (blogId) {
      this.$router.push({path: '/BlogItem', query: {blogId: blogId}})
    },
    addLike (blogId, index) {
      this.$http
        .post(`blog/insertLike`, this.$qs.stringify({
          blogId: blogId
        }))
        .then(res => {
          if (res.data.code === 0) {
            if (res.data.data === 1) {
              this.list[index].likeNum--
              this.Notify({type: 'success', message: '取消点赞'})
            } else {
              this.list[index].likeNum++
              this.Notify({type: 'success', message: '╭( `∀´ )╯╰( ’ ’ )╮'})
            }
          } else {
            this.Notify({type: 'danger', message: res.data.msg})
          }
          console.log(res)
        })
    },
    toUserHome (userId) {
      this.$router.push({path: '/OtherUserHome', query: {userId: userId}})
    },
    toShowShare (shareBlogId) {
      if (this.blogListType === 'byHot' || this.blogListType === 'byMyBlog' || this.blogListType === 'byOtherUserBlog') {
        this.shareShow = true
        this.shareBlogId = shareBlogId
      } else {
        this.toBlogItem(shareBlogId)
      }
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
    toCircleItem (circleId) {
      this.$router.push({path: '/CircleItem', query: {circleId: circleId}})
    }
  },
  props: {
    blogListType: '',
    targetUserId: 0, // 其他用户Id 如果是0则无效 用于访问其他用户主页
    targetCircleId: 0, // 其他用户Id 如果是0则无效 用于访问其他用户主页,
    targetBlogContent: ''
  }
}
</script>

<style scoped>
  <!--
  遮罩层样式-- >
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50% 0 0 0;
    /*height: 100%;*/
  }

  .block {
    width: 100%;
    margin: 0.8rem 0 0 0;
  }
</style>
