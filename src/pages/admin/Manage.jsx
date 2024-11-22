// rafce
import React from "react";
import TableMember from "../../components/admin/TableMember";

const Manage = () => {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-sm border border-gray-200 p-12 shadow-md">
      <div>Manage</div>
      <TableMember/>
    </div>
  );
};

export default Manage;