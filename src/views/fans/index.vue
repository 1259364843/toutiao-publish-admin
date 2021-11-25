<!--  -->
<template>
	<div class='comment-container'>
		<el-card class="box-card">
			<div slot="header">
				<!-- 面包屑导航 -->
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item><a href="/">粉丝管理</a></el-breadcrumb-item>
				</el-breadcrumb>
			</div>
            <!-- 1.准备echarts容器 -->
            <div ref="main" id="main" style="width: 600px;height:400px;"></div>
		</el-card>
	</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

// 2.加载echarts
import * as echarts from 'echarts'

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'FansIndex',
  components: {},
  data () {
    // 这里存放数据
    return {

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // 3.基于DOM，初始化实例
    var myChart = echarts.init(this.$refs.main)
    window.onresize = function () {
        myChart.resize()
    }
    const option = {
        legend: {
            // Try 'horizontal'
            orient: 'vertical',
            right: 10,
            top: 'center'
        },
        dataset: {
            source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
            ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
        }
        myChart.setOption(option)
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
</style>
