<!--  -->
<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">粉丝管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="粉丝列表" name="first">
          <h2>粉丝列表</h2>
          <el-row :gutter="20">
            <el-col :span="6">
              <div>
                <el-card
                  class="box-card"
                  shadow="never"
                  v-for="item in fans"
                  :key="item.id"
                >
                  <div class="user-item">
                    <a
                      class="user-img"
                      target="_blank"
                      rel="noopener noreferrer"
                      ><img :src="item.photo" role="presentation"
                    /></a>
                    <div class="user-name">{{ item.name }}</div>
                    <div class="button-group">
                      <el-button type="success" size="medium">关注</el-button>
                      <el-button
                        type="primary"
                        size="medium"
                        @click="onHandleMsg(item.name)"
                        >私信</el-button
                      >
                    </div>
                  </div>
                </el-card>
              </div></el-col
            >
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="second">
          <!-- 1.准备echarts容器 -->
          <div ref="main" id="main" style="width: 600px; height: 400px"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 私信对话框 -->
    <el-dialog
      :title="this.fans_name"
      :visible.sync="messageDialogVisible"
      width="40%"
      center
      modal
    >
      <div class="modal-wrapper">
        <div class="modal-content">
          <div id="im-talkbox-body">
            <el-form ref="publish-form" :model="message">
              <el-form-item prop="content">
                <el-form-item type="textarea" prop=""> </el-form-item>
              </el-form-item>
            </el-form>
          </div>
          <div class="message-box">
            <el-form ref="publish-form" :model="message">
              <el-form-item prop="content">
                <!-- 使用富文本编辑器 -->
                <el-tiptap
                  v-model="message.content"
                  :extensions="extensions"
                  lang="zh"
                  height="200"
                  placeholder="请输入"
                  :charCounterCount="false"
                ></el-tiptap>
              </el-form-item>
            </el-form>
            <el-row :gutter="20">
              <el-col :span="12" :offset="6"
                ><div class="message-box-footer">
                  <el-button
                    type="danger"
                    size="mini"
                    @click="messageDialogVisible = false"
                    >取消</el-button
                  >
                  <el-button type="primary" size="mini">发送</el-button>
                </div></el-col
              >
            </el-row>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入富文本编辑器
import {
  ElementTiptap,
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Fullscreen,
  Image,
  Link
} from 'element-tiptap'
// 引入样式文件
import 'element-tiptap/lib/index.css'

// 2.加载echarts
import * as echarts from 'echarts'
import { getFans } from '@/api/statistics'

import { uploadImage } from '@/api/image'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'FansIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
  data() {
    // 这里存放数据
    return {
      activeName: 'first',
      messageDialogVisible: false,
      // 富文本编辑器所需要的插件
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Fullscreen(),
        new Image({
          // 默认会把图片生成base64字符串和内容存储在一起，如果需要自定义图片上传
          uploadRequest(file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then((res) => {
              // 返回图片链接
              return res.data.data.url
            })
          }
        }),
        new Link()
      ],
      // 私信内容
      message: {},
      // 粉丝数据
      fans: [],
      fans_name: ''
    }
  },
  // 方法集合
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    onHandleMsg(name) {
      this.messageDialogVisible = true
      this.fans_name = name
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    getFans({
      page: 1,
      per_page: 20
    }).then((res) => {
      const { results } = res.data.data
      this.fans = results
    })
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 3.基于DOM，初始化实例
    var myChart = echarts.init(this.$refs.main)
    window.onresize = function () {
      myChart.resize()
    }
    const option = {
      legend: {
        // Try 'horizontal'
        orient: 'vertical',
        right: 10,
        top: 'center'
      },
      dataset: {
        source: [
          ['product', '2015', '2016', '2017'],
          ['Matcha Latte', 43.3, 85.8, 93.7],
          ['Milk Tea', 83.1, 73.4, 55.1],
          ['Cheese Cocoa', 86.4, 65.2, 82.5],
          ['Walnut Brownie', 72.4, 53.9, 39.1]
        ]
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
    }
    myChart.setOption(option)
  }
}
</script>
<style lang="less" scoped>
.box-card {
  margin-left: 10px;
  margin-bottom: 10px;
  border: 1 px solid #e8e8e8;
}
.user-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1 px solid #e8e8e8;
  cursor: pointer;
  transition: all 0.3s;
  .user-img {
    width: 80px;
    height: 80px;
    display: block;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1 px solid #e8e8e8;
    }
  }
  .user-name {
    margin-top: 16px;
    font-size: 16px;
    color: #505050;
    text-align: center;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .button-group {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    button:not(:last-child) {
      margin-right: 20px;
    }
  }
}
.modal-wrapper {
  .modal-title {
    line-height: 24px;
    padding: 16px 28px;
  }
  #im-talkbox-body {
    overflow: auto;
    height: 200px;
    position: relative;
    width: calc(100% + 15px);
    flex: 1;
    overflow-anchor: auto;
  }
}
.el-card:hover {
  box-shadow: 0 2px 25px #d9d9d9;
}
.el-tiptap-editor__content {
  padding: 10px;
}
.el-form-item {
  margin: 0 !important;
}

.message-box-footer {
  margin-top: 10px;
  display: flex;
  justify-items: center;
  flex-direction: row;
  justify-content: space-around;
}
</style>
