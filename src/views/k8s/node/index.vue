<template>
  <a-input
    v-model:value="selectedK8sNamespace"
    placeholder="k8s命名空间"
    style="width: 180px"
    @keypress.enter="fetchTableData"
  ></a-input>
  <a-select
    v-model:value="selectedK8sCluster"
    placeholder="请选择K8S集群"
    style="width: 180px"
    :options="selectedK8sClusterOptions"
    @change="fetchTableData"
  ></a-select>

  <a-table :columns="columns" :data-source="tableData">
    <template #actions="{ record }">
      <a-button @click="editAppDataAction(record)">编辑</a-button>
    </template>
  </a-table>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { K8sNodeLis } from "@/api/k8s_node";
import { columns } from "./const/columns";

const selectedAppName = ref();
const selectedK8sNamespace = ref();
const selectedK8sClusterOptions = ref([]);
const selectedK8sCluster = ref();
const tableData = ref([]);
const editdrawerVisible = ref(false); // 控制抽屉 edit的显示和隐藏
const editcurrentRecord = ref(null); // 当前 edit抽屉选中的记录
const adddrawerVisible = ref(false); // 控制抽屉 add的显示和隐藏

// 获取K8S集群选项
async function getK8sClusterOptions() {
  const res = await SysconfigList({ config_key: "k8s_cluster" });
  if (res && res.Data && res.Data.Items) {
    selectedK8sClusterOptions.value = res.Data.Items.map((item) => ({
      value: item.ConfigVal,
      label: item.MarkVal,
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
  let query = { k8s_cluster: selectedK8sCluster.value };

  // 如果应用名和 k8s 命名空间都填写了值，则同时查询这两个条件
  if (selectedAppName.value && selectedK8sNamespace.value) {
    query = {
      ...query,
      service_name: selectedAppName.value,
      namespace: selectedK8sNamespace.value,
    };
  } else {
    // 如果应用名或 k8s 命名空间至少填写了一个值，则查询这个条件
    if (selectedAppName.value) {
      query = { ...query, service_name: selectedAppName.value };
    }
    if (selectedK8sNamespace.value) {
      query = { ...query, namespace: selectedK8sNamespace.value };
    }
  }

  const res = await AppPage(query);

  const appPagedata = res.Data?.Items;

  // 重新设置 tableData ref，将后端返回的数据更新到表格数据中
  tableData.value = appPagedata.map((item) => ({
    ServiceId: item.ServiceId,
    GitlabId: item.GitlabId,
    ServiceName: item.ServiceName,
    Labels: formatLabels(item.Labels),
    Envs: item.Envs,
    Namespace: item.Namespace,
    K8SCluster: item.K8SCluster,
  }));
};

// 编辑按钮点击事件
function editAppDataAction(record) {
  editcurrentRecord.value = record; // 设置当前选中的记录
  editdrawerVisible.value = true; // 打开编辑组件
}

// 添加按钮点击事件
function addAppDataAction(record) {
  adddrawerVisible.value = true; // 打开编辑组件
}

onMounted(() => {
  getK8sClusterOptions();
});
</script>
