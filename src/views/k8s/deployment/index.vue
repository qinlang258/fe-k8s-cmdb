<template>
  <a-select
    v-model:value="selectedK8sCluster"
    placeholder="请选择K8S集群"
    style="width: 180px"
    :options="selectedK8sClusterOptions"
    @change="fetchNamespaceDataOptions"
  ></a-select>

  <a-select
    v-model:value="selectedNamespace"
    placeholder="请选择Namespace"
    style="width: 180px"
    :options="selectedNamespaceOptions"
    @change="fetchTableData"
  ></a-select>

  <a-button type="primary" @click="resetSelection">重置</a-button>

  <a-table
    :columns="columns"
    :data-source="tableData"
    :row-key="(record) => record.Name"
  >
    <template #actions="{ record }">
      <a-button @click="detailDeploymentAction(record)">查看详情</a-button>
    </template>
  </a-table>

  <DetailComponent
    v-if="detaildrawerVisible"
    @close="detaildrawerVisible = false"
    :namespace="selectedNamespace"
    :k8sCluster="selectedK8sCluster"
    :record="showRecord"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { SysconfigList } from "@/api/system";
import { K8sNamespaceList } from "@/api/k8s_namespace";
import { columns } from "./const/columns";
import { K8sDeploymentList, K8sDeploymentGet } from "@/api/k8s_deployment";
import DetailComponent from "./components/detail.vue";

const selectedNamespaceOptions = ref([]);
const selectedK8sClusterOptions = ref([]);
const selectedK8sCluster = ref();
const selectedNamespace = ref();
const tableData = ref([]);
const detaildrawerVisible = ref(false); // 控制抽屉 edit的显示和隐藏
const showRecord = ref(null);

// 获取 namespace
const fetchNamespaceDataOptions = async () => {
  getK8sNamespacesOptions();
};

// 更新表格数据
const fetchTableData = async () => {
  await getTableData();
};

const resetSelection = () => {
  selectedK8sCluster.value = null;
  selectedNamespace.value = null;
  tableData.value = [];
};

// 获取表格数据
const getTableData = async () => {
  let query = {};

  // 只有当 选择了集群以及namespace才会去调用这个
  if (selectedK8sCluster.value && selectedNamespace.value) {
    query = { ...query, namespace: selectedNamespace.value };
    query = { ...query, k8s_cluster: selectedK8sCluster.value };
  }

  const res = await K8sDeploymentList(query);

  const appPagedata = res.Data?.Items;

  if (res.Data?.Items != null) {
    tableData.value = appPagedata.map((item) => ({
      Name: item.Name,
      Namespace: item.Namespace,
      Replicas: item.Replicas,
      Image: item.Image,
      CreationTimestamp: item.CreationTimestamp,
    }));
  } else {
    tableData.value = [];
  }
};
// 获取K8S集群选项
async function getK8sClusterOptions() {
  const res = await SysconfigList({ config_key: "k8s_cluster" });
  if (res && res.Data && res.Data.Items) {
    selectedK8sClusterOptions.value = res.Data.Items.map((item) => ({
      value: item.configVal,
      label: item.markVal,
    }));
  }
}

// 获取K8S集群选项
async function getK8sNamespacesOptions() {
  const res = await K8sNamespaceList({ k8s_cluster: selectedK8sCluster.value });
  if (res && res.Data && res.Data.Items) {
    selectedNamespaceOptions.value = res.Data.Items.map((item) => ({
      value: item.Namespace,
      label: item.Namespace,
    }));
  }
}

const detailDeploymentAction = async (record) => {
  showRecord.value = record;
  detaildrawerVisible.value = true; // 打开详细页面

  let query = {};

  if (selectedK8sCluster.value || selectedNamespace.value) {
    if (selectedK8sCluster.value) {
      query = { ...query, k8s_cluster: selectedK8sCluster.value };
    }

    if (selectedNamespace.value) {
      query = { ...query, namespace: selectedNamespace.value };
    }
  }

  query = { ...query, name: record.Name };

  const res = K8sDeploymentGet(query);
};

onMounted(() => {
  getK8sClusterOptions();
  fetchTableData();
});
</script>
