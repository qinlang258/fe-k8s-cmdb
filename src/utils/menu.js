const menuList = [
    {
      path: "/home",
      name: "导航页",
      key: "Home",
      icon: "HomeTwoTone"
    },
    {
        path: "/k8s",
        name: "k8s",
        key: "K8S",
        icon: "HomeTwoTone",
        children: [
          {
            path: "/k8s/node",
            name: "节点信息",
            key: "node"
          },
          {
            path: "/k8s/deployment",
            name: "应用信息",
            key: "deployment"
          }          
        ]     
      },
      {
        path: "/system",
        name: "管理",
        key: "System",
        icon: "SettingTwoTone",
        children: [
          {
            path: "/system/sysconfig",
            name: "系统项配置",
            key: "sysconfig",
          },               
        ]
      }         
  ];
  export default menuList;