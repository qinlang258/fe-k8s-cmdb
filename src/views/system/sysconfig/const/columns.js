// columns.js

// 应用表格的列
export const columns = [
    {
      title: "配置键",
      key: "configKey",
      dataIndex: "configKey",
    },
    {
        title: "配置值",
        key: "configVal",
        dataIndex: "configVal"
    },
    {
        title: "配置键说明",
        key: "markVal",
        dataIndex: "markVal"
    },
    {
      title: "操作",
      key: "actions",
      slots: { customRender: "actions" },
    },    
  ];
  
  