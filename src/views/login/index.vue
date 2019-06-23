<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <!-- 给组件加class，会把这个class作用到组件的根元素上 -->
      <div class="form-head">
        <img src="./logo_index.png" alt="黑马头条号">
      </div>
      <!-- 配置校验规则
          rules  规则对象配置到el-form 上
          prop 校验字段配置到 el-form-item 上,rules 中配置的校验字段必须和表单数据对象保持一致
      JavaScript  触发验证
          给el-form 添加ref
          调用this.$refs['ref名字'].validate(valid=>{})触发验证
       -->
      <el-form
      class="form-content"
      ref="form"
      :model="form"
      :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- el-col 栅格布局，一共24列，:span用来指定占用的大小，:offset 用来指定便宜量 -->
          <el-col :span="14">
            <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :offset="1" :span="9">
            <!-- <el-button>获取验证码</el-button> -->
            <el-button @click="handleSendCode">获取验证码</el-button>
          </el-col>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox class="checkbox" v-model="form.agree"></el-checkbox>
          <span class="agree-text">我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a></span>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="handleLogin">立即登录</el-button>
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
        code: '',
        // code:'',
        agree: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^\d{11}$/, message: '请输入有效的手机号码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{4,6}$/, message: '请输入有效验证码', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请同意用户协议' },
          { pattern: /true/, message: '请同意用户协议' }
        ]
      }
    }
  },
  methods: {
    handleLogin() {
      // 使用 form 组件的 validate 方法触发校验，获取校验的结果状态
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        // 表单验证通过，提交登录请求
        this.submitLogin()
      })
    },
    submitLogin() {
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.form
      }).then(res => {
        console.log(res.data)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        })
      }).catch((e) => {
        this.$message.error('登录失败，手机号或验证码错误')
      })
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
        }, (captchaObj) => {
          captchaObj.onReady(function() {
            // 验证码ready之后才能调用verify方法显示验证码
            captchaObj.verify()
          }).onSuccess(function() {
            // 人机交互验证通过
            const {
              geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate } =
              captchaObj.getValidate()

            axios({
              method: 'GET',
              url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
              params: {
                challenge,
                validate,
                seccode
              }
            }).then(res => {
              console.log(res.data)
              // 开启倒计时效果
            })
          }).onError(function() {
            // your code
          })
        })
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
  .agree-checkbox {
      margin-right: 10px;
    }
  .agree-text {
      font-size: 16px;
      color: #999;
}
  .btn-login {
      width: 100%
    }
  }
}
</style>
