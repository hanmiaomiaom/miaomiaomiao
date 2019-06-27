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
            <el-button
            @click="handleSendCode"
            :disabled="!!codeTimer">{{codeTimer ? `剩余${codeTimeSeconds}秒`: `获取验证码`}}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox class="checkbox"  checked="checked" v-model="form.agree"></el-checkbox>
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
import { saveUser } from '@/utils/auth'// 按需加载，加载模块中非 export default成员
const initCodeTimeSeconds = 60 // 初始化定时器的
export default {
  name: 'AppLogin',
  data() {
    return {
      form: {// 表单数据对象
        mobile: '',
        code: '',
        agree: ''
      },
      rules: {// 验证规则对象
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/, message: '请输入有效的手机号码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入有效验证码', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请同意用户协议' },
          { pattern: /true/, message: '请同意用户协议' }
        ]
      },
      codeTimer: null, // 倒计时定时器
      codeTimeSeconds: initCodeTimeSeconds // 倒计时事件
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
        // url: 'http://toutiao.course.itcast.cn/app/v1_0/authorizations',//内网接口
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations', // 外网接口  统一密码：246810
        data: this.form
      }).then(res => {
        console.log(res.data)
        const userInfo = res.data.data
        // 存储到本地
        saveUser(userInfo)
        // window.localStorage.setItem('user_info', JSON.stringify(userInfo))
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push({
          name: 'layout'
        })
      }).catch((e) => {
        this.$message.error('登录失败，手机号或验证码错误')
      })
    },
    handleSendCode() {
      // 验证手机号是否有效
      this.$refs['form'].validateField('mobile', errorMessage => {
        if (errorMessage.trim().length > 0) { // validateField()方法返回一个字符串，若字符串长度为0，则证明输入手机号正确，往下执行，若字符串长度大于0，则证明手机号不对，返回，不再往下执行
          return
        }
        // 验证通过，初始化显示验证码
        this.showGeetest()
      })
    },
    // 验证通过，初始化显示人机交互验证码
    showGeetest() {
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
          captchaObj.onReady(() => {
            // 验证码ready之后才能调用verify方法显示验证码
            captchaObj.verify()
          }).onSuccess(() => {
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
              // 发送短信成功，开启倒计时效果
              this.codeCountDown()
            })
          }).onError(function() {
            // your code
          })
        })
      })
    },
    // 验证码倒计时
    codeCountDown() {
      this.codeTimer = window.setInterval(() => {
        this.codeTimeSeconds--
        if (this.codeTimeSeconds <= 0) {
          // 清除定时器
          window.clearInterval(this.codeTimer)
          // 让倒计时的时间回归初始状态
          this.codeTimeSeconds = initCodeTimeSeconds
          // 将存储定时器引用的变量重新赋值为null
          this.codeTimer = null
        }
      }, 1000)
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
