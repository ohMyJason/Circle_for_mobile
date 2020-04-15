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
          <van-col span="4"><van-button color="#3C827E" type="primary" size="small">验证码</van-button></van-col>
        </van-row>
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
      code: ''
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    }
  }
}
</script>

<style scoped>

</style>
