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
    <n-card>
      <n-layout>
        <n-layout-header>
          <n-icon size="60">
            <CartSharp />
          </n-icon>
          <n-h1>货物参数与数量</n-h1>
        </n-layout-header>
        <n-layout-content>
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <n-data-table
              ref="table"
              :columns="CargoColumns"
              :data="cargoData"
              :pagination="pagination"
              :row-key="(row) => row.code"
              @update:checked-row-keys="handleCargoCheck"
            />
          </div>
        </n-layout-content>
      </n-layout>
    </n-card>
    <n-modal v-model:show="showCargoModal" :mask-closable="false">
      <n-card>
        <CargoInput
          :init-value="childrenCargoData"
          @formSubmit="onCargoFormDataSubmit"
        />
      </n-card>
    </n-modal>
    <br />
    <br />
    <br />
    <n-space justify="center">
      <n-button @click="send">发送订单</n-button>
      <n-button @click="show">显示效果</n-button>
    </n-space>
  </div>
</template>
<script lang="ts" setup>
const destinationURL = "http://10.128.215.232:8080";
import { ref, h, Ref, reactive } from "vue";
import {
  NDataTable,
  NButton,
  NSpace,
  NCard,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NH1,
  NIcon,
  NModal,
  useNotification,
} from "naive-ui";
import { CarOutline, CartSharp } from "@vicons/ionicons5";
import { ITruckItem } from "../model/truck";
import { RawTruck } from "../model/rawTruckData";
import { RawCargo } from "../model/rawCargoData";
import { IChangeTruckForm } from "../model/changeTruck";
import { IChangeCargoForm } from "../model/changeCargo";
import { ICargoItem } from "../model/cargo";
import { Orientation } from "../model/orientation";
import { TruckSpec } from "../model/truckSpec";
import { CargoSpec } from "../model/cargoSpec";
import { OrderSpec } from "../model/orderSpec";
import { Task } from "../model/task";
import TruckInput from "./truckInput.vue";
import CargoInput from "./cargoInput.vue";
import {
  RowKey,
  TableSelectionColumn,
} from "naive-ui/lib/data-table/src/interface";

