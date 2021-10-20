// 此为货物选择页的子组件，用于修改某个货物的参数
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
          />
        </n-form-item>
        <n-form-item label="宽度" path="dimension.width">
          <n-input-number
            v-model:value="formValue.dimension.width"
          />
        </n-form-item>
        <n-form-item label="高度" path="dimension.hight">
          <n-input-number
            v-model:value="formValue.dimension.hight"
          />
        </n-form-item>
        <n-form-item label="重量" path="mass">
          <n-input-number
            v-model:value="formValue.mass"
          />
        </n-form-item>
        <n-form-item label="数量" path="quantity">
          <n-input-number
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
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "vue";
import { IChangeCargoForm } from "../model/changeCargo"; 
import {
  NForm,
  NFormItem,
  NInputNumber,
  NButton,
  NSpace,
  NIcon,
} from "naive-ui";
import { ListCircleOutline } from "@vicons/ionicons5";
const formRef = ref(null);
const props = defineProps({
  initValue: {
    required: true,
    type: Object as () => IChangeCargoForm,
  },
});
const { initValue } = toRefs(props);
const formValue = ref(initValue);
const emit = defineEmits<{
  (event: "formSubmit", form: IChangeCargoForm): void;
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