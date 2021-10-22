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
          <n-input-number v-model:value="formValue.dimension.length" />
        </n-form-item>
        <n-form-item label="宽度" path="dimension.width">
          <n-input-number v-model:value="formValue.dimension.width" />
        </n-form-item>
        <n-form-item label="高度" path="dimension.hight">
          <n-input-number v-model:value="formValue.dimension.hight" />
        </n-form-item>
        <n-form-item label="重量" path="mass">
          <n-input-number v-model:value="formValue.mass" />
        </n-form-item>
        <n-form-item
          v-if="size >= 1"
          label="①朝向能否堆叠"
          path="availableOrientation[0].bearing"
        >
          <n-switch v-model:value="formValue.availableOrientation[0].bearing" />
        </n-form-item>
        <n-form-item
          v-if="size >= 1"
          label="①朝向承受极限"
          path="availableOrientation[0].bearinglevel"
        >
          <n-input-number
            v-model:value="formValue.availableOrientation[0].bearinglevel"
          />
        </n-form-item>
        <n-form-item
          v-if="size >= 1"
          label="①朝向堆叠极限"
          path="availableOrientation[0].stackinglimit"
        >
          <n-input-number
            v-model:value="formValue.availableOrientation[0].stackinglimit"
          />
        </n-form-item>
        <n-form-item
          v-if="size >= 2"
          label="②朝向能否堆叠"
          path="availableOrientation[1].bearing"
        >
          <n-switch v-model:value="formValue.availableOrientation[1].bearing" />
        </n-form-item>
        <n-form-item
          v-if="size >= 2"
          label="②朝向承受极限"
          path="availableOrientation[1].bearinglevel"
        >
          <n-input-number
            v-model:value="formValue.availableOrientation[1].bearinglevel"
          />
        </n-form-item>
        <n-form-item
          v-if="size >= 2"
          label="②朝向堆叠极限"
          path="availableOrientation[1].stackinglimit"
        >
          <n-input-number
            v-model:value="formValue.availableOrientation[1].stackinglimit"
          />
        </n-form-item>
        <n-form-item
          v-if="size >= 3"
          label="③朝向能否堆叠"
          path="availableOrientation[2].bearing"
        >
          <n-switch v-model:value="formValue.availableOrientation[2].bearing" />
        </n-form-item>
        <n-form-item
          v-if="size >= 3"
          label="③朝向承受极限"
          path="availableOrientation[2].bearinglevel"
        >
          <n-input-number
            v-model:value="formValue.availableOrientation[2].bearinglevel"
          />
        </n-form-item>
        <n-form-item
          v-if="size >= 3"
          label="③朝向堆叠极限"
          path="availableOrientation[2].stackinglimit"
        >
          <n-input-number
            v-model:value="formValue.availableOrientation[2].stackinglimit"
          />
        </n-form-item>
        <n-form-item
          v-if="size >= 4"
          label="④朝向能否堆叠"
          path="availableOrientation[3].bearing"
        >
          <n-switch v-model:value="formValue.availableOrientation[3].bearing" />
        </n-form-item>
        <n-form-item
          v-if="size >= 4"
          label="④朝向承受极限"
          path="availableOrientation[3].bearinglevel"
        >
          <n-input-number
            v-model:value="formValue.availableOrientation[3].bearinglevel"
          />
        </n-form-item>
        <n-form-item
          v-if="size >= 4"
          label="④朝向堆叠极限"
          path="availableOrientation[3].stackinglimit"
        >
          <n-input-number
            v-model:value="formValue.availableOrientation[3].stackinglimit"
          />
        </n-form-item>
        <n-form-item
          v-if="size >= 5"
          label="⑤朝向能否堆叠"
          path="availableOrientation[4].bearing"
        >
          <n-switch v-model:value="formValue.availableOrientation[4].bearing" />
        </n-form-item>
        <n-form-item
          v-if="size >= 5"
          label="⑤朝向承受极限"
          path="availableOrientation[4].bearinglevel"
        >
          <n-input-number
            v-model:value="formValue.availableOrientation[4].bearinglevel"
          />
        </n-form-item>
        <n-form-item
          v-if="size >= 5"
          label="⑤朝向堆叠极限"
          path="availableOrientation[4].stackinglimit"
        >
          <n-input-number
            v-model:value="formValue.availableOrientation[4].stackinglimit"
          />
        </n-form-item>
        <n-form-item
          v-if="size >= 6"
          label="⑥朝向能否堆叠"
          path="availableOrientation[5].bearing"
        >
          <n-switch v-model:value="formValue.availableOrientation[5].bearing" />
        </n-form-item>
        <n-form-item
          v-if="size >= 6"
          label="⑥朝向承受极限"
          path="availableOrientation[5].bearinglevel"
        >
          <n-input-number
            v-model:value="formValue.availableOrientation[5].bearinglevel"
          />
        </n-form-item>
        <n-form-item
          v-if="size >= 6"
          label="⑥朝向堆叠极限"
          path="availableOrientation[5].stackinglimit"
        >
          <n-input-number
            v-model:value="formValue.availableOrientation[5].stackinglimit"
          />
        </n-form-item>
        <n-form-item label="数量" path="quantity">
          <n-input-number v-model:value="formValue.quantity" />
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
  NSwitch,
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
console.log(formValue.value.availableOrientation[0]);
// 获取方向负载极限的个数
const size = formValue.value.availableOrientation.length;
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
