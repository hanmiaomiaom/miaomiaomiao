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
        <el-dropdown-item >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </el-col>
</el-row>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    // 读取数据
    this.userInfo = JSON.parse(window.localStorage.getItem('user_info')) || {
      name: '18531151201',
      photo: 'http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi'
    }
  }
}
</script>

<style lang="less" scoped>
  img {
    border-radius: 50%;
  }

</style>
