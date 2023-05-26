<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder"></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                ></el-date-picker>
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="formData[item.prop]" :placeholder="item.placeholder">
                  <el-option
                    v-for="options in item.options"
                    :key="options.value"
                    :label="options.label"
                    :value="options.value"
                  ></el-option>
                </el-select>
              </template>
            </el-form-item>
          </template>
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
import useSystemStore from '@/stores/main/system/system'
import { ref, reactive } from 'vue'

interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
}

const props = defineProps<IProps>()

const dialogVisible = ref(false)

const initialData: any = {}

for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialData)

//获取角色数据
const systemStore = useSystemStore()

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
      const item = props.modalConfig.formItems.find((item) => item.prop === key)
      formData[key] = item ? item.initialData : ''
    }
    editData.value = null
  }
}

//提交
function handleConfirm() {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, formData)
  } else {
    systemStore.newPageDataAction(props.modalConfig.pageName, formData)
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
