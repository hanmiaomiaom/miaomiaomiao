<template>
    <div>
        <!-- 数据筛选 -->
        <el-card class="filter-card">
            <div slot="header" class="clearFix">
                <span>数据筛选</span>
                <el-button style="float:right; padding:3px 0" type="text">按钮操作</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                 {{'列表内容 ' + o }}
            </div>
</el-card>
<!-- 数据筛选 -->

<!-- 文章列表 -->
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>一共有xxx条数据</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
 <el-table
    class="article-list"
    :data="tableData"
    style="width:100%"
    >
    <el-table-column
      label="日期"
      prop="date"
      width="180">
    </el-table-column>
    <el-table-column
      label="名字"
      prop="name"
      width="180">
    </el-table-column>
    <el-table-column
      label="地址"
      prop="address">
    </el-table-column>
      </el-table>
      <!-- 数据分页 -->
  <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</el-card>
<!-- 文章列表 -->

    </div>
</template>

<script>
export default {
    name:'ArticleList',
    data () {
        return {
            tableData:[{
                date:'2016-01-04',
                name:'程小二',
                address:'上海市普陀区金沙江路1518栋'
         },
         {
             date: '2016-05-04',
             name: '王小虎',
             address: '上海市普陀区金沙江路 1517 栋' 
         },
         {
              date: '2016-05-06',
             name: '王小哇',
             address: '上海市普陀区金沙江路 1516 栋' 
         }]
        }
    }
}
</script>

<style lang="less" scoped>
.fliter-card {
    margin-bottom: 15px;
}
.el-card {
    text-align: left;
}
.article-list {
    margin-bottom: 30px;
}
</style>

