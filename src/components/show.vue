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
        >上一步
      </n-button>
      <n-button type="info" id="display-next-step" @click="displayNextStep"
        >下一步
      </n-button>
      <n-button type="warning" id="rotate-up" @click="rotateUp">向上 </n-button>
      <n-button type="warning" id="rotate-down" @click="rotateDown"
        >向下
      </n-button>
      <n-button type="warning" id="rotate-left" @click="rotateLeft"
        >向左
      </n-button>
      <n-button type="warning" id="rotate-right" @click="rotateRight"
        >向右
      </n-button>
      <n-button type="success" id="zoom-in" @click="zoomIn">靠近 </n-button>
      <n-button type="success" id="zoom-out" @click="zoomOut">远离 </n-button>
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
  rotateDown,
  rotateLeft,
  rotateRight,
  rotateUp,
  zoomIn,
  zoomOut,
} from "./canvasView.vue";
</script>
