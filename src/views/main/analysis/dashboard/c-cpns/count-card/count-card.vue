<template>
  <div class="count-card">
    <div class="header">
      <span>{{ title }}</span>
      <el-tooltip :content="tips" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span class="count" ref="count1Ref">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subtitle }}</span>
      <span ref="count2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'

interface IProps {
  amount: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}
const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tips: '所有的商品总销量',
  number1: 509989,
  number2: 509989,
  subtitle: '商品总销量',
})

const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()
const countOption = {
  prefix: props.amount === 'saleroom' ? '￥' : '',
}
onMounted(() => {
  const countup1 = new CountUp(count1Ref.value!, props.number1, countOption).start()
  const countup2 = new CountUp(count2Ref.value!, props.number2, countOption).start()
})
</script>
<style lang="less" scoped>
@h: 38px;
.count-card {
  display: flex;
  padding: 0 20px;
  background: white;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 2px 12px 0 rgb(0 0 0/10%);

  .header {
    display: flex;
    height: @h;
    font-size: 14px;
    line-height: @h;
    flex: 1;
    color: rgba(0, 0, 0, 0.45);
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .footer {
    display: flex;
    height: @h;
    line-height: @h;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
