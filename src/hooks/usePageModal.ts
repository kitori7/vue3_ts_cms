import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type EditFnType = (data: any) => void

function usePageModal(editCallback: EditFnType) {
  // 点击了搜索
  const modalRef = ref<InstanceType<typeof PageModal>>()
  //编辑
  function propEditClick(item: any) {
    modalRef.value?.setModalVisible(false, item)
    if (editCallback) {
      editCallback(item)
    }
  }

  //新增
  function propNewClick() {
    modalRef.value?.setModalVisible()
  }

  return { modalRef, propEditClick, propNewClick }
}

export default usePageModal
