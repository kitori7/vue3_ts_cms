<template>
  <div class="pie-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>
<script lang="ts" setup>
import BaseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'

const option: EChartsOption = {
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: '直接访问',
        },
        {
          value: 234,
          name: '联盟广告',
        },
        {
          value: 1548,
          name: '搜索引擎',
        },
      ],
    },
  ],
}
</script>
<style lang="less" scoped>
.pie-echart {
  color: red;
}
</style>
