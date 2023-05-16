<template>
  <div class="container">
    <div class="itemleft">
      <Ip>

        <template #main>
          <One/>
        </template>

      </Ip>
      <Ip>
        <template #main>
          <Two/>
        </template>
      </Ip>
    </div>
    <div class="itemright">
      <Ip>
        <template #main>
          <Three/>
        </template>
      </Ip>
      <Ip>
        <template #main>
          <Four/>
        </template>
      </Ip>
    </div>
  </div>
</template>

<script setup>
import Ip from "../../components/ItemPage.vue"
import One from "../../components/OneView.vue"
import Two from "../../components/TwoView.vue"
import Three from "../../components/ThreeView.vue"
import Four from "../../components/FourView.vue"
// import China from "../Map/china.vue"
</script>

<style lang="scss">
  .container{
    width: 100%;
    margin: 0 auto;
    height: 100%;
    // // background-color: gray;
    display: flex;
    .itemleft,.itemright{
      flex:1;
    }
    //  .item{
    //   height: 50%;
    //   div{
    //     height: 100%;
    //   }
    //   canvas{
    //     height: 300px !important;
    //     width: 500px !important;
    //   }
    // }

  }
</style>