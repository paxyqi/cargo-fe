<template>
  <div>
    <n-card>
      <n-layout>
        <n-layout-header>
          <img alt="list logo" src=".././assets/list.png"
        /></n-layout-header>
        <n-layout-content content-style="padding: 24px;">
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <n-data-table
              :columns="columns"
              :data="data"
              size="large"
              style="width: 60%"
            />
          </div>
        </n-layout-content>
      </n-layout>
    </n-card>
    <n-modal v-model:show="showModal" :mask-closable="false">
      <n-card>
        <truck-input
          :init-value="childrenData"
          @onFormDataSubmit="onFormDataSubmit"
        />
      </n-card>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from "vue";
import {
  NDataTable,
  NButton,
  NCard,
  NLayout,
  NLayoutHeader,
  NModal,
  NLayoutContent,
} from "naive-ui";
import { ICargoItem } from "../model/cargo";
import TruckInput from "./TruckInput.vue";
import { IChangeCargoForm } from "../model/changeCargo";
const createColumns = (run: (rowData: ICargoItem) => void) => {
  return [
    {
      title: "编码",
      key: "code",
    },
    {
      title: "别名",
      key: "name",
    },
    {
      title: "长宽高",
      key: "dimension",
    },
    {
      title: "最大载荷",
      key: "maxLoad",
    },
    {
      title: "修改",
      key: "Run",
      render(row: ICargoItem) {
        return h(
          // 渲染函数
          NButton,
          {
            // 通过h函数创建虚拟NButton节点
            size: "small",
            onClick: () => run(row),
          },
          { default: () => "修改参数" }
        );
      },
    },
  ];
};
const createData: () => Partial<ICargoItem>[] = () => [
  {
    key: 0,
    code: "1",
    name: "1",
    dimension: [1, 2, 3],
    maxLoad: 314,
  },
  {
    key: 1,
    code: "2",
    name: "2",
    dimension: [1, 2, 3],
    maxLoad: 614,
  },
  {
    key: 2,
    code: "3",
    name: "3",
    dimension: [1, 2, 3],
    maxLoad: 914,
  },
];
const showModal = ref(false);
const data = ref(createData());
const childrenData = reactive({
  key: 0,
  dimension: {
    length: 0,
    width: 0,
    hight: 0,
  },
  maxLoad: 0,
  quantity: 0,
});
const columns = createColumns(
  // 定义运行函数，传入当前行数据
  (rowData: ICargoItem) => {
    console.log(rowData);
    childrenData.key = rowData.key;
    childrenData.dimension.hight = rowData.dimension[0];
    childrenData.dimension.width = rowData.dimension[1];
    childrenData.dimension.length = rowData.dimension[2];
    childrenData.maxLoad = rowData.maxLoad;
    childrenData.quantity = rowData.quantity;
    showModal.value = true;
  }
);
const onFormDataSubmit = (form: IChangeCargoForm) => {
  console.log(form);
  const index = data.value.findIndex((item) => item.key === form.key);
  data.value[index].dimension = [
    form.dimension.hight,
    form.dimension.width,
    form.dimension.length,
  ];
  data.value[index].maxLoad = form.maxLoad;
  data.value[index].quantity = form.quantity;
  showModal.value = false;
};
</script>
