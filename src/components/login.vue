<style>
.input {
  text-align: left;
}
</style>
<template>
  <div>
    <h1>最优装载系统</h1>
    <img alt="Vue logo" src=".././assets/cargo.png" />
    <n-space justify="center">
      <n-card>
        <n-tabs default-value="signin" size="medium">
          <n-tab-pane name="signin" tab="登录">
            <n-form>
              <n-form-item-row label="用户名">
                <n-input
                  v-model:value="userName"
                  type="text"
                  placeholder="请输入用户名"
                  class="input"
                />
              </n-form-item-row>
              <n-form-item-row label="密码">
                <n-input
                  class="input"
                  type="password"
                  v-model:value="passwd"
                  show-password-on="mousedown"
                  placeholder="请输入密码"
                ></n-input>
              </n-form-item-row>
            </n-form>
            <n-button type="primary" block @click="login">登录</n-button>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  NButton,
  NInput,
  NSpace,
  NCard,
  NFormItemRow,
  NForm,
  NTabPane,
  useNotification,
  NTabs,
} from "naive-ui";
import { useRouter } from "vue-router";
const router = useRouter();
const userName = ref("");
const passwd = ref("");
const notice = useNotification();
const login = async () => {
  console.log(userName.value, passwd.value);
  const data = JSON.stringify({
    // 整合登录信息
    user_name: userName.value,
    pass_word: passwd.value,
  });
  const loginURL = "http://10.128.226.201:8080";
  await fetch(loginURL, {
    // 发送请求
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://10.128.226.201",
      "Access-Control-Allow-Methods": "GET, POST",
    },
    credentials: "include",
    body: data,
    mode: "cors",
  })
    .then((response) => {
      if (response.status === 200) {
        router.push({ path: "/chooseTruck" });
      }
    })
    .catch((e) => {
      notice.create({
        title: "错误",
        content: e.toString(),
        duration: 5000,
        type: "error",
      });
    });
};
</script>
