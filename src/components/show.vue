<template>
  <div>
    <n-space justify="center">
      <!-- 设定画布 -->
      <canvas-view></canvas-view>
      <n-button
        type="primary"
        id="display-previous-truck"
        @click="displayPreviousTruck"
        >上一辆
      </n-button>
      <n-button type="primary" id="display-next-truck" @click="displayNextTruck"
        >下一辆
      </n-button>
      <n-button
        type="info"
        id="display-previous-step"
        @click="displayPreviousStep"
        >上一步</n-button
      >
      <n-button type="info" id="display-next-step" @click="displayNextStep"
        >下一步</n-button
      >
      <n-button type="warning" id="stop-loop">停止刷新</n-button>
      <n-button type="warning" id="resume-loop">恢复刷新</n-button>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { NButton, NSpace } from "naive-ui";
import {} from "p5";
import CanvasView from "./canvasView.vue";
import {
  displayPreviousTruck,
  displayPreviousStep,
  displayNextStep,
  displayNextTruck,
  // rotateDown,
  // rotateLeft,
  // rotateRight,
  // rotateUp,
  // zoomIn,
  // zoomOut,
} from "./canvasView.vue";
</script>
