<template>
  <router-view/>
</template>
<script setup>
    import * as echarts from "echarts"
    import {provide, Provider} from "vue"
    provide("echarts",echarts)
</script>
<style lang="scss">
@import url(./style/main.scss);
*{
  margin: 0;
}

</style>
