// 此为货车选择页的子组件，用于修改某个货车的参数
<template>
  <n-form
    :label-width="80"
    :model="formValue"
    :rules="rules"
    :size="'large'"
    ref="formRef"
  >
    <n-form-item label="长度" rule-path="dimension.length">
      <n-input
        v-model:number="formValue.dimension.length"
        placeholder="输入货车车厢长度"
      />
    </n-form-item>
    <n-form-item label="宽度" path="dimension.width">
      <n-input
        placeholder="输入货车车厢宽度"
        v-model:number="formValue.dimension.width"
      />
    </n-form-item>
    <n-form-item label="高度" path="dimension.hight">
      <n-input
        placeholder="输入货车车厢高度"
        v-model:number="formValue.dimension.hight"
      />
    </n-form-item>
    <n-form-item label="负载" path="maxLoad">
      <n-input
        placeholder="输入货车最大负载"
        v-model:number="formValue.maxLoad"
      />
    </n-form-item>
    <n-form-item label="数量" path="quantity">
      <n-input
        placeholder="输入该种货车数量"
        v-model:number="formValue.quantity"
      />
    </n-form-item>
    <n-form-item>
      <n-button @click="check">确认</n-button>
    </n-form-item>
    <!-- <n-form-item>
      <n-button @click="handleValidateClick" attr-type="button">确认</n-button>
    </n-form-item> -->
  </n-form>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import {
  //   useMessage,
  NForm,
  NFormItem,
  NInput,
  NButton,
  //   FormValidationError,
} from "naive-ui";
import { IChangeCargoItem } from "../model/changeCargo";
const formRef = ref(<IChangeCargoItem>{});
// const message = useMessage();
const formValue = ref(<IChangeCargoItem>{});
const rules = {
  dimension: {
    length: {
      required: true,
      message: "请输入货车车厢长度",
      trigger: "blur",
    },
    width: {
      required: true,
      message: "请输入货车车厢宽度",
      trigger: "blur",
    },
    hight: {
      required: true,
      message: "请输入货车车厢高度",
      trigger: "blur",
    },
  },
  maxLoad: {
    required: true,
    message: "请输入货车最大负载",
    trigger: "blur",
  },
  quantity: {
    required: true,
    message: "请输入该种货车数量",
    trigger: "blur",
  },
};
// const handleValidateClick = (e: MouseEvent) => {
//   formRef.value.validate((errors: Array<FormValidationError>) => {
//     if (!errors) {
//       message.success("Valid");
//     } else {
//       console.log(errors);
//       message.error("Invalid");
//     }
//   });
// };
const check = () => {
  console.log(formRef.value);
};
</script>
