export const GetTableColumn = () => {
  return Promise.resolve([
    { title: "Name", dataIndex: "fullName", render: "name" },
    { title: "Email", dataIndex: "email", render: "email" },
    { title: "Username", dataIndex: "username", render: "username" },
    { title: "Role", dataIndex: "roleRef", render: "roleName" },
    { title: "Status", dataIndex: "isActive", render: "isActive" },
  ]);
};
