<script setup lang="ts">
import { NNotificationProvider } from "naive-ui";
</script>

<template>
  <n-notification-provider>
    <router-view></router-view>
  </n-notification-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
