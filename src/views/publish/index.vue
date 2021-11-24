<!--  -->
<template>
  <div class='publish-container'>
  <!-- 卡片 -->
	<el-card class="filter-card">
	<div slot="header" class="clearfix">
		<!-- 面包屑 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
	</div>
    <!-- 表单 -->
    <el-form
    ref="publish-form"
    :model="article"
    label-width="80px"
    :rules="formRules"
    >
        <el-form-item label="标题" prop="title">
            <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <!-- 使用富文本编辑器 -->
            <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            lang="zh"
            height="400"
            placeholder="请输入文章内容"
            ></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
            <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
            v-for="(item, index) in channels"
            :key="index"
            :value="item.id"
            :label="item.name"
            ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onPublish(false)">立即发布</el-button>
            <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
    </el-form>
	</el-card>
   </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 导入网络请求方法
import { getArticlechannels, addArticle, getArticle, updateArticle } from '@/api/article'

// 引入富文本编辑器
import {
  ElementTiptap,
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Fullscreen,
  Image,
  TextColor,
  Link
} from 'element-tiptap'
// 引入样式文件
import 'element-tiptap/lib/index.css'

import { uploadImage } from '@/api/image'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'PublishIndex',
  components: {
      'el-tiptap': ElementTiptap
  },
  data () {
    // 这里存放数据
    return {
        // 文章频道列表
        channels: [],
        article: {
            title: '',
            content: '',
            cover: {
                // 封面图类型，无图，三图
                type: 0,
                // 封面图地址
                images: []
            },
            // 频道
            channel_id: null
        },
        // 富文本编辑器所需要的插件
        extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Fullscreen(),
        new Image({
          // 默认会把图片生成base64字符串和内容存储在一起，如果需要自定义图片上传
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              // 返回图片链接
              return res.data.data.url
            })
          }
        }),
        // 文本颜色
        new TextColor(),
        new Link()
      ],
      // 发布文章表单验证规则
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          {
            validator (rule, value, callback) {
              console.log('content validator')
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
    }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    //   发布文章,默认为false，发布文章，为true则为草稿
      onPublish (draft = false) {
        this.$refs['publish-form'].validate(valid => {
          // 验证失败，停止提交表单
          if (!valid) {
            return
          }
          // 验证通过，提交表单
        const articleId = this.$route.query.id
          if (articleId) {
            // 执行修改操作
            updateArticle(articleId, this.article, draft).then(res => {
                this.$message({
                  type: 'success',
                  message: `${draft ? '存入草稿' : '发布'}成功！`,
                  center: true,
                  showClose: true
                })
                // 页面跳转
                this.$router.push('/article')
            })
          } else {
            // 执行发布操作
            addArticle(this.article, draft).then(res => {
            // 处理响应结果
            this.$message({
              type: 'success',
              essage: `${draft ? '存入草稿' : '发布'}成功！`,
              center: true,
              showClose: true
            })
            // 页面跳转
            this.$router.push('/article')
        })
        }
        })
        // 找到数据接口
        // 封装请求方法
        // 提交请求表单
      },
    //   获取频道列表
      loadChannels () {
          getArticlechannels().then(({ data }) => {
              this.channels = data.data.channels
          })
      },
    //   修改文章：加载文章内容
      loadArticle () {
        getArticle(this.$route.query.id).then(res => {
            // 把返回的数据绑定
            this.article = res.data.data
        })
      }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
      this.loadChannels()
      if (this.$route.query.id) {
        this.loadArticle()
      }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='css' scoped>

</style>
