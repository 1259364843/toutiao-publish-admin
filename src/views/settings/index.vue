<!--  -->
<template>
	<div class='comment-container'>
		<el-card class="box-card">
			<div slot="header">
				<!-- 面包屑导航 -->
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item><a href="/">个人设置</a></el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-row>
				<el-col :span="15">
					<!-- 表单 -->
					<el-form ref="user-form" :model="user" :rules="rules" label-width="80px">
						<el-form-item label="编号">
							{{user.id}}
						</el-form-item>
						<el-form-item label="手机">
							{{user.mobile}}
						</el-form-item>
						<el-form-item label="媒体名称" prop="name">
							<el-input v-model="user.name"></el-input>
						</el-form-item>
						<el-form-item label="媒体简介" prop="intro">
							<el-input type="textarea" v-model="user.intro"></el-input>
						</el-form-item>
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="user.email"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" :loading="updataProfileLoading" @click="onUpdateUser">保存设置</el-button>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="4" :offset="2">
					<label for="file">
						<el-avatar
							shape="square"
							:size="150"
							fit="cover"
							:src="user.photo"
							></el-avatar>
							<p>点击修改头像</p>
							<!-- 文件上传按钮 -->
							<input
							id="file"
							type="file"
							hidden
							ref="file"
							@change="onFileChange"
							>
					</label>
				</el-col>
			</el-row>
		</el-card>
		<!-- 修改头像弹出层 -->
		<el-dialog
			title="修改头像"
			:visible.sync="dialogVisible"
			width="30%"
			center
			@opened="onDialogOpened"
			@closed="onDialogClosed"
			>
			<div class="preview-image-wrap">
				<img
					:src="previewImage"
					fit="cover"
					class="preview-image"
					ref="preview-image"
				>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" :loading="updatePhotoLoading" @click="onUploadPhoto">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 导入网络请求方法
import { getUserProfile, updateUserPhoto, updateUserProfile } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

// 全局事件总线
import globalBus from '@/utils/global-bus'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'SettingsIndex',
  components: {},
  data () {
    // 这里存放数据
    return {
				// 用户资料
				user: {
					id: null,
					email: '',
					mobile: '',
					intro: '',
					photo: ''
				},
				// 控制修改头像对话框
				dialogVisible: false,
				// 预览图片
				previewImage: '',
				// 裁切器实例对象
				cropper: null,
				// 更新用户头像loading状态
				updatePhotoLoading: false,
				// 更新基本信息loading状态
				updataProfileLoading: false,
				// 表单验证规则
				rules: {
					name: [
						{ required: true, message: '请输入媒体名称', trigger: 'blur' },
						{ min: 1, max: 7, message: '长度为1到7个字符', trigger: 'blur' }
					],
					intro: [
						{ required: true, message: '请填写媒体简介', trigger: 'blur' }
					],
					email: [
						{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
						{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
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
		loadUser () {
			getUserProfile().then((res) => {
				this.user = res.data.data
			})
		},
		onFileChange () {
			// 处于文件预览
			const file = this.$refs.file
			const blobData = window.URL.createObjectURL(file.files[0])
			console.log(blobData)
			// 预览图片
			this.previewImage = blobData
			// 展示弹出层，预览用户选择的图片
			this.dialogVisible = true
			// 解决系统文件不触发change事件问题
			this.$refs.file.value = ''
		},
		// 当弹出层打开
		onDialogOpened () {
			// 获取图片DOM节点
			const image = this.$refs['preview-image']
			// 如果已存在裁剪器对象，则替换图片
			if (this.cropper) {
				this.cropper.replace(this.previewImage)
				return
			}
			// 初始化裁剪器
			this.cropper = new Cropper(image, {
				// 比例
				aspectRatio: 1,
				viewMode: 1,
				dragMode: 'move',
				cropBoxMovable: false,
				cropBoxResizable: false,
				background: false,
				movable: true,
				crop (event) {
					console.log(event)
				}
			})
		},
		onDialogClosed () {
			// 对话框关闭，销毁裁剪器
			// this.cropper.destroy()
		},
		onUploadPhoto () {
			// 确定按钮开始loading
			this.updatePhotoLoading = true
			// 获取裁剪后的图片对象
			this.cropper.getCroppedCanvas().toBlob(file => {
				const fd = new FormData()
				fd.append('photo', file)
				// 请求提交fd
				// 请求更新用户头像
				updateUserPhoto(fd).then(res => {
					// 关闭对话框
					this.dialogVisible = false
					// 更新视图显示
					// this.user.photo = res.data.data.photo
					// 使用本地预览图片来更新视图
					this.user.photo = window.URL.createObjectURL(file)
					// 确定按钮关闭loading
					this.updatePhotoLoading = false
					this.$message({
						type: 'success',
						message: '更新头像成功!',
						center: true,
						showClose: true
					})
					globalBus.$emit('update-user', this.user)
				})
			})
		},
		// 更新用户信息
		onUpdateUser () {
			// 开启按钮loading
			this.updataProfileLoading = true
			// 表单验证
			this.$refs['user-form'].validate(valid => {
				// 验证失败，停止提交表单
				if (!valid) {
					return
				}
				// 验证通过提交请求
				updateUserProfile(this.user).then(res => {
					// 关闭loading
					this.updataProfileLoading = false
					this.$message({
						type: 'success',
						message: '用户信息更新成功!',
						center: true,
						showClose: true
					})
					// 全局事件总线发布通知，用于修改header中的个人信息
					globalBus.$emit('update-user', this.user)
				})
			})
		}
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
		this.loadUser()
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
<style lang='less' scoped>
.table-list {
	margin-bottom: 30px;
}
.comment-pagination {
	display: flex;
	// 主轴居中对齐
	justify-content: center;
}

.preview-image-wrap {
	.preview-image {
		display: block;
		max-width: 100%;
		height: 200px;
	}
}

</style>
