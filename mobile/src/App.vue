<template>
  <div id="app">
    <div id="page">
      <router-view />
    </div>
    <TabBar />
  </div>
</template>
<script>
import TabBar from 'components/tab-bar/index.vue'
export default {
  components:{
    "TabBar":TabBar
  }
}
</script>

<style lang="less">

</style>
