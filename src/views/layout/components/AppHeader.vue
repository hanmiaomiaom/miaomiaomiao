<template>
  <el-row :gutter="20">
  <el-col :span="5">江苏传智播客教育科技股份有限公司<div class="grid-content bg-purple"></div></el-col>
  <el-col :span="5" :offset="14">
    <el-dropdown trigger="click">
   <span>消息</span>
   <img  class="img" width="30px" src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi" alt="">
      <span class="el-dropdown-link">
        18531151201<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item >用户设置</el-dropdown-item>
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

    }
  }
}
</script>

<style lang="less" scoped>
.img {
  border-radius: 50%;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
