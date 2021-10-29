<template>
  <Renderer>
    <Camera :position="{ z: 10 }" />
    <Scene>
      <PointLight :position="{ y: 50, z: 50 }" />
      <Box
        :position="{ x: 0, y: 0, z: 0 }"
        :rotation="{ x: 1, y: 2, z: 0 }"
        :scale="{ x: 1, y: 3, z: 1 }"
        :cast-shadow="false"
        :receive-shadow="false"
      >
        <BasicMaterial />
      </Box>
    </Scene>
  </Renderer>
</template>

<script lang="ts" setup>
import {
  Box,
  Camera,
  PointLight,
  Renderer,
  Scene,
  BasicMaterial,
} from "troisjs";
const plan = {
  truckschemes: [
    {
      truckdimension: {
        a: 100,
        b: 300,
        c: 200,
      },
      cargoblocks: [
        {
          cargodimension: {
            a: 30,
            b: 20,
            c: 10,
          },
          basecorner: {
            a: 0,
            b: 0,
            c: 0,
          },
          repeation: {
            a: 1,
            b: 5,
            c: 20,
          },
        },
        {
          cargodimension: {
            a: 30,
            b: 20,
            c: 10,
          },
          basecorner: {
            a: 30,
            b: 0,
            c: 0,
          },
          repeation: {
            a: 1,
            b: 5,
            c: 20,
          },
        },
      ],
    },
    {
      truckdimension: {
        a: 100,
        b: 250,
        c: 200,
      },
      cargoblocks: [
        {
          cargodimension: {
            a: 30,
            b: 20,
            c: 10,
          },
          basecorner: {
            a: 0,
            b: 0,
            c: 0,
          },
          repeation: {
            a: 1,
            b: 5,
            c: 20,
          },
        },
      ],
    },
  ],
};
const colorPool = [
  [0, 0, 0],
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
  [255, 255, 0],
  [255, 0, 255],
  [0, 255, 255],
];
let nextColor = 0;

function pickColor() {
  nextColor = (nextColor + 1) % colorPool.length;
  return colorPool[nextColor];
}
</script>
