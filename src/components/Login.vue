<template>
  <!-- Field 是基于 Cell 实现的，可以使用 CellGroup 作为容器来提供外边框。 -->
  <div>
    <div class="logo" style="text-align: center;margin: 0.7rem 0 0 0">
      <img src="../assets/logo.png" alt="" style="width: 3rem;">
    </div>
    <div style="margin: 0.5rem 0.1rem 0 0.1rem ">

      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名/手机号/邮箱号"
          :rules="[{ required: true, message: '请填写用户名/手机号/邮箱号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />

        <div style="margin: 16px;height: 0.3rem;border-radius: 0.2rem;line-height: 0.27rem;text-align: center">
          <van-button round block color="#387d7b"  native-type="submit">
            登录
          </van-button>

        </div><div style="margin: 16px;height: 0.3rem;border-radius: 0.2rem;line-height: 0.27rem;text-align: center">
          <van-button round block color="#387d7b"  @click="toRegistered"> 注册
          </van-button>

        </div>

      </van-form>
    </div>

    <div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Form, Field} from 'vant'

Vue.use(Field)
Vue.use(Form)
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
      this.$http
        .post(`userLogin/login`, this.$qs.stringify({
          loginName: this.username,
          password: this.password
        }))
        .then(res => {
          if (res.data.code === 0) {
            this.$cookies.set('token', res.data.data.token, -1)
            this.$cookies.set('userId', res.data.data.user.userId, -1)
            this.$router.push({ path: '/MainIndex' }) // post成功后跳到登录界面
          } else {
            this.Notify({ type: 'danger', message: res.data.msg })
          }
          console.log(res)
        })
    },
    toRegistered () {
      this.$router.push({path: '/Registered'})
    }
  }

}
</script>

<style scoped>
  .logo {
    margin: 0.1rem 0 0 0;
  }
</style>
