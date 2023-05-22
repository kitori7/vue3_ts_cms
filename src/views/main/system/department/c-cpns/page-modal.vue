<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="部门名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称"></el-input>
          </el-form-item>
          <el-form-item label="领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导"></el-input>
          </el-form-item>
          <el-form-item label="选择部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择部门">
              <el-option
                v-for="item in entireDepartments"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                style="width: 100%"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span
          ><el-button @click="dialogVisible = false">取消</el-button
          ><el-button type="primary" @click="handleConfirm">确定</el-button></span
        >
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import useMainStore from '@/stores/main/main'
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import { ref, reactive } from 'vue'

const dialogVisible = ref(false)

const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: '',
})

//获取角色数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore)

const isNewRef = ref(true)
const editData = ref()
function setModalVisible(isNew: boolean = true, item?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && item) {
    for (const key in formData) {
      formData[key] = item[key]
    }
    editData.value = item
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

//提交
function handleConfirm() {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    systemStore.newPageDataAction('department', formData)
  }
}
defineExpose({ setModalVisible })
</script>
<style lang="less" scoped>
.modal {
  .form {
    padding: 0 20px;
  }
}
</style>
