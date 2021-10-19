// 此为货车选择页的子组件，用于修改某个货车的参数
<template>
  <div>
    <n-space justify="center">
      <n-icon size="60"> <ListCircleOutline /> </n-icon>
    </n-space>
    <br />
    <br />
    <n-space justify="center">
      <n-form
        label-width="80%"
        :model="formValue"
        size="large"
        ref="formRef"
        label-placement="left"
        show-require-mark
      >
        <n-form-item label="长度" rule-path="dimension.length">
          <n-input-number
            v-model:value="formValue.dimension.length"
            placeholder="输入货车车厢长度"
          />
        </n-form-item>
        <n-form-item label="宽度" path="dimension.width">
          <n-input-number
            placeholder="输入货车车厢宽度"
            v-model:value="formValue.dimension.width"
          />
        </n-form-item>
        <n-form-item label="高度" path="dimension.hight">
          <n-input-number
            placeholder="输入货车车厢高度"
            v-model:value="formValue.dimension.hight"
          />
        </n-form-item>
        <n-form-item label="负载" path="maxLoad">
          <n-input-number
            placeholder="输入货车最大负载"
            v-model:value="formValue.maxLoad"
          />
        </n-form-item>
        <n-form-item label="数量" path="quantity">
          <n-input-number
            placeholder="输入该种货车数量"
            v-model:value="formValue.quantity"
          />
        </n-form-item>
        <n-form-item>
          <div class="checkButton">
            <n-button @click="check" type="primary">确认</n-button>
          </div>
        </n-form-item>
      </n-form>
    </n-space>
    <!-- <p>
      {{ JSON.stringify(initValue) }}
    </p> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "vue";
import { IChangeTruckForm } from "../model/changeTruck";
import {
  NForm,
  NFormItem,
  NInputNumber,
  NButton,
  NSpace,
  NIcon,
  NH1,
  NLayout,
  NCard,
} from "naive-ui";
import { ListCircleOutline } from "@vicons/ionicons5";
const formRef = ref(null);
const props = defineProps({
  initValue: {
    required: true,
    type: Object as () => IChangeTruckForm,
  },
});
const { initValue } = toRefs(props);
const formValue = ref(initValue);
const emit = defineEmits<{
  (event: "formSubmit", form: IChangeTruckForm): void;
}>();
const check = () => {
  emit("formSubmit", formValue.value);
};
</script>
<style>
.checkButton {
  display: flex;
  justify-content: flex-end;
}
</style>
