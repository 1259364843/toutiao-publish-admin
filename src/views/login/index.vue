<template>
  <div class="login-container">
    <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
     -->

    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form
			class="login-form"
			ref="login-form"
			:model="user"
			:rules="formRules"
			>
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item  prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
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
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: rgba(255, 255, 255, .8);
    border-radius: 15px;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url("./logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
