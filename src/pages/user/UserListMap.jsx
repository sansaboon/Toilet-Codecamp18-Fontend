import React from "react";
import TableListmap from "../../components/admin/TableListmap";

const UserListMap = () => {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-sm border border-gray-200 p-4 shadow-md">
      <div>List Map</div>
      <TableListmap/>
    </div>
  );
};

export default UserListMap;