// 货车列名称
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
    title: "最大载重",
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
// 货物列名称
const createCargoColumns = (change: (rowData: ICargoItem) => void) => [
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
    title: "货物质量",
    key: "mass",
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

// 将url获得的原始json文件转换位可以用于dataTable的数组
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
function createCargoObj(rawData: RawCargo[]): ICargoItem[] {
  const res: ICargoItem[] = [];
  rawData.forEach((item, index, arr) => {
    console.log(item.availableorientations);
    const newData: ICargoItem = {
      key: index,
      code: item.code,
      name: item.name,
      quantity: 0,
      mass: item.mass,
      length: item.dimension.a,
      width: item.dimension.b,
      hight: item.dimension.c,
      availableOrientation: item.availableorientations,
    };
    res.push(newData);
  });
  return res;
}

const notice = useNotification();
// 货车数据绑定在data，通过url获得的存在dataList里面
const data: Ref<ITruckItem[]> = ref([]);
let dataList: ITruckItem[] = [];

// 货物数据绑定在cargoData，通过url获得的存在cargoDataList里面
const cargoData: Ref<ICargoItem[]> = ref([]);
let cargoDataList: ICargoItem[] = [];

// 异步获取货车数据
const getData = async () => {
  const getTruckTypeURL = destinationURL + "/get-repository";
  const body = JSON.stringify({
    // 获取货车类型信息
    repositoryname: "truck-type-repository",
  });
  await fetch(getTruckTypeURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": destinationURL,
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

// 异步获取货物数据
const getCargoData = async () => {
  const getCargoTypeURL = destinationURL + "/get-repository";
  const body = JSON.stringify({
    // 获取货物类型信息
    repositoryname: "cargo-type-repository",
  });
  await fetch(getCargoTypeURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": destinationURL,
      "Access-Control-Allow-Methods": "GET, POST",
    },
    body: body,
    credentials: "include",
    mode: "cors",
  })
    .then((response) => response.json())
    .then((responseText) => {
      cargoDataList = createCargoObj(responseText.body);
      console.log(cargoDataList);
      cargoData.value = cargoDataList;
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
getCargoData();

const checkedRowKeysRef: Ref<RowKey[]> = ref([]);
// 获得当前页面被选中的货车的index数组
let truckCheckedArr: number[] = [];
const handleCheck = (rowKeys: RowKey[]): number[] => {
  checkedRowKeysRef.value = rowKeys;
  console.log(checkedRowKeysRef.value);
  const indexArr: number[] = [];
  rowKeys.forEach((rowKey) => {
    indexArr.push(
      data.value.findIndex((truckItem) => truckItem.code == rowKey)
    );
  });
  console.log(indexArr);
  truckCheckedArr = indexArr;
  return indexArr;
};
// 获得当前页面被选中的货物的index数组
let cargoCheckedArr: number[] = [];
const handleCargoCheck = (rowKeys: RowKey[]): number[] => {
  checkedRowKeysRef.value = rowKeys;
  console.log(checkedRowKeysRef.value);
  const indexArr: number[] = [];
  rowKeys.forEach((rowKey) => {
    indexArr.push(
      cargoData.value.findIndex((cargoItem) => cargoItem.code == rowKey)
    );
  });
  console.log(indexArr);
  cargoCheckedArr = indexArr;
  return indexArr;
};

// 监听选择完货车数据和货物数据之后整合形成用于发送的body
const setSendBody = (): Task => {
  if (cargoCheckedArr.length > 0 && truckCheckedArr.length > 0) {
    // 货车和货物均check之后方可执行
    console.log(truckCheckedArr);
    console.log(cargoCheckedArr);
    const truckSpecArr: TruckSpec[] = [];
    const cargoSpecArr: CargoSpec[] = [];
    truckCheckedArr.forEach((index) => {
      const newTruckSpec: TruckSpec = {
        code: data.value[index].code,
        amount: data.value[index].quantity,
      };
      truckSpecArr.push(newTruckSpec);
    });
    cargoCheckedArr.forEach((index) => {
      const newCargoSpec: CargoSpec = {
        code: cargoData.value[index].code,
        amount: cargoData.value[index].quantity,
      };
      cargoSpecArr.push(newCargoSpec);
    });
    const orderSpecArr: OrderSpec[] = [
      {
        code: "",
        priority: 1,
        cargospecs: cargoSpecArr,
      },
    ];
    const res: Task = {
      userid: "",
      note: "",
      truckspecs: truckSpecArr,
      orderspecs: orderSpecArr,
    };
    console.log("this is set send body");
    console.log(res);
    return res;
  } else {
    // 否则返回空对象
    const res: Task = {
      userid: "",
      note: "",
      truckspecs: [],
      orderspecs: [],
    };
    return res;
  }
};
let plan = {};
let encode = "";
const send = async () => {
  const sendURL = destinationURL + "/solve";
  const obj = setSendBody();
  const body = JSON.stringify({
    task: obj,
  });
  console.log(body);
  await fetch(sendURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": destinationURL,
      "Access-Control-Allow-Methods": "GET, POST",
    },
    body: body,
    credentials: "include",
    mode: "cors",
  })
    .then((response) => response.json())
    .then((responseText) => {
      console.log(responseText);
      plan = responseText.body;
      console.log(plan);
      console.log(JSON.stringify(plan));
      encode = window.btoa(JSON.stringify(plan));
      console.log(encode);
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
function show() {
  console.log(encode);
  window.open("../../public/3D/index.html?json=" + encode);
}
const showModal = ref(false);
const showCargoModal = ref(false);
// 货车子组件
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
// 货物子组件
const emptyOrientation: Orientation = {
  index: 0,
  bearing: true,
  bearinglevel: 0,
  stackinglimit: 0,
};
const childrenCargoData = reactive({
  key: 0,
  dimension: {
    length: 0,
    width: 0,
    hight: 0,
  },
  mass: 0,
  quantity: 0,
  availableOrientation: [
    emptyOrientation,
    emptyOrientation,
    emptyOrientation,
    emptyOrientation,
    emptyOrientation,
    emptyOrientation,
  ],
});
const columns = createColumns(
  // 定义运行函数，传入当前货车行数据
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
  (data.value[index].hight = form.dimension.hight),
    (data.value[index].width = form.dimension.width),
    (data.value[index].length = form.dimension.length),
    (data.value[index].maxLoad = form.maxLoad);
  data.value[index].quantity = form.quantity;
  showModal.value = false;
};

const CargoColumns = createCargoColumns(
  // 定义运行函数，传入当前货物行数据
  (rowData: ICargoItem) => {
    console.log(rowData);
    childrenCargoData.key = rowData.key;
    childrenCargoData.dimension.hight = rowData.hight;
    childrenCargoData.dimension.width = rowData.width;
    childrenCargoData.dimension.length = rowData.length;
    childrenCargoData.mass = rowData.mass;
    childrenCargoData.quantity = rowData.quantity;
    childrenCargoData.availableOrientation = rowData.availableOrientation;
    showCargoModal.value = true;
  }
);
const onCargoFormDataSubmit = (form: IChangeCargoForm) => {
  console.log(form);
  const index = cargoData.value.findIndex((item) => item.key === form.key);
  (cargoData.value[index].hight = form.dimension.hight),
    (cargoData.value[index].width = form.dimension.width),
    (cargoData.value[index].length = form.dimension.length),
    (cargoData.value[index].mass = form.mass);
  cargoData.value[index].quantity = form.quantity;
  cargoData.value[index].availableOrientation = form.availableOrientation;
  showCargoModal.value = false;
};
const pagination = { pageSize: 10 };
</script>
