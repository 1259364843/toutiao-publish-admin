<template>
  <div class="header-container">
    <div>
      <i
       :class="{
         'el-icon-s-fold': isCollapse,
         'el-icon-s-unfold': !isCollapse
       }"
       @click="changeCollapse"></i>
      <span>江苏传智播客科技教育有限公司</span>
    </div>
    <el-dropdown @command="handleCommand">
      <div class="avatar-wrap" v-if="user">
        <img
        class="avatar"
        :src="user.photo">
        <!-- <span>{{user.name}}</span> -->
        <h3>{{user.name}}</h3>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        <el-dropdown-item command="logout">退出2</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// 全局事件总线
import globalBus from '@/utils/global-bus'

export default {
  name: 'AppHeader',
  components: {},
  props: {
    // 传递过来用户的信息
    user: {
        type: Object,
        default () {
            return { name: '张三' }
        }
    }
  },
  data () {
    return {
      isCollapse: undefined
    }
  },
  computed: {},
  watch: {
    user: {
      handler (newVal, oldVal) {
        // 新值是传过来的，老值是默认的
      console.log(newVal, oldVal)
    },
    deep: true
    }
  },
  created () {
    // 监听全局事件总线
    globalBus.$on('update-user', (data) => {
      this.user.name = data.name
      this.user.photo = data.photo
    })
  },
  mounted () {
  },
  methods: {
    // 改变左侧菜单的展开状态，向父组件发送一个自定义事件
    changeCollapse () {
      this.$emit('isCollapse')
    },
    // 处理<el-dropdown>中的事件
    handleCommand (command) {
      // 传递过来的是函数名，间接执行函数
      this[command]()
    },
    // 退出
    logout () {
       this.$confirm('确认退出当前账户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.localStorage.removeItem('user')
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '退出成功!',
            center: true,
            showClose: true
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出',
            center: true,
            showClose: true
          })
        })
    }
  }
}
</script>

<style scoped lang="less">
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
