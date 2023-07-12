<template>
  <div class="dashboard">
    <!-- 顶部数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6">
          <count-cart v-bind="item"></count-cart>
        </el-col>
      </template>
    </el-row>
    <!-- 中间图表 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card class="center-echart echart-pie1" title="饼图">
          <pie-echart></pie-echart>
        </hy-card>
      </el-col>

      <el-col :span="10">
        <hy-card class="center-echart echart-earth" title="中国地图"> </hy-card>
      </el-col>

      <el-col :span="7">
        <hy-card class="center-echart echart-pie1" title="玫瑰图"> </hy-card>
      </el-col>
    </el-row>

    <!-- 底部图表 -->

    <el-row :gutter="10">
      <el-col :span="12">
        <hy-card class="bottom-echart echart-bar" title="折线图">
          <line-echart></line-echart>
        </hy-card>
      </el-col>

      <el-col :span="12">
        <hy-card class="bottom-echart echart-line" title="条形图"> </hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import CountCart from './c-cpns/count-card/count-card.vue'
import HyCard from './c-cpns/hy-card/hy-card.vue'
import useAnalysis from '@/stores/main/analysis/analysis'

import { LineEchart, PieEchart } from '@/components/page-echarts'

//发送请求
const analysisStore = useAnalysis()
analysisStore.fetchAnalysisDataAction()

//获取数据
const { amountList } = storeToRefs(analysisStore)
</script>

<style scoped>
.dashboard {
  .digital-panel-row {
    height: 130px;
    margin-bottom: 20px;
    overflow: hidden;
    text-align: left;
  }

  .center-echart {
    height: 450px;
    margin: 20px 20px 20px 0;
  }

  .bottom-echart {
    height: 300px;
  }
}
</style>
