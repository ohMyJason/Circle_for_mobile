<template>
  <div style="">
    <van-nav-bar
      title="发布新动态"
      left-text="返回"
      right-text="发表"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <div style="margin: 0.44rem 0 0 0;background-color: #f2f2f2;">
      <van-form @submit="onSubmit">

      <van-row>
        <div class="cell-interval"><span></span></div>
      </van-row>
      <van-row>
        <van-field
          v-model="message"
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
        <div>
          <van-field
            readonly
            clickable
            name="picker"
            :value="value"
            label="选择圈子"
            placeholder="点击选择圈子"
            @click="showPicker = true"
          />
        </div>
      </van-row>
      <van-row>
        <div class="cell-interval"><span></span></div>
      </van-row>

      <van-row>
        <van-col span="4"></van-col>
        <van-col span="16">
          <div style="width: 264px">
            <van-uploader v-model="fileList" multiple/>
          </div>
        </van-col>
        <van-col span="4"></van-col>
      </van-row>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      </van-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PublishNews',
  data () {
    return {
      message: '',
      fileList: [
        {url: 'https://img.yzcdn.cn/vant/leaf.jpg'},
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        {url: 'https://cloud-image', isImage: true}
      ],
      value: '',
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({path: '/MainIndex'})
    },
    onConfirm (value) {
      this.value = value
      this.showPicker = false
    },
    onSubmit (values) {
      console.log('submit', values)
    }
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
