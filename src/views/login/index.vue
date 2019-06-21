<template>
  <div class="login-wrap">
    <!-- 给组件加class，会把这个class作用到组件的根元素上 -->
    <el-form class="icon-form" ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-liji" type="primary" @click="onSubmit">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
      console.log('submit!')
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
  .icon-form {
    background-color: pink;
    width: 400px;
    height: 300px;
    padding: 50px;
    box-sizing: border-box;
  }
}
</style>
