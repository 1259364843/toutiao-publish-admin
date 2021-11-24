<!--  -->
<template>
	<div class='comment-container'>
		<el-card class="box-card">
			<div slot="header">
					<!-- 面包屑导航 -->
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item><a href="/">评论管理</a></el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<!-- 评论列表 -->
			<el-table
				:data="articles"
				stripe
				style="width: 100%"
				class="table-list"
				>
				<el-table-column
					prop="title"
					label="标题">
				</el-table-column>
				<el-table-column
					prop="total_comment_count"
					label="总评论数">
				</el-table-column>
				<el-table-column
					prop="fans_comment_count"
					label="粉丝评论数">
				</el-table-column>
				<el-table-column
					prop="comment_status"
					label="状态">
					<template slot-scope="scope">
						<el-tag type="success" v-if="scope.row.comment_status">正常</el-tag>
						<el-tag type="danger" v-else>关闭</el-tag>
					</template>
				</el-table-column>
				<el-table-column
					label="操作">
					<template slot-scope="scope">
						<el-switch
							style="display: block"
							v-model="scope.row.comment_status"
							active-color="#13ce66"
							inactive-color="#ff4949"
							active-text="开启"
							inactive-text="关闭"
							@change="onStatusChange(scope.row)"
							:disabled="scope.row.statusDisabled"
							>
						</el-switch>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="page"
				:page-sizes="[10, 20, 30, 40]"
				:page-size.sync="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalCount"
				class="comment-pagination"
				>
			</el-pagination>
		</el-card>
	</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 导入网络请求方法
import { getArticles, updataCommentStatus } from '@/api/article'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'CommentIndex',
  components: {},
  data () {
    // 这里存放数据
    return {
				// 文章数据列表
				articles: [],
				// 总数据条数
				totalCount: 0,
				// 每页数据条数
				pageSize: 10,
				// 当前激活页码
				page: 1
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
		handleSizeChange (pageSize) {
        console.log(`每页 ${pageSize} 条`)
				this.loadArticles(1)
      },
      handleCurrentChange (page) {
        console.log(`当前页: ${page}`)
				// 页码改变，加载指定页码数据
				this.loadArticles(page)
      },
			loadArticles (page = 1) {
				// 让分页组件激活的页码和请求数据的页码保持一致
				this.page = page
				getArticles({
					response_type: 'comment',
					page,
					pre_page: this.pageSize
				}).then(res => {
					// 结构赋值
					const { results } = res.data.data
					results.forEach(article => {
						// 每遍历一个数据就添加一个属性
						article.statusDisabled = false
					})
					this.articles = results
					this.totalCount = res.data.data.total_count
				})
			},
			// 评论状态改变
			onStatusChange (article) {
				// 禁用开关
				article.statusDisabled = true
				// 参数就是操作的那篇文章
				console.log(article)
				// 发送请求修改状态
				updataCommentStatus(article.id.toString(), article.comment_status)
				.then(res => {
					article.statusDisabled = false
					this.$message({
						type: 'success',
						message: article.comment_status ? '开启评论状态成功' : '关闭评论状态成功',
						center: true,
						showClose: true
					})
				})
			}
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
		this.loadArticles()
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
</style>
