<template>
  <div>
    <n-space justify="center">
      <!-- 设定画布 -->
      <canvas-view></canvas-view>
      <n-button type="primary" id="display-previous-truck">上一辆</n-button>
      <n-button type="primary" id="display-next-truck">下一辆</n-button>
      <n-button type="info" id="display-previous-step">上一步</n-button>
      <n-button type="info" id="display-next-step">下一步</n-button>
      <n-button type="warning" id="stop-loop">停止刷新</n-button>
      <n-button type="warning" id="resume-loop">恢复刷新</n-button>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { NButton, NSpace } from "naive-ui";
import {} from "p5";
import CanvasView from "./canvasView.vue";
</script>
