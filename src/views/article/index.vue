<!--  -->
<template>
   <div class='article-container'>
	<!-- 卡片 -->
	<el-card class="filter-card">
	<div slot="header" class="clearfix">
		<!-- 面包屑 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
	</div>
			<!-- 表单 -->
		<el-form ref="form" :model="form" label-width="40px" size="samll">
			<el-form-item label="状态">
			<el-radio-group v-model="status">
				<el-radio :label="null">全部</el-radio>
				<el-radio :label="0">草稿</el-radio>
				<el-radio :label="1">待审核</el-radio>
				<el-radio :label="2">审核通过</el-radio>
				<el-radio :label="3">审核失败</el-radio>
				<el-radio :label="4">已删除</el-radio>
			</el-radio-group>
			</el-form-item>
		<el-form-item label="频道">
			<el-select v-model="channelId" placeholder="请选择频道">
				<el-option
				label="全部"
				:value="null"
				></el-option>
				<el-option
				:label="channel.name"
				:value="channel.id"
				v-for="(channel, index) in channels"
				:key="index"
				></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="日期">
			<el-col :span="11">
				<el-date-picker
					v-model="rangeDate"
					type="datetimerange"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					:default-time="['12:00:00']"
					format="yyyy-MM-dd"
					value-format="yyyy-MM-dd"
					>
				</el-date-picker>
			</el-col>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="loadArticles(1)" :disabled="loading">筛选</el-button>
		</el-form-item>
	</el-form>
	</el-card>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>筛选结果</span>
		</div>
		<!-- 数据列表 -->
	<el-table
    :data="articles"
    style="width: 100%"
	class="list-table"
	stripe
	border
	size="samll"
	v-loading="loading"
    >
	<el-table-column
		prop="date"
		label="封面"
		width="180">
		<template slot-scope="scope">
			<el-image
			style="width: 100px; height: 100px"
			:src="scope.row.cover.images[0]"
			class="article-cover"
			fit="cover"
			lazy
			>
			<div slot="placeholder" class="image-slot">
				加载中<span class="dot">...</span>
			</div>
			</el-image>
		</template>
	</el-table-column>
	<el-table-column
		prop="title"
		label="标题"
		width="180">
	</el-table-column>
	<el-table-column
		prop="status"
		label="状态">
		<!-- 如果需要获取当前遍历项的数据， 则声明slot-scope="scope"-->
		<template slot-scope="scope">
			<el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
		</template>
	</el-table-column>
	<el-table-column
	prop="pubdate"
	label="发布时间">
	</el-table-column>
	<el-table-column
	prop="address"
	label="操作">
		<template slot-scope="scope">
			<el-button
			size="samll"
			type="primary"
			icon="el-icon-edit"
			circle
			@click="$router.push('/publish?id=' + scope.row.id.toString())"
			></el-button>
			<el-button
			size="samll"
			type="danger"
			icon="el-icon-delete"
			circle
			@click="onDleteArticle(scope.row.id)"
			></el-button>
		</template>
	</el-table-column>
    </el-table>

	<!-- 分页 -->
	<el-pagination
	background
	layout="prev, pager, next"
	:total="totalCount"
	@current-change="loadArticles"
	:page-size="pageSize"
	:disabled="loading"
	:current-page.sync="page"
	>
	</el-pagination>
	</el-card>
   </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 导入网络请求方法
import { getArticles, getArticlechannels, dleteArticle } from '@/api/article'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'ArticleIndex',
  components: {},
  data () {
    // 这里存放数据
    return {
		form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
		// 文章数据列表
		articles: [],
		// 文章状态列表
		articleStatus: [
			{ status: 0, text: '草稿', type: '' },
			{ status: 0, text: '待审核', type: 'info' },
			{ status: 0, text: '审核通过', type: 'success' },
			{ status: 0, text: '审核失败', type: 'warning' },
			{ status: 0, text: '已删除', type: 'danger' }
		],
		// 文章总数量
		totalCount: 0,
		// 每页数据条数
		pageSize: 20,
		// 查询文章状态，不传就是所有状态
		status: null,
		// 文章频道列表
		channels: [],
		// 查询文章频道
		channelId: null,
		// 筛选日期的范围
		rangeDate: [],
		// 表格加载loading
		loading: true,
		page: 1
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
	//   默认获取第一页数据
	loadArticles (page = 1) {
		console.log('红红火火恍恍惚惚', page)
		// 开启表格loading效果
		this.loading = true
		// 获取文章
        getArticles(
			// query参数
			{
				page: page,
				per_page: this.pageSize,
				status: this.status,
				channel_id: this.channelId,
				begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
				end_pubdate: this.rangeDate ? this.rangeDate[1] : null
			}
		).then(res => {
			console.log('请求数据完成', res)
			// 解构
			const { results, total_count: totalCount } = res.data.data
			this.articles = results
			// 文章总数
			this.totalCount = totalCount
			// 关闭表格loading效果
			this.loading = false
		})
	},
	// 页码改变的事件处理
	onCurrentChange (page) {
		// 根据改变的页码去请求对应的数据
		this.loadArticles(page)
	},
	// 加载频道数据
	loadChannels () {
		getArticlechannels().then(res => {
			console.log(res)
			// 存储文章频道数据
			this.channels = res.data.data.channels
		})
	},
	// 删除文章方法
	onDleteArticle (articleId) {
		// 删除前提示
		// 删除前提.toString()示
		this.$confirm('确认删除当前文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
		// console.log('onDleteArticle')
		// 调用删除文章接口,传入要删除的文章id
		// id需要调用toString方法才能传递正确
		dleteArticle(articleId.toString()).then(() => {
			this.$message({
				type: 'success',
				message: '删除成功!',
				center: true,
				showClose: true
			})
		//   删除成功后更新页面视图，重新加载数据,传入当前页码
			// this.loadArticles(1)
		})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            center: true,
            showClose: true
          })
        })
	}
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
	this.loadArticles()
	this.loadChannels()
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
.filter-card {
	margin-bottom: 30px;
}
.list-table {
	margin-bottom: 20px;
}
// el-card的样式
.text {
	font-size: 14px;
}

.item {
	margin-bottom: 18px;
}

// 文章封面图样式
.article-cover {
	width: 100px;
	background-size: cover;
}
</style>
