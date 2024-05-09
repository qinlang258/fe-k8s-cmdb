// 应用表格的列
export const columns = [
  {
    title: "名字",
    key: "Name",
    dataIndex: "Name",
  },
  {
    title: "命名空间",
    key: "Namespace",
    dataIndex: "Namespace",
  },
  {
    title: "CLUSTER-IP",
    key: "ClusterIp",
    dataIndex: "ClusterIp",
  },
  {
    title: "Ports",
    key: "Ports",
    dataIndex: "Ports",
  },
  {
    title: "创建时间",
    key: "CreationTimestamp",
    dataIndex: "CreationTimestamp",
  },
  {
    title: "操作",
    key: "actions",
    slots: { customRender: "actions" },
  },
];
