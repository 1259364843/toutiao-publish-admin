<!--  -->
<template>
	<div class=''>
		<div class="action-head">
				<el-radio-group
				v-model="collect"
				@change="loadImages(1)"
				>
				<el-radio-button :label="false"
				>全部</el-radio-button>
				<el-radio-button :label="true"
				>收藏</el-radio-button>
				<el-button @click="loadImages(page)">重新加载</el-button>
				</el-radio-group>
				<el-button v-if="isShowAdd" type="success" @click="dialogUploadVisible = true">上传素材</el-button>
		</div>
		<!-- 素材列表 -->
		<div>
			<el-row :gutter="20">
			<el-col :xs="12" :sm="6" :md="6" :lg="4" :span="4"
			v-for="(img, index) in images"
			:key="index"
			class="image-item"
			@click.native="selected = index"
			>
				<el-image
				style="height: 100px"
				:src="img.url"
				fit="cover">
				</el-image>
				<!-- 覆盖图片的√ -->
				<div v-if="isShowSelected && selected === index" class="selected"></div>
				<div class="image-action" v-if="isShowAction">
					<el-button type="warning"
					:icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
					circle
					@click="onCollect(img)"
					:loading='img.loading'
					></el-button>
					<el-button
					type="danger"
					icon="el-icon-delete"
					circle
					@click="onDelete(img)"
					:loading='img.loading'
					></el-button>
				</div>
			</el-col>
			</el-row>
		</div>
		<!-- 分页 -->
		<el-pagination
		background
		layout="prev, pager, next"
		:total="totalCount"
		:page-size="pageSize"
		:current-page.sync="page"
		@current-change="onPageChange"
		/>
	</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getImages, collectImage, deleteImage } from '@/api/image'
export default {
  name: 'ImageList',
  components: {},
	props: {
		isShowAdd: {
			type: Boolean,
			default: true
		},
		isShowAction: {
			type: Boolean,
			default: true
		},
		// 是否展示选择
		isShowSelected: {
			type: Boolean,
			default: false
		}
	},
  data () {
    const user = JSON.parse(localStorage.getItem('user'))
    // 这里存放数据
    return {
      collect: 'false',
      // 图片素材列表
      images: [],
      // 是否显示上传素材弹出层
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      // 素材总数
      totalCount: 0,
      // 每页大小
      pageSize: 10,
      // 当前页码
      page: 1,
			// 图片是否被选中，记录索引
			selected: null
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 默认加载全部图片，collect为false则为收藏的图片
    loadImages (page = 1) {
      this.page = Number(page)
      console.log('加载图片')
      getImages({
        // 是否收藏
        collect: this.collect,
        page: page,
        pre_page: 10
      }).then(res => {
        const results = res.data.data.results
        results.forEach(img => {
          // img对象本来没有loading数据，手动添加此属性控制loading状态
          img.loading = false
        })
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    // 上传素材成功
    onUploadSuccess () {
      // 关闭对话框
      this.dialogUploadVisible = false
      // 更新素材列表
      this.loadImages(false)
    },
    // 当页码改变
    onPageChange (page) {
      this.loadImages(page)
    },
    // 收藏方法
    onCollect (img) {
      // 开启loading
      img.loading = true
      // 已经收藏，取消收藏
      // 未收藏，添加收藏
      collectImage(img.id, !img.is_collected).then(res => {
        img.is_collected = !img.is_collected
        // 关闭loading
        img.loading = false
      })
    },
    // 删除图片
    onDelete (img) {
      img.loading = true
      this.$confirm('确认删除当前图片?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
            center: true,
            showClose: true
          })
          deleteImage(img.id).then(res => {
          // 重新加载数据列表
          this.loadImages(this.page)
          img.loading = false
        })
        })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // 页面初始化，请求第一页数据
    this.loadImages(1, false)
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
// 顶部按钮区域
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.image-item {
	display: flex;
	justify-content: center;
  position: relative;
}
.image-action {
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  height: 40px;
  background-color: rgba(204, 204, 204, .5);
  position: absolute;
  bottom: 4px;
  left: 5px;
  right: 5px;
}
// 选中图片的样式
.selected {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: url(./selected.png) no-repeat;
	background-size: cover;
	width: 100px;
	height: 100px;
}
</style>
