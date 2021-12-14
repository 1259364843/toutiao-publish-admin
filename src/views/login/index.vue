<template>
    <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
     -->
    <div class="layout-container">
      <div class="login-wrap">
        <div class="login-left">
          <!-- 左侧背景 -->
          <div class="bg"></div>
        </div>
        <div class="login-right">
          <div class="login-container">
            <img class="platform-title" src="data:image/png;base64,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" height="54" alt="">
            <div class="login-box">
              <el-form
              class="login-form"
              ref="login-form"
              :model="user"
              :rules="formRules"
              >
                <el-form-item>
                  <h2>用户登录</h2>
                </el-form-item>
                <el-form-item prop="mobile">
                  <el-input prefix-icon="iconfont icon-yonghu" v-model="user.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item  prop="code">
                  <el-input prefix-icon="iconfont icon-mima" v-model="user.code" placeholder="请输入验证码" show-password></el-input>
                </el-form-item>
                <el-form-item prop="agree">
                  <el-checkbox v-model="user.agree"
                    >我已阅读并同意用户协议和隐私条款</el-checkbox
                  >
                </el-form-item>
                <el-form-item>
                  <el-button
                  class="login-btn"
                  type="primary"
                  @click="onLogin"
                  :loading="loginLoading"
                    >登录</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
				// mobile: '',
				// code: '',
				agree: false,
        mobile: '13911111111', // 手机号
        code: '246810'// 验证码
      },
      checked: false, // 是否同意协议的选中状态
			// 登录的loading效果
			loginLoading: false,
			formRules: {
				// 表单验证规则
				mobile: [
            { required: true, message: '手机号不能为空', trigger: 'change' },
            { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '号码格式不正确', trigger: 'change' }
          ],
					code: [
            { required: true, message: '验证码不能为空', trigger: 'change' },
            { pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'change' }
          ],
					agree: [
						{
							validator: (rule, value, callback) => {
							if (value) {
								callback()
							} else {
								callback(new Error('请同意用户协议'))
							}
						},
						trigger: 'change'
						}
					]
			}
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 表单验证
			this.$refs['login-form'].validate((valid, err) => {
				console.log(valid, err)
				if (!valid) {
					return
				}
				// 通过验证，请求登录
				this.login()
			})
      // 处理后端响应结果
    },
		login () {
      // 提交登录
			// 开启登录按钮loading
			this.loginLoading = true
			// 调用api模块中导出的请求方法，把表单对象传入
			login(this.user)
			.then(res => {
				this.$message({
          message: '恭喜你，登录成功',
          type: 'success',
					center: true,
					showClose: true
        })
				// 关闭登录按钮loading
				this.loginLoading = false
				console.log(res)
        // 将接口返回的用户相关数据存放到本地存储，方便使用
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        // 路由跳转到首页
        this.$router.push({
          name: 'layout'
        })
			})
			.catch(err => {
				// 登录验证失败
				console.log(err)
				this.$message({
          message: '登录验证失败',
          type: 'error',
					center: true,
					showClose: true
        })
				// 关闭登录按钮loading
				this.loginLoading = false
			})
		}
  }
}
</script>

<style scoped lang="less">
  .layout-container {
    height: 100%;
    .login-wrap {
      display: flex;
      height: 100vh;
      min-height: 700px;
      width: 100%;
        .login-left {
          flex: 1 1;
          .bg {
            background-image: url(https://lf3-cdn-tos.bytegoofy.com/goofy/web-login-page/static/media/bg.7ef61e4b.jpeg);
            background-position: 100%;
            background-repeat: no-repeat;
            background-size: cover;
            height: 100vh;
            min-height: 700px;
          }
      }
      .login-right {
        height: 550px;
        .login-container {
          display: flex;
          flex-direction: column;
          align-items:center;
          justify-content: center;
          padding: 100px 200px;
          .login-box {
            position: relative;
            width: 368px;
            .login-form {
              h2 {
                text-align: center;
              }
              .login-btn {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }

</style>
