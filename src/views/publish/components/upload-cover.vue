<template>
  <div class="upload-cover" @click="showCoverSelect(true)">
    <div class="cover-wrap">
      <img
        class="cover-image"
        ref="cover-image"
        :src="value"
      >
    </div>
    <!-- 弹出层 -->
    <el-dialog
    title="选择封面"
    append-to-body
    :visible.sync="dialogVisible"
    >
      <!-- tab栏 -->
      <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="素材库" name="first">
              <image-list
                :is-show-add="false"
                :is-show-action="false"
                is-show-selected
                ref="image-list"
                />
            </el-tab-pane>
            <el-tab-pane label="上传图片" name="second">
                <input ref="file" type="file" @change="onFileChange">
                <img
                ref="preview-image"
                width="100px">
            </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
            <el-button @click="showCoverSelect(false)">取 消</el-button>
            <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image'
import ImageList from '@/views/image/components/image-list'
export default {
  name: 'UploadCover',
  components: {
    ImageList
  },
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'second'
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    showCoverSelect (flag) {
        // 展示弹出层
        this.dialogVisible = flag
    },
    onFileChange () {
        // 获取文件对象
        const file = this.$refs.file.files[0]
        // 图片
        const blob = window.URL.createObjectURL(file)
        this.$refs['preview-image'].src = blob
        // 防止用户选择同一个文件触发change事件

        // this.$refs.file.value = ''
    },
    // 文章封面确定
    onCoverConfirm () {
        // 如果是上传的图片，且input有文件，才执行上传文件的操作
        if (this.activeName === 'second') {
            const file = this.$refs.file.files[0]
            if (!this.$refs.file.files[0]) {
                this.$message('请选择文件')
                return
            }
            // 执行上传文件操作
            const fd = new FormData()
            fd.append('image', file)
            uploadImage(fd).then(res => {
                console.log(res, '123')
                this.$message({
                    type: 'success',
                    message: '上传成功!',
                    center: true,
                    showClose: true
                })
                // 关闭弹出层
                this.dialogVisible = false
                // 展示上传的图片
                this.$refs['cover-image'].src = res.data.data.url
                // 将图片地址发送给父组件
                this.$emit('input', res.data.data.url)
            })
        } else if (this.activeName === 'first') {
          // 素材库
          // 父组件可以直接访问子组件的数据
          const imageList = this.$refs['image-list']
          const selected = imageList.selected
          if (selected === null) {
            this.$message('请选择封面图片')
            return
          }
          // 关闭对话框
          this.dialogVisible = false
          // 修改父组件,传递选择图片的url
          this.$emit('input', imageList.images[selected].url)
        }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
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

<style scoped lang="less">
.cover-wrap {
  width: 150px;
  height: 120px;
  border: 1px solid #000;
  .cover-image {
    height: 120px;
    max-width: 100%;
  }
}
</style>
