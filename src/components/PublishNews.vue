<template>
  <div style="">
    <van-nav-bar
      title="发布新动态"
      left-text="返回"
      right-text="发表"
      left-arrow
      fixed
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div style="margin: 0.44rem 0 0 0;background-color: #f2f2f2;">
      <van-form @submit="onSubmit">

        <van-row>
          <div class="cell-interval"><span></span></div>
        </van-row>
        <van-row>
          <van-field
            v-model="blogContent"
            rows="2"
            autosize
            type="textarea"
            maxlength="140"
            placeholder="说点什么吧..."
            show-word-limit
          />
        </van-row>
        <van-row>
          <div class="cell-interval"><span></span></div>
        </van-row>
        <van-row>
          <van-col span="6">
            <van-uploader :disabled="videoUploadDisable" max-size="31457280" accept="video/*" :after-read="uploadVideo">
              <van-tag color="#3C827E" type="danger" size="medium" style="margin: 0 0 0 0.1rem">发布视频</van-tag>
            </van-uploader>
          </van-col>
          <van-col span="6">
            <van-loading color="#3C827E" v-if="videoLoding">上传中...</van-loading>
          </van-col>
          <van-col span="12" style="text-align: right">
            <van-tag style="margin: 0 0.1rem 0 0" size="medium" @click="createCirclePopupShow">没有想要的圈子？点我创建...</van-tag>
          </van-col>
        </van-row>
        <!--创建圈子-->
        <van-popup v-model="createCircleShow" :style="{ height:'3.2rem',width:'100%' }" round>
          <van-form @submit="onSubmit">
            <van-field
              v-model="circleName"
              name="圈子名称"
              label="圈子名称"
              placeholder="请输入圈子名称..."
              :rules="[{ required: true, message: '请填写圈子名称' }]"
            />
            <van-field
              v-model="circleTitle"
              name="圈子主题"
              label="圈子主题"
              placeholder="一句话描述你的圈子..."
              :rules="[{ required: true, message: '请填写圈子主题' }]"
            />
            <van-row style="margin: 16px">
              <van-col span="8" style="margin: 0.3rem 0 0 0">
                <van-uploader accept="image/*" :after-read="afterReadCircleImg">
                  <van-button round color="#3C827E" icon="photo" type="primary">上传封面</van-button>
                </van-uploader>
              </van-col>
              <van-col span="16" style="text-align: right">
                <van-image width="100" height="100" :src="circleImgUrl"/>
              </van-col>
            </van-row>
            <van-row style="margin: 16px">
              <van-button @click="toCreateCircle" round block type="info" native-type="submit" color="#3C827E">
                创建
              </van-button>
            </van-row>

          </van-form>
        </van-popup>
        <van-row>
          <div class="cell-interval"><span></span></div>
        </van-row>
        <van-row>
          <div>
            <van-field
              readonly
              clickable
              name="picker"
              :value="circleObj.circleName"
              label="选择圈子"
              :placeholder="circlePlaceholer"
              @click="showPicker = true"
            />
            <van-popup v-model="showPicker" position="bottom">
              <van-picker
                show-toolbar
                :columns="circleColume"
                value-key="circleName"
                @confirm="onConfirm"
                @cancel="showPicker = false"
              />
            </van-popup>
          </div>
        </van-row>
        <van-row>
          <div class="cell-interval"><span></span></div>
        </van-row>

        <van-row v-if="imgListShow">
          <van-col span="4"></van-col>
          <van-col span="16">
            <div style="width: 264px">
              <van-uploader accept="image/*" v-model="fileList" :after-read="afterUpload" multiple :max-count="9"/>
            </div>
          </van-col>
          <van-col span="4"></van-col>
        </van-row>

        <van-row v-if="imgListShow==false">
          <van-col span="2"></van-col>
          <van-col span="20">
            <video :src="videoUrl" controls="controls" width="100%" height="260px">
              您的浏览器不支持播放该视频！
            </video>
          </van-col>
          <van-col span="2"></van-col>
        </van-row>
      </van-form>
    </div>

  </div>
</template>

<script>
import upLoaderImg from '../upLoaderImg'

