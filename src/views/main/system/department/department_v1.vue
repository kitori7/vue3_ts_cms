<template>
  <div class="department">
    <page-search @query-click="propQueryClick" @reset-click="propResetClick"></page-search>
    <page-content
      ref="contentRef"
      @edit-click="propEditClick"
      @new-click="propNewClick"
    ></page-content>
    <page-modal ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from 'vue'
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'

// 点击了搜索
const contentRef = ref<InstanceType<typeof PageContent>>()
function propQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}

function propResetClick() {
  contentRef.value?.fetchPageListData()
}

const modalRef = ref<InstanceType<typeof PageModal>>()
//编辑
function propEditClick(item: any) {
  modalRef.value?.setModalVisible(false, item)
}

//新增
function propNewClick() {
  modalRef.value?.setModalVisible()
}
</script>

<style scoped></style>
