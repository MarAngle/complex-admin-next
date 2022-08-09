<style lang="less" scoped>
.home-index{
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="home-index">
    {{ mainData }}
    <ComplexAutoIndex :index="10" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import mainData from "./mainData"


export default defineComponent({
  name: 'HomeIndex',
  data() {
    return {
      mainData: mainData
    }
  },
  methods: {
  }
})
</script>
