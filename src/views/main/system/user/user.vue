<template>
  <div class="user">
    <user-search @query-click="propQueryClick" @reset-click="propResetClick"></user-search>
    <user-content ref="contentRef" @new-click="propNewClick"></user-content>
    <user-modal ref="modalRef"></user-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'

//对content组件操作
const contentRef = ref<InstanceType<typeof UserContent>>()
function propQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}

function propResetClick() {
  contentRef.value?.fetchUserListData()
}

const modalRef = ref<InstanceType<typeof UserModal>>()
function propNewClick() {
  modalRef.value?.setModalVisible()
}
</script>

<style scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
