<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="propQueryClick"
      @reset-click="propResetClick"
    ></page-search>
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @edit-click="propEditClick"
      @new-click="propNewClick"
    >
      <template #leader="scope">
        <div>{{ scope.row.leader }}</div>
      </template>
    </page-content>
    <page-modal ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'

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
