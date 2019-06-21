<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <!-- 给组件加class，会把这个class作用到组件的根元素上 -->
      <div class="form-head">
        <img src="./logo_index.png" alt="黑马头条号">
      </div>
      <el-form class="form-content" ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- el-col 栅格布局，一共24列，:span用来指定占用的大小，:offset 用来指定便宜量 -->
          <el-col :span="14">
            <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :offset="1" :span="9">
            <!-- <el-button>获取验证码</el-button> -->
            <el-button @click="handleSendCode">获取验证码</el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="onSubmit">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '@/vendor/gt' // 引入极验JavaScript SDK文件，通过window.initGeetest 使用
export default {
  name: 'AppLogin',
  data() {
    return {
      form: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    onSubmit() {
      constants.log('submit!')
    },
    handleSendCode() {
      const { mobile } = this.form
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        const { data } = res.data
        window.initGeetest({
          // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind' // 隐藏，直接弹出式
        }),
        function(captchaObj) {
          captchaObj
            .onReady(function() {
              // 验证码ready之后才能调用verify方法显示验证码
            })
            .onSuccess(function() {
              // your code
              console.log(captchaObj.getValidate)
            })
            .onError(function() {
              // your code
            })
            // 在这里注册‘发送验证码’按钮的点击事件，然后验证用户是否输入手机号以及手机号格式是否正确，没有问题：
            // button.click = function() {
            //   // some code
            //   // 检测验证码是否ready, 验证码的onReady是否执行
            //   captchaObj.verify(); //显示验证码
            //   // some code
            // }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-wrap {
  height: 100%;
  background-color: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-head {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    img {
      width: 200px;
    }
  }
  .form-wrap {
    width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    .btn-login {
      width: 100%;
    }
  }
}
</style>