export default {
  name: 'PublishNews',
  data () {
    return {
      blogContent: '',
      fileList: [],
      circleObj: '',
      circleColume: [],
      showPicker: false,
      circleId: '40',
      fileItemIds: [],
      createCircleShow: false,
      circleName: '',
      circleTitle: '',
      circleImgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
      circlePlaceholer: '圈友日记本',
      imgListShow: true,
      videoUrl: '',
      videoLoding: false,
      videoUploadDisable: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onConfirm (circleObj) {
      this.circleObj = circleObj
      this.circleId = circleObj.circleId
      console.log(this.circleId)
      this.showPicker = false
    },
    onSubmit (values) {
      console.log('submit', values)
    },
    async afterUpload (file) {
      file.status = 'uploading'
      file.message = '上传中...'
      let uploadImg = await upLoaderImg(file.file, 1)
      if (uploadImg.code === 0) {
        file.url = uploadImg.data.resourceUrl
        file.status = 'done'
        this.fileItemIds.push(uploadImg.data.blogItemId)
        console.log(this.fileItemIds)
      } else {
        file.status = 'failed'
        file.message = '上传失败'
      }
      // 使用上传的方法。file.file
    },
    onClickRight () {
      this.$http
        .post(`blog/insertBlog`, {
          'blog': {
            'content': this.blogContent,
            'circleId': this.circleId
          },
          'itemIds': this.fileItemIds
        })
        .then(res => {
          if (res.data.code === 0) {
            // 成功通知
            this.Notify({type: 'success', message: '发表成功'})
            setTimeout(() => {
              this.$router.push({path: '/MainIndex'})
            }, 1000)
          } else {
            this.Notify({type: 'danger', message: res.data.msg})
          }
        })
    },
    createCirclePopupShow () {
      this.createCircleShow = true
    },
    async afterReadCircleImg (file) {
      file.status = 'uploading'
      file.message = '上传中...'
      let uploadImg = await upLoaderImg(file.file, 5)
      if (uploadImg.code === 0) {
        console.log(uploadImg)

        file.url = uploadImg.data.url
        file.status = 'done'
        this.circleImgUrl = 'http://' + uploadImg.data.url
      } else {
        file.status = 'failed'
        file.message = '上传失败'
      }
      // 使用上传的方法。file.file
    },
    toCreateCircle () {
      this.$http
        .post(`circle/mobelCreateCircle`, this.$qs.stringify({
          circleImgUrl: this.circleImgUrl,
          circleName: this.circleName,
          circleTitle: this.circleTitle
        }))
        .then(res => {
          if (res.data.code === 0) {
            // 成功通知
            this.Notify({type: 'success', message: '圈子创建成功'})
            setTimeout(() => {
              this.circlePlaceholer = this.circleName
              this.circleId = res.data.data.circleId
              this.createCircleShow = false
            }, 1000)
          } else {
            this.Notify({type: 'danger', message: res.data.msg})
          }
        })
    },
    async uploadVideo (file) {
      file.status = 'uploading'
      file.message = '上传中...'
      this.videoLoding = true
      let uploadImg = await upLoaderImg(file.file, 4)
      if (uploadImg.code === 0) {
        file.url = uploadImg.data.resourceUrl
        file.status = 'done'
        this.videoLoding = false
        this.imgListShow = false
        this.videoUploadDisable = true
        this.videoUrl = '//' + uploadImg.data.resourceUrl
        this.fileItemIds.push(uploadImg.data.blogItemId)
        console.log(this.fileItemIds)
      } else {
        file.status = 'failed'
        this.videoLoding = false
        this.Notify({type: 'danger', message: '上传失败...'})
        file.message = '上传失败'
      }
      // 使用上传的方法。file.file
    }
  },
  created () {
    this.$http
      .post(`circle/getAllCircle`, this.$qs.stringify({}))
      .then(res => {
        if (res.data.code === 0) {
          this.circleColume = res.data.data
        } else {
          this.Notify({type: 'danger', message: res.data.msg})
        }
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

  /deep/ .van-picker__cancel{
    color: #3C827E;
  }

  /deep/ .van-picker__confirm {
    color: #3C827E;

  }
</style>
