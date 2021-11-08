<style>
.bg {
  background-color: rgb(203, 223, 232, 0.2);
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
</style>
<template>
  <div class="bg">
    <n-space vertical>
      <n-layout
        position="absolute"
        style="
          margin-top: 10%;
          left: 15%;
          right: 15%;
          background-color: rgb(203, 223, 232, 0.1);
        "
      >
        <n-tabs type="segment" @update:value="headerSiderSelect">
          <n-tab-pane name="dataList" tab="业务数据"></n-tab-pane>
          <n-tab-pane name="userList" tab="用户信息"></n-tab-pane>
          <n-tab-pane name="history" tab="历史订单"></n-tab-pane>
        </n-tabs>
        <!-- <n-layout-header
          bordered
          content-style="padding: 12px;"
          dropdown-placement="left-start"
        >
          <n-menu
            mode="horizontal"
            :options="menuHeadOptions"
            :on-update:value="headerSiderSelect"
          />
        </n-layout-header> -->
        <n-layout-content>
          <n-layout has-sider>
            <n-layout-sider bordered content-style="padding: 20px;">
              <n-menu
                :options="menuOptions"
                :on-update:value="siderSelect"
              ></n-menu>
            </n-layout-sider>
            <n-layout-content>
              <n-layout has-sider sider-placement="right">
                <n-layout-content>
                  <n-card v-if="siderShowTruck && showData" embedded>
                    <n-layout>
                      <n-layout-header>
                        <n-icon size="60">
                          <CarOutline />
                        </n-icon>
                        <n-h1>货车参数与数量</n-h1>
                      </n-layout-header>
                      <n-layout-content>
                        <div
                          style="
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                          "
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
                  <n-card v-if="siderShowCargo && showData" embedded>
                    <n-layout>
                      <n-layout-header>
                        <n-icon size="60">
                          <CartSharp />
                        </n-icon>
                        <n-h1>货物参数与数量</n-h1>
                      </n-layout-header>
                      <n-layout-content>
                        <div
                          style="
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                          "
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
                  <n-card v-if="showUser" embedded>
                    <n-icon size="60">
                      <PersonIcon />
                    </n-icon>
                    <n-h1>用户信息</n-h1>
                    <n-data-table
                      :columns="userInfoList"
                      :data="userInfoListData"
                      :pagination="pagination"
                    ></n-data-table>
                  </n-card>
                  <n-card v-if="showHistory" embedded>
                    <n-icon size="60">
                      <HistoryIcon />
                    </n-icon>
                    <n-h1>历史订单</n-h1>
                    <n-data-table
                      :columns="historyList"
                      :data="historyListData"
                      :pagination="pagination"
                    ></n-data-table>
                  </n-card>
                  <n-modal v-model:show="showModal" :mask-closable="false">
                    <n-card>
                      <truck-input
                        :init-value="childrenData"
                        @formSubmit="onFormDataSubmit"
                      />
                    </n-card>
                  </n-modal>
                  <n-modal v-model:show="showCargoModal" :mask-closable="false">
                    <n-card>
                      <CargoInput
                        :init-value="childrenCargoData"
                        @formSubmit="onCargoFormDataSubmit"
                      />
                    </n-card>
                  </n-modal>
                  <n-modal v-model:show="show3DModal">
                    <n-card>
                      <Show :init-value="showEncodeData" />
                    </n-card>
                  </n-modal>
                </n-layout-content>
                <n-layout-sider
                  bordered
                  show-trigger
                  collapse-mode="width"
                  :collapsed-width="12"
                  :width="480"
                  :native-scrollbar="false"
                  content-style="padding: 24px;"
                  v-if="showData"
                >
                  <n-h1>当前订单</n-h1>
                  <!-- 右侧的边栏用于显示list -->
                  <n-data-table
                    :columns="orderListColumns"
                    :data="orderListData"
                    :pagination="pagination"
                  ></n-data-table>
                  <n-space justify="center" v-if="showData">
                    <n-button @click="send">发送订单</n-button>
                    <!-- <n-button @click="show">显示效果</n-button> -->
                  </n-space>
                </n-layout-sider>
              </n-layout>
            </n-layout-content>
          </n-layout>
        </n-layout-content>
      </n-layout>
    </n-space>
  </div>
</template>
<script lang="ts" setup>
const destinationURL = "http://10.112.238.172:8080";
import { ref, h, Ref, reactive } from "vue";
import {
  NDataTable,
  NButton,
  NSpace,
  NCard,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NH1,
  NIcon,
  NModal,
  NMenu,
  NTabs,
  NTabPane,
  useNotification,
} from "naive-ui";
import {
  CarOutline,
  CartSharp,
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  TimerOutline as HistoryIcon,
  // ImagesOutline as ImageIcon,
} from "@vicons/ionicons5";
import { ITruckItem } from "../model/truck";
import { IOrderList } from "../model/orderList";
import { RawTruck } from "../model/rawTruckData";
import { UserInfo } from "../model/userInfo";
import { RawCargo } from "../model/rawCargoData";
import { IChangeTruckForm } from "../model/changeTruck";
import { IChangeCargoForm } from "../model/changeCargo";
import { ICargoItem } from "../model/cargo";
import { Orientation } from "../model/orientation";
import { TruckSpec } from "../model/truckSpec";
import { CargoSpec } from "../model/cargoSpec";
import { OrderSpec } from "../model/orderSpec";
import { IHistoryList } from "../model/historyList";
import { Task } from "../model/task";
import TruckInput from "./truckInput.vue";
import CargoInput from "./cargoInput.vue";
import Show from "./show.vue";
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
const orderListColumns = [
  {
    title: "货车与货物编码",
    key: "code",
  },
  {
    title: "数量",
    key: "amount",
  },
];
const userInfoList = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "姓名",
    key: "name",
  },
  {
    title: "密码",
    key: "password",
  },
];
const historyList = [
  {
    title: "方案ID",
    key: "id",
  },
  {
    title: "订单ID",
    key: "taskid",
  },
  {
    title: "花费时间",
    key: "timecost",
  },
  {
    title: "查看结果",
    key: "run",
    render(row: IHistoryList) {
      return h(
        // 渲染函数
        NButton,
        {
          // 通过h函数创建虚拟NButton节点
          size: "small",
          onClick: () => {
            plan = row;
            // console.log(plan);
            // console.log(JSON.stringify(plan));
            show3DModal.value = true;
            encode = window.btoa(JSON.stringify(plan));
            showEncodeData.showEncode = encode;
          },
        },
        { default: () => "结果展示" }
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
      name: "111",
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
      name: "111",
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

const orderListData: Ref<IOrderList[]> = ref([]);

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
    // 以上获取了选择的数据， 应当直接展示在右侧侧边栏
    orderListData.value = truckSpecArr.concat(cargoSpecArr);
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

// 3D展示子组件
const showEncodeData = reactive({
  showEncode: "",
});

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
      show3DModal.value = true;
      encode = window.btoa(JSON.stringify(plan));
      showEncodeData.showEncode = encode;
      console.log(showEncodeData.showEncode);
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
// function show() {
//   console.log(encode);
//   window.open("../../public/3D/index.html?json=" + encode);
// }
const showModal = ref(false);
const showCargoModal = ref(false);
const show3DModal = ref(false);

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

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const menuOptions = [
  {
    label: "货车",
    key: "chooseTruck",
    icon: renderIcon(BookIcon),
  },
  {
    label: "货物",
    key: "chooseCargo",
    icon: renderIcon(BookIcon),
  },
  // {
  //   label: "方案",
  //   key: "show",
  //   icon: renderIcon(ImageIcon),
  // },
];
// const menuHeadOptions = [
//   {
//     label: () =>
//       h(NButton, { onClick: () => {} }, { default: () => "业务数据" }),
//     key: "dataList",
//     icon: renderIcon(DataIcon),
//   },
//   {
//     label: () =>
//       h(
//         NButton,
//         {
//           onClick: () => getUserList(),
//         },
//         { default: () => "用户信息" }
//       ),
//     key: "userList",
//     icon: renderIcon(PersonIcon),
//   },
//   {
//     label: () =>
//       h(
//         NButton,
//         {
//           onClick: () => getHistoryList(),
//         },
//         { default: () => "历史订单" }
//       ),
//     key: "history",
//     icon: renderIcon(HistoryIcon),
//   },
// ];
// 刚进入页面时显示选择货物的页面，选择货车的页面为false
const siderShowCargo = ref(false);
const siderShowTruck = ref(true);
const showData = ref(true);
const showUser = ref(false);
const showHistory = ref(false);
const siderSelect = (key: string) => {
  if (key === "chooseTruck") {
    siderShowTruck.value = true;
    siderShowCargo.value = false;
  }
  if (key === "chooseCargo") {
    siderShowTruck.value = false;
    siderShowCargo.value = true;
  }
  console.log(siderShowTruck);
  console.log(siderShowCargo);
};
const headerSiderSelect = (key: string) => {
  if (key === "dataList") {
    showData.value = true;
    showUser.value = false;
    showHistory.value = false;
  }
  if (key === "userList") {
    showData.value = false;
    showUser.value = true;
    showHistory.value = false;
    getUserList();
  }
  if (key === "history") {
    showData.value = false;
    showUser.value = false;
    showHistory.value = true;
    getHistoryList();
  }
};
let historyPlan = [];
const historyListData: Ref<IHistoryList[]> = ref([]);
const getHistoryList = async () => {
  const getHistoryURL = destinationURL + "/get-repository";
  const body = JSON.stringify({
    // 获取历史订单
    repositoryname: "plan-repository",
  });
  await fetch(getHistoryURL, {
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
      historyPlan = responseText.body;
      historyListData.value = responseText.body;
      console.log(historyPlan);
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
const userInfoListData: Ref<UserInfo[]> = ref([]);
const getUserList = async () => {
  const getUserURL = destinationURL + "/get-repository";
  const body = JSON.stringify({
    // 获取用户名单
    repositoryname: "user-repository",
  });
  await fetch(getUserURL, {
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
      userInfoListData.value = responseText.body;
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
</script>
<style module>
.n-layout {
  margin-top: 20%;
}
</style>
