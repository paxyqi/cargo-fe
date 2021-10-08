<template>
  <div>
    <n-radio-group
      v-model:value="size"
      name="left-size"
      style="margin-bottom: 12px"
    >
      <n-radio-button value="small">小</n-radio-button>
      <n-radio-button value="medium">中</n-radio-button>
      <n-radio-button value="large">大</n-radio-button>
    </n-radio-group>
    <n-form
      inline
      :label-width="80"
      :model="formValue"
      :rules="rules"
      :size="size"
      ref="formRef"
    >
      <n-form-item label="姓名" path="user.name">
        <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
      </n-form-item>
      <n-form-item label="年龄" path="user.age">
        <n-input placeholder="输入年龄" v-model:value="formValue.user.age" />
      </n-form-item>
      <n-form-item label="电话号码" path="phone">
        <n-input placeholder="电话号码" v-model:value="formValue.phone" />
      </n-form-item>
      <n-form-item>
        <n-button @click="handleValidateClick" attr-type="button"
          >验证</n-button
        >
      </n-form-item>
    </n-form>

    <pre>
  {{ JSON.stringify(formValue) }}
  </pre
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import {
  useMessage,
  NForm,
  NFormItem,
  NRadioGroup,
  NInput,
  NRadioButton,
  NButton,
} from "naive-ui";

export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NRadioGroup,
    NInput,
    NRadioButton,
    NButton,
  },
  setup() {
    const formRef: Ref<any> = ref(null);
    const message = useMessage();
    const size: Ref<"small" | "medium" | "large"> = ref("medium");
    return {
      formRef,
      size,
      formValue: ref({
        user: {
          name: "",
          age: "",
        },
        phone: "",
      }),
      rules: {
        user: {
          name: {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
          age: {
            required: true,
            message: "请输入年龄",
            trigger: ["input", "blur"],
          },
        },
        phone: {
          required: true,
          message: "请输入电话号码",
          trigger: ["input"],
        },
      },
      handleValidateClick() {
        formRef.value.validate((errors: Error) => {
          if (!errors) {
            message.success("Valid");
          } else {
            console.log(errors);
            message.error("Invalid");
          }
        });
      },
    };
  },
});
</script>
