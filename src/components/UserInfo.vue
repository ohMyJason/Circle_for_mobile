<template>
  <div style="background-color: #f2f2f2;">
    <van-nav-bar
      title="编辑个人信息"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <div style="margin: 0.42rem 0 0 0">
      <div style="text-align: center;padding: 0.2rem 0 0.2rem 0">
        <van-row>
          <van-image
            round
            width="0.7rem"
            height="0.7rem"
            :src='userInfo.avatarUrl'
          />
        </van-row>
        <van-row>
          <van-uploader accept="image/*" :after-read="afterReadAvaImg">
            <van-button color="#3C827E" round type="info"  size="mini">更换</van-button>
          </van-uploader>
        </van-row>
      </div>
      <van-row class="setting-cell">
        <van-field  label="用户名" v-model="userInfo.userName" :value="this.userInfo.userName" input-align="right"  clearable/>
        <van-field
          readonly
          name="picker"
          :value="userInfo.sex"
          label="性别"
          :placeholder="userInfo.sex"
          @click="sexPicker = true"
          input-align="right"
        />
        <van-popup v-model="sexPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="sexColumns"
            @confirm="onSexConfirm"
            @cancel="sexPicker = false"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="picker"
          :value="userInfo.isSingle"
          label="感情状况"
          :placeholder="userInfo.isSingle"
          @click="isSinglePicker = true"
          input-align="right"
        />
        <van-popup v-model="isSinglePicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="isSingleColumns"
            @confirm="onIsSingleConfirm"
            @cancel="isSinglePicker = false"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="calendar"
          :value="userInfo.birthday"
          label="生日"
          :placeholder="userInfo.birthday"
          input-align="right"
          @click="showBirthdayCalendar = true"
        />
        <van-calendar v-model="showBirthdayCalendar" @confirm="onBirthdayConfirm" :min-date="minDate" :max-date="maxDate"  :default-date="defaultBirthday"/>
        <van-field label="个性签名" v-model="userInfo.address" :value="this.userInfo.address" input-align="right"/>

      </van-row>
      <van-row>
        <div class="cell-interval"></div>
      </van-row>
      <van-row>
        <van-field label="手机号" :value="this.userInfo.phone"  input-align="right" readonly/>
        <van-field label="邮箱" :value="this.userInfo.email" input-align="right" readonly/>
        <van-field label="注册时间" :value="this.userInfo.createTime" input-align="right" readonly />
      </van-row>
      <van-row>
        <div class="cell-interval" style="height: 0.3rem"></div>
      </van-row>
      <van-row>
        <div style="margin: 0 16px 16px 16px;">
          <van-button @click="onSubmit" round block type="info" native-type="submit" color="#3C827E">
            提交
          </van-button>
        </div>
      </van-row>
    </div>

  </div>
</template>

<script>
import upLoaderImg from '../upLoaderImg'

export default {
  name: 'UserInfo',
  data () {
    return {
      userInfo: '',
      sexPicker: false,
      isSinglePicker: false,
      showBirthdayCalendar: false,
      sexColumns: ['保密', '男', '女'],
      isSingleColumns: ['保密', '单身', '恋爱', '一言难尽'],
      sexIndex: '',
      isSingleIndex: '',
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(2020, 4, 31),
      defaultBirthday: null,
      avaChangeFlag: false,
      userNameChangeFlag: false,
      sexChangeFlag: false,
      isSingleChangeFlag: false,
      firstFlag: 0

    }
  },
  methods: {
    onClickLeft () {
      if (this.firstFlag === 0 || this.firstFlag === 0 + '') {
        this.$router.go(-1)
      } else if (this.avaChangeFlag === false) {
        this.Notify({type: 'danger', message: '请上传头像并完善个人信息~'})
        console.log(this.firstFlag)
      } else if (this.userNameChangeFlag === false) {
        this.Notify({type: 'danger', message: '请先完善个人信息再交朋友吧'})
      } else if (this.sexChangeFlag === false) {
        this.Notify({type: 'danger', message: '性别没改'})
      } else if (this.isSingleChangeFlag === false) {
        this.Notify({type: 'danger', message: '感情状况没改'})
      } else {
        this.Notify({type: 'success', message: '幸苦了.快去交朋友吧'})
        setTimeout(() => {
          this.$router.push({ path: '/MainIndex' }) // post成功后跳到用户信息页面
        }, 1000)
      }
    },
    onSexConfirm (sex, index) {
      this.userInfo.sex = sex
      this.sexIndex = index
      this.sexPicker = false
    },
    onIsSingleConfirm (isSingle, index) {
      this.userInfo.isSingle = isSingle
      this.isSingleIndex = index
      this.isSinglePicker = false
    },
    onBirthdayConfirm (date) {
      this.userInfo.birthday = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      this.showBirthdayCalendar = false
    },
    async afterReadAvaImg (file) {
      file.status = 'uploading'
      file.message = '上传中...'
      let uploadImg = await upLoaderImg(file.file, 3)
      if (uploadImg.code === 0) {
        console.log(uploadImg)

        file.url = uploadImg.data.url
        file.status = 'done'
        this.userInfo.avatarUrl = '//' + uploadImg.data.url
        this.avaChangeFlag = true
      } else {
        file.status = 'failed'
        file.message = '上传失败'
      }
      // 使用上传的方法。file.file
    },
    onSubmit () {
      this.$http
        .post(`userInfo/updateUserInfo`, this.$qs.stringify({
          userId: this.userInfo.userId,
          userName: this.userInfo.userName,
          sex: this.sexIndex,
          isSingle: this.isSingleIndex,
          birthday: this.userInfo.birthday,
          address: this.userInfo.address

        }))
        .then(res => {
          if (res.data.code === 0) {
            this.Notify({type: 'success', message: '修改成功'})
            this.userNameChangeFlag = true
            this.sexChangeFlag = true
            this.isSingleChangeFlag = true
          } else {
            this.Notify({type: 'danger', message: res.data.msg})
          }
          console.log(res)
        })
    }
  },
  created () {
    this.firstFlag = this.$route.query.firstFlag
    this.$http
      .post(`userInfo/getUserInfo`, this.$qs.stringify())
      .then(res => {
        if (res.data.code === 0) {
          this.userInfo = res.data.data
          if (this.userInfo.birthday != null) {
            this.defaultBirthday = new Date(this.userInfo.birthday.split('-')[0], this.userInfo.birthday.split('-')[1], this.userInfo.birthday.split('-')[2])
          } else {
            this.defaultBirthday = new Date(2000, 1, 1)
          }
          switch (this.userInfo.sex) {
            case 0:
              this.userInfo.sex = '保密'
              break
            case 1:
              this.userInfo.sex = '男'
              break
            case 2:
              this.userInfo.sex = '女'
              break
          }
          switch (this.userInfo.isSingle) {
            case 0:
              this.userInfo.isSingle = '保密'
              break
            case 1:
              this.userInfo.isSingle = '单身'
              break
            case 2:
              this.userInfo.isSingle = '恋爱'
              break
            case 3:
              this.userInfo.isSingle = '一言难尽'
              break
          }
        } else {
          this.Notify({type: 'danger', message: res.data.msg})
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
  /deep/ .van-picker__cancel{
    color: #3C827E;
  }

  /deep/ .van-picker__confirm {
    color: #3C827E;

  }

</style>
