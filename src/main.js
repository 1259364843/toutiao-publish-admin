/**
 * 项目的启动入口
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 加载组件库
import ElementUI from 'element-ui'
// 加载组件样式
import 'element-ui/lib/theme-chalk/index.css'

// 加载全局样式文件
import './styles/index.less'
Vue.config.productionTip = false

// 全局注册Element 组件库
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
