<style lang="less" scoped>
.home-index {
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>

<template>
  <div class="home-index">
    <a-button @click="onBuild()">新建</a-button>
    <ComplexTableView :listData="mainData" :columnList="pageList" />
    <ComplexAutoModal
      :optionProps="{
        width: 620,
        okText: '确认',
        destroyOnClose: true
      }"
      ref="edit-modal">
      <ComplexEditForm ref="edit-view" :dictionary="mainData.$module.dictionary"></ComplexEditForm>
    </ComplexAutoModal>
  </div>
</template>

<script lang="ts" >
import { defineComponent } from "vue";
import mainData from "./mainData";

export default defineComponent({
  name: "HomeIndex",
  data() {
    return {
      mainData: mainData,
      pageList: mainData.$getDictionaryPageList('list')
    }
  },
  methods: {
    onBuild() {
      (this.$refs['edit-modal'] as any).show('新增')
      this.$nextTick(() => {
        (this.$refs['edit-view'] as any).show('build', 'build')
      })
    }
  }
});
</script>
