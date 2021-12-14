<!--  -->
<template>
<el-container
class="layout-container"
>
  <el-aside
    class="aside"
    width="auto"
    >
    <!-- 侧边栏 -->
    <app-aside class="aside-menu" ref="aside" />
    </el-aside>
  <el-container>
    <el-header
    class="header"
    >
    <!-- 使用子组件 -->
    <app-header :user="user" @isCollapse="changeCollapse" ref="header"/>
    </el-header>
    <el-main class="main">
      <!-- 子路由出口 -->
        <router-view />
    </el-main>
  </el-container>
</el-container>

</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

// 导入子组件
import AppAside from './components/aside.vue'
import AppHeader from './components/header.vue'

// 导入封装的请求方法
import { getUserProfile } from '@/api/user.js'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  },
  data () {
    // 这里存放数据
    return {
      // 当前登录用户信息
      user: undefined,
      // 控制侧边菜单折叠
      isCollapse: true
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
  },
  // 方法集合
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        // 把返回的数据赋值给user对象
        this.user = res.data.data
      })
    },
    // 控制菜单栏展开
    changeCollapse () {
      // console.log(this.$refs.aside)
      this.$refs.aside.isCollapse = !(this.$refs.aside.isCollapse)

      // 改变图标
      this.$refs.header.isCollapse = this.$refs.aside.isCollapse
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.loadUserProfile()
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
<style lang='less' scoped>
.layout-container {
    height: 100vh;
}
.aside {
    width: 200px;
    background-color: #d3dce6;
    .aside-menu {
      height: 100%;
    }
}
.header {
  height: 60px;
    // background-color: #b3c0d1;
}
.main {
    background-color: #e9eef3;
}
</style>
