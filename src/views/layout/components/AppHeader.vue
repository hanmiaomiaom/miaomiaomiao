<template>
  <el-row class="app-header" :gutter="20">
  <el-col :span="5">江苏传智播客教育科技股份有限公司<div class="grid-content bg-purple"></div></el-col>
  <el-col :span="5" :offset="14">
    <el-dropdown trigger="click">
      <span>消息</span>
      <span class="el-dropdown-link">
        <img :src="userInfo.photo" width="30px">
       {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item >个人地址</el-dropdown-item>
        <el-dropdown-item >git地址</el-dropdown-item>
        <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </el-col>
</el-row>
</template>

<script>
import { getUser,removeUser } from '@/utils/auth'
export default {
  name: 'AppHeader',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    // 读取数据
    // this.userInfo = JSON.parse(window.localStorage.getItem('user_info')) || {
    //   name: '18531151201',
    //   photo: 'http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi'
    // }
    this.userInfo = getUser()
  },
  methods: {
    handleLogout() {
      this.$confirm('确定退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清空本地存储中的user_info
        removeUser()
        // window.localStorage.removeItem('user_info')
        // 跳转到登录页面
        this.$router.push({ name: 'login' })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  img {
    border-radius: 50%;
  }

</style>
