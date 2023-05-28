<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="propQueryClick"
      @reset-click="propResetClick"
    ></page-search>
    <page-content
      ref="contentRef"
      @edit-click="propEditClick"
      @new-click="propNewClick"
      :content-config="contentConfig"
    ></page-content>
    <page-modal ref="modalRef" :modal-config="modalConfig" :other-info="otherInfo">
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        ></el-tree>
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="role">
import { ref, nextTick } from 'vue'
import useMainStore from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import type { ElTree } from 'element-plus'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

import { mapMenusToIds } from '@/utils/map-menus'

const { contentRef, propQueryClick, propResetClick } = usePageContent()
const { modalRef, propEditClick, propNewClick } = usePageModal(EditCallback)

const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

const otherInfo = ref({})
const treeRef = ref<InstanceType<typeof ElTree>>()
function handleElTreeCheck(node: any, data: any) {
  const menuList = [...data.checkedKeys, ...data.halfCheckedKeys]
  console.log(menuList)
  otherInfo.value = { menuList }
}

function EditCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenusToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style scoped></style>
