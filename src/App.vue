<script setup lang="ts">
import { NNotificationProvider, NMessageProvider } from "naive-ui";
</script>

<template>
  <n-notification-provider>
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
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
