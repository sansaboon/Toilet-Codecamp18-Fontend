import React from "react";
import { Link } from "react-router-dom";
import { FaChartPie, FaUser } from "react-icons/fa";
import { IoSettingsSharp, IoLogOut } from "react-icons/io5";
import { MdDashboard, MdManageAccounts } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { VscGlobe } from "react-icons/vsc";
import useAuthStore from "../../store/auth-store";



const classLink =
  "flex items-center hover:bg-gray-100 hover:scale-105 hover:duration-200 active:bg-green-400 rounded-sm px-3 py-2 gap-2 text-gray-800";

const AdminSidebar = () => {
  const actionLogout = useAuthStore(state=>state.actionLogout)
  return (
    <div className="bg-white w-60 p-4 flex flex-col shadow-md">
      {/* Profile */}
      <div className="flex flex-col items-center gap-2 py-4">
        <FaUser fontSize={48} className="text-gray-800" />
        <span className="text-lg text-gray-800">Profile</span>
      </div>

      {/* Menu Link */}
      <div className="flex-1 py-4">
      <Link className={classLink} to="/admin/">
          <span className="text-xl">
            <FaMapMarkerAlt />
          </span>
          Map 
        </Link>

        <Link className={classLink} to="/admin/manage">
          <span className="text-xl">
            <MdManageAccounts />
          </span>
          Manage User
        </Link>

        <Link className={classLink} to="/admin/listmap">
          <span className="text-xl">
            <FaMapMarkedAlt />
          </span>
          My Map
        </Link>

      </div>

      {/* Bottom Menu */}
      <div>
        {/* <Link className={classLink} to={"#"}>
          <span className="text-xl">
            <IoSettingsSharp />
          </span>
          Setting
        </Link> */}

        <Link className={classLink} onClick={actionLogout} to={"/"}>
          <span className="text-xl">
            <IoLogOut />
          </span>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
