import "isomorphic-fetch"
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "normalize.css/normalize.css";
import "@/assets/less/common.less";
import '@/components'
import '@/icons'
Vue.use(ElementUI)
new Vue({
    router,
    render:h=>h(App)
}).$mount('#app')