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
    <ComplexTableView :listData="mainData" :columnList="pageList">
      <template #menu="{ record }">
        <a-button type="" @click="onChange(record)">编辑</a-button>
      </template>
    </ComplexTableView>
    <ComplexAutoModal
      :optionProps="{
        width: 620,
        okText: '确认',
        destroyOnClose: true
      }"
      :auto="{
        ok: false
      }"
      :onEvent="onEditEvent"
      ref="edit-modal"
    >
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
      this.onEdit()
    },
    onChange(record: Record<PropertyKey, any>) {
      this.onEdit(record)
    },
    onEdit(record?: Record<PropertyKey, any>) {
      (this.$refs['edit-modal'] as any).show(record ? '编辑' : '新增')
      this.$nextTick(() => {
        if (record) {
          (this.$refs['edit-view'] as any).show('change', 'change', record)
        } else {
          (this.$refs['edit-view'] as any).show('build', 'build')
        }
      })
    },
    onEditEvent(act: string) {
      if (act == 'ok') {
        (this.$refs['edit-view'] as any).handle((promise: any) => {
          if (promise) {
            promise.then(() => {
              (this.$refs['edit-modal'] as any).hide()
            },(err: any) => {
              console.error(err)
            })
          }
        })
      }
    }
  }
});
</script>
