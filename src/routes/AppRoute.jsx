import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Layout from "../layouts/Layout";
import Manage from "../pages/admin/Manage";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import Unauthorization from "../pages/Unauthorization";
import PageNotFound from "../pages/PageNotFound";
import ProtectRoute from "./ProtectRoute";
import ListMap from "../pages/admin/ListMap";
import Map from "../pages/admin/Map"
import UserMap from "../pages/user/UserMap"
import UserListMap from "../pages/user/UserListMap";








const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "unauthorization", element: <Unauthorization /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },

  {
    path: "/admin",
    element: <ProtectRoute element={<AdminLayout />} allow={["ADMIN"]}/>,
    children: [
      { index: true, element: <Map/>},
      { path: "manage", element: <Manage /> },
      { path: "listmap", element: <ListMap/>}
      

    ],
  },
  {
    path: "/user",
    element:<ProtectRoute element={<UserLayout />} allow={["USER","ADMIN"]}/>, 
    children: [
      { index: true, element: <UserMap/> },
      { path: "userlistmap", element: <UserListMap/>}
    ],
  },
]);
const AppRoute = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRoute;
