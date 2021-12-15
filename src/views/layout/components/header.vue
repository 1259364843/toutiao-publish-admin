<template>
  <div class="header-container">
    <div class="garr-header">
      <div class="shead_wrap">
        <!-- <a class="shead_logo" href="/">头条号</a> -->
        <div class="shead_left">
          <span>欢迎来到头条管理后台</span>
        </div>
        <div class="shead_right">
          <div class="create-time">在头条创作的第 948 天</div>
          <div class="user-panel">
            <el-dropdown @command="handleCommand">
              <div class="avatar-wrap" v-if="user">
                <img class="avatar" :src="user.photo" />
                <!-- <span>{{user.name}}</span> -->
                <h3>{{ user.name }}</h3>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="settings"><i class="el-icon-setting"></i>个人设置</el-dropdown-item>
                <el-dropdown-item command="logout"><i class="el-icon-circle-close"></i>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
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
      default() {
        return { name: '张三' }
      }
    }
  },
  data() {
    return {
      isCollapse: undefined
    }
  },
  computed: {},
  watch: {
    user: {
      handler(newVal, oldVal) {
        // 新值是传过来的，老值是默认的
        // console.log(newVal, oldVal)
      },
      deep: true
    }
  },
  created() {
    // 监听全局事件总线
    globalBus.$on('update-user', (data) => {
      this.user.name = data.name
      this.user.photo = data.photo
    })
  },
  mounted() {},
  methods: {
    // 改变左侧菜单的展开状态，向父组件发送一个自定义事件
    changeCollapse() {
      this.$emit('isCollapse')
    },
    // 处理<el-dropdown>中的事件
    handleCommand(command) {
      // 传递过来的是函数名，间接执行函数
      this[command]()
    },
    // 个人设置
    settings() {
      this.$router.push({
        name: 'settings'
      })
    },
    // 退出
    logout() {
      this.$confirm('确认退出当前账户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.localStorage.removeItem('user')
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '退出成功!',
            center: true,
            showClose: true
          })
        })
        .catch(() => {
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
  .garr-header {
    background-color: #fff;
    width: 100vw;
    height: 60px;
    padding: 0 62px;
    .shead_wrap {
      margin: 0 auto;
      height: 100%;
      .shead_left {
        float: left;
        padding: 20px 0;
      }
      .shead_right {
        display: flex;
        float: right;
        height: 100%;
        .create-time {
          line-height: 64px;
          font-size: 14px;
          color: #1d252f;
          margin-left: 48 px;
        }
        .user-panel {
          margin-left: 24px;
          // 头像
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
      }
    }
  }
}
</style>
