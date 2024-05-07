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
    title: "副本数",
    key: "Replicas",
    dataIndex: "Replicas",
  },
  {
    title: "镜像",
    key: "Image",
    dataIndex: "Image",
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
