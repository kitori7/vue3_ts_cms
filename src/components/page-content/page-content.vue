<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handleNewUserClick">{{
        contentConfig.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" :label="item.label"
              ><template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template></el-table-column
            >
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" :label="item.label" width="150px">
              <template #default="scope">
                <el-button
                  text
                  size="small"
                  type="primary"
                  icon="Edit"
                  @click="handleEditBtnClick(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  text
                  size="small"
                  type="danger"
                  icon="Delete"
                  @click="handleDeleteBtnClick(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item"></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total,sizes,prev,pager,next,jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/stores/main/system/system'
import { formatUTC } from '@/utils/format'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
  }
}

const props = defineProps<IProps>()
//自定义事件
const emit = defineEmits(['newClick', 'editClick'])
//页码相关逻辑
const currentPage = ref(1)
const pageSize = ref(10)

function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 发起请求
const systemStore = useSystemStore()
fetchPageListData()
// 获取数据展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

//定义网络请求函数
function fetchPageListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}
//暴露网络请求
defineExpose({ fetchPageListData })

//删除操作
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}
//新建用户功能
function handleNewUserClick() {
  emit('newClick')
}
//编辑用户
function handleEditBtnClick(item: any) {
  emit('editClick', item)
}
</script>
<style lang="less" scoped>
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  margin-bottom: 10px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  .title {
    font-size: 22px;
  }
}
.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>