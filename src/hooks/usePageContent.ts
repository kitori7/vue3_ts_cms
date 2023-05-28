import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'

function usePageContent() {
  // 点击了搜索
  const contentRef = ref<InstanceType<typeof PageContent>>()
  function propQueryClick(queryInfo: any) {
    contentRef.value?.fetchPageListData(queryInfo)
  }

  function propResetClick() {
    contentRef.value?.fetchPageListData()
  }

  return { contentRef, propQueryClick, propResetClick }
}

export default usePageContent
