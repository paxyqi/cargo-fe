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
  useNotification,
} from "naive-ui";
import { CarOutline } from "@vicons/ionicons5";
import { ITruckItem } from "../model/truck";
import { RawTruck } from "../model/rawTruckData";
import { IChangeTruckForm } from "../model/changeTruck";
import TruckInput from "./TruckInput.vue";
import {
  RowKey,
  TableSelectionColumn,
} from "naive-ui/lib/data-table/src/interface";
const createColumns = (change: (rowData: ITruckItem) => void) => [
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
    title: "长",
    key: "length",
  },
  {
    title: "宽",
    key: "width",
  },
  {
    title: "高",
    key: "hight",
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
    render(row: ITruckItem) {
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

// eslint-disable-next-line require-jsdoc
function createTruckObj(rawData: RawTruck[]): ITruckItem[] {
  const res: ITruckItem[] = [];
  rawData.forEach((item, index, arr) => {
    const newData: ITruckItem = {
      key: index,
      code: item.code,
      name: item.name,
      quantity: 0,
      maxLoad: item.maxload,
      length: item.dimension.a,
      width: item.dimension.b,
      hight: item.dimension.c,
    };
    res.push(newData);
  });
  return res;
}
const notice = useNotification();
let dataList: ITruckItem[] = [];
const data: Ref<ITruckItem[]> = ref([]);
const getData = async () => {
  const getTruckTypeURL = "http://10.128.226.201:8080/get-repository";
  const body = JSON.stringify({
    // 获取货车类型信息
    repositoryname: "truck-type-repository",
  });
  await fetch(getTruckTypeURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://10.128.226.201",
      "Access-Control-Allow-Methods": "GET, POST",
    },
    body: body,
    credentials: "include",
    mode: "cors",
  })
    .then((response) => response.json())
    .then((responseText) => {
      dataList = createTruckObj(responseText.body);
      console.log(dataList);
      data.value = dataList;
    })
    .catch((e) => {
      notice.create({
        title: "错误",
        content: e.toString(),
        duration: 10000,
        type: "error",
      });
    });
};
// 页面启动时自动运行获取数据的函数
getData();
const checkedRowKeysRef: Ref<RowKey[]> = ref([]);
const handleCheck = (rowKeys: RowKey[]) => {
  checkedRowKeysRef.value = rowKeys;
};
const showModal = ref(false);
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
  (rowData: ITruckItem) => {
    console.log(rowData);
    childrenData.key = rowData.key;
    childrenData.dimension.hight = rowData.hight;
    childrenData.dimension.width = rowData.width;
    childrenData.dimension.length = rowData.length;
    childrenData.maxLoad = rowData.maxLoad;
    childrenData.quantity = rowData.quantity;
    showModal.value = true;
  }
);
const onFormDataSubmit = (form: IChangeTruckForm) => {
  console.log(form);
  const index = data.value.findIndex((item) => item.key === form.key);
  data.value[index].hight = form.dimension.hight,
  data.value[index].width = form.dimension.width,
  data.value[index].length = form.dimension.length,
  data.value[index].maxLoad = form.maxLoad;
  data.value[index].quantity = form.quantity;
  showModal.value = false;
};
const pagination = { pageSize: 10 };
</script>
