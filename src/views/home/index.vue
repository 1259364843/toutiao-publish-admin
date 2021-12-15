<!--  -->
<template>
  <div class="home">
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          <div class="dailywords">
            <div class="dailywords-words">
              <p>{{ sentence.content }}</p>
            </div>
            <div class="dailywords-origin">
              <span class="tag">《{{ sentence.tag }}》</span>
              <span>————{{ sentence.origin }}</span>
            </div>
          </div>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'HomeIndex',
  components: {},
  data() {
    // 这里存放数据
    return {
      sentence: {}
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    axios({
      method: 'GET',
      url: 'https://api.xygeng.cn/one'
    }).then((res) => {
      const { data } = res.data
      this.sentence = data
      console.log(data)
    })
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
.dailywords {
  width: 70%;
  height: 100px;
  margin: 40px auto 0px auto;
  .dailywords-words {
    width: 100%;
    font-size: 25px;
  }
  .dailywords-origin {
    position: relative;
    text-align: right;
    font-size: 20px;
    .tag {
      position: absolute;
      left: 0;
    }
  }
}
</style>
