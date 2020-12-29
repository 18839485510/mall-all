<!--1.模板-->
<template>
  <div class="search">
      <van-search v-model="value" placeholder="请输入搜索关键词" @focus="$router.push('/search')" />
      <div class="history">
        <span>历史搜索:</span>
      </div>
  </div>
</template>

<!--2.逻辑-->
<script>
////导出当前组件的配置
export default {
  name: "Search",
  data(){
    return {
      value:''
    }
  }
};
</script>

<!--3.样式-->

<!--scoped 会给当前组件的所有标签动态生成一个属性，作为属性选择器来确保当前样式只作用到当前组件的页面-->
<style lang="less" scoped>
  .search{
    font-size: 14px;
  }
  .history{
    font-size: 16px;
    padding:0 15px;
  }
</style>