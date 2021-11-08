<script setup lang="ts">
import {
  NNotificationProvider,
  NMessageProvider,
  NThemeEditor,
  NConfigProvider,
} from "naive-ui";
const themeOverrides = {
  common: {
    primaryColor: "#51A8DDFF",
    primaryColorHover: "#7DB9DEFF",
    primaryColorPressed: "#2B5F75FF",
    primaryColorSuppl: "#3A8FB7FF",
    baseColor: "#FFF",
    tableColorHover: "rgba(0, 0, 100, 0.02)",
    bodyColor: "#fff",
    modalColor: "#fff",
    cardColor: "#fff",
    tableColor: "#fff",
    popoverColor: "#fff",
    tagColor: "rgb(250, 250, 252)",
    avatarColor: "rgba(204, 204, 204, 1)",
  },
  Tabs: {
    tabColorSegment: "#CBDFE8FF",
  },
};
</script>

<template>
  <n-theme-editor>
    <n-config-provider :theme-overrides="themeOverrides">
      <n-notification-provider>
        <n-message-provider>
          <router-view style="min-height: max-content"></router-view>
        </n-message-provider>
      </n-notification-provider>
    </n-config-provider>
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
