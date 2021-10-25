<template>
  <Sketch :additional-events="[]" v-on="{ setup, draw, keypressed }" />
</template>
<script lang="ts" setup>
import p5 from "p5";
import Sketch from "./sketch.vue";
const setup = (p: p5) => {
  p.createCanvas(p.windowWidth, p.windowHeight);
  p.background(0);
};
const draw = (p: p5) => {
  p.background(0);
  p.fill(255);
  p.textSize(32);
  p.text("Hello World", p.width / 2, p.height / 2);
};
const keypressed = (p: p5, key: string) => {
  if (key === "s") {
    console.log("s pressed");
  }
};
</script>
