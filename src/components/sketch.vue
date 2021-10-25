// vue-p5's vue3 port, please don not edit @Gaojianli 2021/10/25
<template>
  <div ref="canvas"></div>
</template>
<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import p5 from "p5";
const P5 = p5;
import { onMounted, ref } from "vue";
function distinct<T>(arr: Array<T>) {
  return Array.from(new Set(arr));
}
const initialEvents = [
  "preload",
  "setup",
  "draw",
  "deviceMoved",
  "deviceTurned",
  "deviceShaken",
  "keyPressed",
  "keyReleased",
  "keyTyped",
  "mouseMoved",
  "mouseDragged",
  "mousePressed",
  "mouseReleased",
  "mouseClicked",
  "doubleClicked",
  "mouseWheel",
  "touchStarted",
  "touchMoved",
  "touchEnded",
  "windowResized",
];
const props = defineProps({
  additionalEvents: {
    required: true,
    type: Array as () => Array<string>,
  },
});
const p5Events = computed(() => {
  const { additionalEvents } = props;
  return Array.isArray(additionalEvents)
    ? distinct(initialEvents.concat(additionalEvents))
    : initialEvents;
});
const emit = defineEmits<{
  (event: "sketch", sketchOjb: any[]): void;
}>();
const canvas = ref<HTMLElement>();
onMounted(() => {
  new P5((sketch: any[]) => {
    emit("sketch", sketch);
    for (const p5EventName of p5Events.value) {
      const vueEventName = p5EventName.toLowerCase();
      // @ts-ignore
      const savedCallback = sketch[p5EventName];
      // @ts-ignore
      sketch[p5EventName] = (...args: any) => {
        if (savedCallback) {
          savedCallback(sketch, ...args);
        }
        // @ts-ignore
        emit(vueEventName, sketch, ...args);
      };
    }
  }, canvas.value);
});
</script>
