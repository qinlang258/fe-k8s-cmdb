<template>
  <a-select
    v-model:value="selectedK8sCluster"
    placeholder="请选择K8S集群"
    style="width: 180px"
    :options="selectedK8sClusterOptions"
    @change="fetchTableData"
  ></a-select>

  <a-table
    :columns="columns"
    :data-source="tableData"
    :row-key="(record) => record.Name"
    :pagination="pagination"
    @change="handleTableChange"
  >
    <template #actions="{ record }">
      <a-button @click="detailDataAction(record)">查看详情</a-button>
    </template>
  </a-table>

  <DetailComponent
    v-if="detaildrawerVisible"
    @close="detaildrawerVisible = false"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { K8sNodeLis, K8sNodeDescribe } from "@/api/k8s_node";
import { SysconfigList } from "@/api/system";
import { columns } from "./const/columns";
import DetailComponent from "./components/detail.vue";

const selectedK8sClusterOptions = ref([]);
const selectedK8sCluster = ref();
const tableData = ref([]);
const detaildrawerVisible = ref(false); // 控制抽屉 edit的显示和隐藏

// 获取K8S集群选项
async function getK8sClusterOptions() {
  const res = await SysconfigList({ config_key: "k8s_cluster" });
  console.log(res.value);
  if (res && res.Data && res.Data.Items) {
    selectedK8sClusterOptions.value = res.Data.Items.map((item) => ({
      value: item.configVal,
      label: item.markVal,
    }));
  }
}

// 更新表格数据
const fetchTableData = async () => {
  await getTableData();
};

// 格式化标签数据
function formatLabels(labels) {
  const parsedLabels = JSON.parse(labels);
  return Object.entries(parsedLabels)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
}

// 获取表格数据
const getTableData = async () => {
  let query = {};

  if (selectedK8sCluster.value) {
    query = { ...query, k8s_cluster: selectedK8sCluster.value };
  }

  const res = await K8sNodeLis(query);

  const appPagedata = res.Data?.Items;

  // 重新设置 tableData ref，将后端返回的数据更新到表格数据中
  tableData.value = appPagedata.map((item) => ({
    Name: item.Name,
    Status: item.Status,
    CreationTimestamp: item.CreationTimestamp,
    Version: item.Version,
    Address: item.Address,
    OsImage: item.OsImage,
    KernelVersion: item.KernelVersion,
    ContainerRuntime: item.ContainerRuntime,
  }));
};

// 添加按钮点击事件
function detailDataAction(record) {
  detaildrawerVisible.value = true; // 打开详细页面
}

// 更新表格数据
const handleTableChange = async (updatedPagination) => {
  // 更新当前页码和每页条数
  pagination.value = updatedPagination;

  await fetchTableData();
};

onMounted(() => {
  getK8sClusterOptions();
});
</script>
