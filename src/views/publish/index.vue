<template>
  <el-card class="publish-card">
  <div slot="header" class="header">
    <span>发表文章</span>
    <div>
      <el-button type="success" @click="handlePublish(false)">发表</el-button>
      <el-button type="primary" @click="handlePublish(true)">存入草稿</el-button>
    </div>
  </div>
  <!-- 栅格布局 -->
  <el-row >
    <el-col :span="10">
          <el-form ref="form" :model="articleForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <!-- <el-input type="textarea" v-model="articleForm.content"></el-input> -->
           <!-- bidirectional data binding（双向数据绑定） -->
            <quill-editor v-model="articleForm.content"
                          ref="myQuillEditor"
                          :options="editorOption">
            </quill-editor>

        </el-form-item>
        <el-form-item label="封面">

        </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="articleForm.channel_id" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      </el-form>
    </el-col>
  </el-row>
    <!-- 表单 -->

  <!-- 表单 -->
</el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './quill.user.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'AppPublish',
   components: {
    quillEditor
  },
  data() {
    return {
      articleForm: {
        title: '', // 标题
        content: '', // 内容
        channel_id: '3', // 频道
        cover: {// 封面
          type: 0, // 封面类型  -1：自动，0- 无图 1-1张 3-3张
          images: []
        }
      },
      editorOption: {}//富文本编辑器配置项
    } 
  },
  methods: {
    async handlePublish(draft) {
      try {
        await this.$http({
          method: 'POST',
          url: '/articles',
          params: {
            draft
          },
          data: this.articleForm
        })
        this.$message({
          type: 'success',
          message: '发布成功'
        })
      } catch (err) {
        this.$message.error('发布失败', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.publish-card {
  min-height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

}
</style>
