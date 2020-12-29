import Vue from "vue"
import Vuex from "vuex"
import home from 'pages/home/store'
import tabBar from 'components/tab-bar/store'

//安装vuex

Vue.use(Vuex)

//创建store

const store = new Vuex.Store({
    modules:{
      home,
      tabBar
    }
})

//导出store

export default store