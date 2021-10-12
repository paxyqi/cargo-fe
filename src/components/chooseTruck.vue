<template>
  <div>
    <n-card>
      <n-layout>
        <n-layout-header>
          <n-icon size="60">
            <CarOutline />
          </n-icon>
          <n-h1>货车参数与数量</n-h1>
        </n-layout-header>
        <n-layout-content>
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <n-data-table
              ref="table"
              :columns="columns"
              :data="data"
              :pagination="pagination"
              :row-key="(row) => row.code"
              @update:checked-row-keys="handleCheck"
            />
          </div>
        </n-layout-content>
      </n-layout>
    </n-card>
    <n-modal v-model:show="showModal" :mask-closable="false">
      <n-card>
        <truck-input
          :init-value="childrenData"
          @formSubmit="onFormDataSubmit"
        />
      </n-card>
    </n-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref, h, Ref, reactive } from "vue";
import {
  NDataTable,
  NButton,
  NCard,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NH1,
  NIcon,
  NModal,
} from "naive-ui";
import { CarOutline } from "@vicons/ionicons5";
import { ICargoItem } from "../model/cargo";
import { IChangeCargoForm } from "../model/changeCargo";
import TruckInput from "./TruckInput.vue";
import {
  RowKey,
  TableSelectionColumn,
} from "naive-ui/lib/data-table/src/interface";
const createColumns = (change: (rowData: ICargoItem) => void) => [
  {
    type: "selection",
  } as TableSelectionColumn,
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
    title: "数量",
    key: "quantity",
  },
  {
    title: "更改",
    key: "change",
    render(row: ICargoItem) {
      return h(
        // 渲染函数
        NButton,
        {
          // 通过h函数创建虚拟NButton节点
          size: "small",
          onClick: () => change(row),
        },
        { default: () => "修改参数" }
      );
    },
  },
];

const createData: () => Partial<ICargoItem>[] = () => [
  {
    key: 0,
    code: "1",
    name: "小红",
    dimension: [1, 2, 3],
    quantity: 0,
    maxLoad: 314,
  },
  {
    key: 1,
    code: "2",
    quantity: 0,
    name: "旺财",
    dimension: [1, 2, 3],
    maxLoad: 614,
  },
  {
    key: 2,
    code: "3",
    quantity: 0,
    name: "来福",
    dimension: [1, 2, 3],
    maxLoad: 914,
  },
];
const checkedRowKeysRef: Ref<RowKey[]> = ref([]);
const handleCheck = (rowKeys: RowKey[]) => {
  checkedRowKeysRef.value = rowKeys;
};
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
const pagination = { pageSize: 10 };
</script>
