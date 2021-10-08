<template>
  <div>
    <h1>添加货物</h1>
    <n-space justify="center">
      <n-dynamic-input
        v-model:value="customValue"
        :on-create="onCreate"
        #="{ value }"
        ><div style="width: 100%">
          <div style="display: flex; align-items: center">
            <n-checkbox
              v-model:checked="value.isCheck"
              style="margin-right: 12px"
            />
            <n-input-number
              v-model:value="value.num"
              style="margin-right: 12px; width: 160px"
            />
            <n-input
              v-model:value="value.No"
              placeholder="请输入货物编号"
              type="text"
            />
          </div>
        </div>
      </n-dynamic-input>
    </n-space>
    <pre>
    {{ JSON.stringify(customValue) }}
    </pre>
  </div>
</template>

<script lang="ts" setup>
import {
  NSpace,
  NDynamicInput,
  NCheckbox,
  NInputNumber,
  NInput,
} from "naive-ui";
import { ref } from "vue";
const customValue = ref([
  {
    isCheck: true,
    num: 1,
    No: 1,
  },
]);
const onCreate = () => {
  return {
    isCheck: false,
    num: 1,
    No: 1,
  };
};
</script>
