<template>
  <div>
    <div class="logo" style="text-align: center;margin: 0.7rem 0 0 0">
      <img src="../assets/logo.png" alt="" style="width: 3rem;">
    </div>
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="email"
          name="email"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱号' }]"
        />

        <van-row>
          <van-col span="20">
            <van-field
              v-model="code"
              name="code"
              label="验证码"
              placeholder="验证码"
              :rules="[{ required: true, message: '请填写验证码' }]"
            />
          </van-col>
          <van-col span="4"><van-button color="#3C827E" type="primary" size="small" @click="sendCode()">验证码</van-button></van-col>
        </van-row>
        <van-field
          v-model="password"
          name="password"
          label="初始密码"
          placeholder="请输入6位及以上密码"
          :rules="[{ required: true, message: '请填写初始密码' }]"
          type="password"
        />
        <van-field
          v-model="checkPassword"
          name="checkPassword"
          label="校验密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请再填写一遍密码' }]"
          type="password"
        />
        <div style="margin: 16px;">
          <van-button round block color="#3C827E" type="info" native-type="submit">
            注册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Registered',
  data () {
    return {
      email: '',
      code: '',
      checkCode: '',
      password: '',
      checkPassword: '000000'
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
      if (this.checkCode !== this.code) {
        this.Notify({ type: 'danger', message: '验证码有误' })
      } else if (this.password !== this.checkPassword) {
        this.Notify({ type: 'danger', message: '请确认密码收入是否一致' })
      } else {
        this.$http
          .post(`userLogin/registeredByEmail`, this.$qs.stringify({
            email: this.email,
            password: this.password
          }))
          .then(res => {
            if (res.data.code === 0) {
              this.Notify({ type: 'success', message: '注册成功，请完善个人资料' })
              setTimeout(() => {
                this.$cookies.set('token', res.data.data, -1)
                this.$router.push({ path: '/UserInfo', query: {firstFlag: 1} }) // post成功后跳到用户信息页面
              }, 1000)
            } else {
              this.Notify({ type: 'danger', message: res.data.msg })
            }
            console.log(res)
          })
      }
    },
    sendCode () {
      this.$http
        .post(`userLogin/sendEmailCode`, this.$qs.stringify({
          email: this.email
        }))
        .then(res => {
          if (res.data.code === 0) {
            this.checkCode = res.data.data
          } else {
            this.Notify({ type: 'danger', message: res.data.msg })
          }
          console.log(res)
        })
    }
  }
}
</script>

<style scoped>

</style>
