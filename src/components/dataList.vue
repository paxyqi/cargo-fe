<template>
  <n-card>
    <n-layout>
      <n-layout-header>
        <img alt="list logo" src=".././assets/list.png"
      /></n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <div style="display: flex; flex-direction: column; align-items: center">
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
</template>

<script lang="ts" setup>
import { h } from "vue";
import {
  NDataTable,
  NButton,
  NCard,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
} from "naive-ui";
import { ICargoItem } from "../model/cargo";
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

const data = createData();
const columns = createColumns(
  // 定义运行函数，传入当前行数据
  (rowData: ICargoItem) => {
    console.log(rowData.code);
  }
);
</script>
