// 应用表格的列
export const columns = [
    {
      title: "节点名",
      key: "Name",
      dataIndex: "Name",
    },
    {
        title: "状态",
        key: "Status",
        dataIndex: "Status"
    },
    {
        title: "创建时间",
        key: "CreationTimestamp",
        dataIndex: "CreationTimestamp"
    },    
    {
        title: "K8S节点版本",
        key: "Version",
        dataIndex: "Version"
    },    
    {
        title: "IP地址",
        key: "Address",
        dataIndex: "Address"
    },   
    {
        title: "AMI",
        key: "OsImage",
        dataIndex: "OsImage"
    }, 
    {
        title: "内核版本",
        key: "KernelVersion",
        dataIndex: "KernelVersion"
    },    
    {
        title: "CRI",
        key: "ContainerRuntime",
        dataIndex: "ContainerRuntime"
    },     
    {
        title: "操作",
        key: "actions",
        slots: { customRender: "actions" },
      },            
  ];
  
  