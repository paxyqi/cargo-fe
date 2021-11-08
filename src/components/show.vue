<template>
  <div>
    <n-space justify="center" vertical label-width="80%">
      <!-- 设定画布 -->
      <n-space justify="center">
        <canvas-view :init-value="encode" ref="refFunction"></canvas-view>
      </n-space>
      <n-space justify="center">
        <n-button
          type="primary"
          id="display-previous-truck"
          @click="displayPreviousTruck"
          >上一辆
        </n-button>
        <n-button
          type="primary"
          id="display-next-truck"
          @click="displayNextTruck"
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
        <n-button type="warning" id="rotate-up" @click="rotateUp"
          >向上
        </n-button>
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
    </n-space>
  </div>
</template>
<script lang="ts" setup>
import { toRefs, ref } from "vue";
import { NButton, NSpace } from "naive-ui";
import {} from "p5";
import CanvasView from "./canvasView.vue";
import type { CanvasApi } from "./canvasView.vue";
import { showEncode } from "../model/encode";
const refFunction = ref<CanvasApi>();
const props = defineProps({
  initValue: {
    required: true,
    type: Object as () => showEncode,
  },
});
const { initValue } = toRefs(props);
const encode = ref(initValue);
console.log("this is show.vue" + encode.value.showEncode);

const displayPreviousTruck = () => {
  console.log("displayPreviousTruck");
  refFunction.value?.displayPreviousTruck();
};
const displayNextTruck = () => {
  refFunction.value?.displayNextTruck();
};
const displayPreviousStep = () => {
  refFunction.value?.displayPreviousStep();
};
const displayNextStep = () => {
  refFunction.value?.displayNextStep();
};
const rotateUp = () => {
  refFunction.value?.rotateUp();
};
const rotateDown = () => {
  refFunction.value?.rotateDown();
};
const rotateLeft = () => {
  refFunction.value?.rotateLeft();
};
const rotateRight = () => {
  refFunction.value?.rotateRight();
};
const zoomIn = () => {
  refFunction.value?.zoomIn();
};
const zoomOut = () => {
  refFunction.value?.zoomOut();
};
</script>
