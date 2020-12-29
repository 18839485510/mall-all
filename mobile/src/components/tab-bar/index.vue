<template>
  <div class="tab-bar">
    <van-tabbar
      v-model="active"
      @change="onChange"
      active-color="#f8c"
      inactive-color="#000"
    >
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" badge="20" to="/cart"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="manager-o" to="/user">用户中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {CHNAGE_TAB_BAR_ACTIVE} from './store/types'
import { mapMutations } from "vuex";
export default {
  name: "TabBar",
  methods:{
      ...mapMutations([CHNAGE_TAB_BAR_ACTIVE]),
      onChange(index) {
      sessionStorage.setItem("tabBarActive",index)
    },
  },
  computed: {
    active: {
      get() {
        return this.$store.state.tabBar.active
      },
      set(index){
        this[CHNAGE_TAB_BAR_ACTIVE](index)
      }
    },
  },
};
</script>