<template>
  <div class="line-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>
<script lang="ts" setup>
import BaseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'

const option: EChartsOption = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25],
    },
  ],
}
</script>
<style lang="less" scoped>
.line-echart {
  color: red;
}
</style>
