<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实性名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="isNewRef">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色">
              <el-option
                v-for="item in entireRoles"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                style="width: 100%"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门">
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
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: '',
})

//获取角色数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

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
    systemStore.editUserDataAction(editData.value.id, formData)
  } else {
    systemStore.newUserDataAction(formData)
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
