<template>
  <el-container>
  <el-aside width="200px">
    <!-- 侧边栏 -->
    <AppAside/>
  </el-aside>
  <el-container>
    <el-header>
       <!-- 头部 -->
      <AppHeader/>
    </el-header>
    <el-main>
      <!-- home 发布文章、文章列表，评论，，，，等等，都显示都这里 -->
      <router-view/>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeader'
export default {
  name: 'AppLayout',
  components: {
    AppAside,
    AppHeader
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 100px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;

  }
</style>
