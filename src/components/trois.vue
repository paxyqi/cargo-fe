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
</script>
