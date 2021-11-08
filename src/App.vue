<script setup lang="ts">
import {
  NNotificationProvider,
  NMessageProvider,
  NThemeEditor,
} from "naive-ui";
</script>

<template>
  <n-theme-editor>
    <n-notification-provider>
      <n-message-provider>
        <router-view style="min-height: max-content"></router-view>
      </n-message-provider>
    </n-notification-provider>
  </n-theme-editor>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
