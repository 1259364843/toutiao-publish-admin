<!--  -->
<template>
    <el-menu
      :default-active="$route.path"
      @open="handleOpen"
      @close="handleClose"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse = "isCollapse"
      >
      <!-- 循环遍历取出菜单数据 -->
        <el-menu-item v-for="item in aside" :key="item.id" :index="item.path">
          <i class="el-icon-s-home"></i>
          <span slot="title">{{item.text}}</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'AppAside',
  components: {},
  data () {
    // 这里存放数据
    return {
      aside: [
        { index: 1, text: '首页', path: '/' },
        { index: 2, text: '内容管理', path: '/article' },
        { index: 3, text: '素材管理', path: '/image' },
        { index: 4, text: '发布文章', path: '/publish' },
        { index: 5, text: '评论管理', path: '/comment' },
        { index: 6, text: '粉丝管理', path: '/fans' },
        { index: 7, text: '个人设置', path: '/settings' }
      ],
      isCollapse: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    handleOpen (key, keyPath) {
    console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
    console.log(key, keyPath)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  }
  }
</script>
<style lang='less' scoped>

</style>
