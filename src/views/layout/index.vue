<!-- layout -->
<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <!-- 侧边栏 -->
      <app-aside class="aside-menu" ref="aside" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <!-- 使用子组件 -->
        <app-header :user="user" @isCollapse="changeCollapse" ref="header" />
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
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
  data() {
    // 这里存放数据
    return {
      // 当前登录用户信息
      user: undefined,
      // 控制侧边菜单折叠
      isCollapse: true
    }
  },
  // 方法集合
  methods: {
    loadUserProfile() {
      getUserProfile().then((res) => {
        // 把返回的数据赋值给user对象
        this.user = res.data.data
      })
    },
    // 控制菜单栏展开
    changeCollapse() {
      // console.log(this.$refs.aside)
      this.$refs.aside.isCollapse = !this.$refs.aside.isCollapse

      // 改变图标
      this.$refs.header.isCollapse = this.$refs.aside.isCollapse
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.loadUserProfile()
  }
}
</script>
<style lang="less" scoped>
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
