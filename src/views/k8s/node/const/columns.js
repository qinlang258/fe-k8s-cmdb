// 应用表格的列
export const columns = [
    {
      title: "节点名",
      key: "ServiceId",
      dataIndex: "ServiceId",
    },
    {
        title: "应用名",
        key: "ServiceName",
        dataIndex: "ServiceName"
    },
    {
        title: "Gitlab Id",
        key: "GitlabId",
        dataIndex: "GitlabId"
    },    
    {
        title: "k8s集群",
        key: "K8SCluster",
        dataIndex: "K8SCluster"
    },
    {
        title: "k8s命名空间",
        key: "Namespace",
        dataIndex: "Namespace"
    },    
    {
        title: "所属环境",
        key: "Envs",
        dataIndex: "Envs"
    },   
    {
        title: "标签",
        key: "Labels",
        dataIndex: "Labels"
    },       
  ];
  
  