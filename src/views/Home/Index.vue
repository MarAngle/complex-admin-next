<style lang="less" scoped>
.home-index{
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="home-index">
    {{ list }}
  </div>
</template>

<script lang="ts">
import _func from "@/main/func"
import { defineComponent } from "vue"


export default defineComponent({
  name: 'HomeIndex',
  data() {
    const list: any[] = []
    return {
      list: list
    }
  },
  mounted() {
    this.pushData({
      name: 1
    })
  },
  methods: {
    pushData(item: any) {
      this.list.push(_func.formatTree(item))
    }
  }
})
</script>
