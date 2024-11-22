import React, { useEffect, useState } from "react";
import useAuthStore from "../store/auth-store";
import { currentUser } from "../api/auth";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ element,allow }) => {
  const [isAllowed, setIsAllowed] = useState(null);

  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  useEffect(()=>{
    //code
    checkRole()
  },[])
  
  const checkRole = async () => {
    try {
      //code
      const resp = await currentUser(token); //ฟังก์ชัน checkRole ใช้ token เพื่อตรวจสอบข้อมูลผู้ใช้ปัจจุบัน (โดยเรียก currentUser) และดึงของผู้ใช้จากข้อมูลที่ได้รับ (resp.data.member.role)
      const role = resp.data.member.role
    //   console.log('role from backend',role);
      if(allow.includes(role)){
        setIsAllowed(true)
        
      }else{
        setIsAllowed(false)
      }

    } catch (err) {
      //err
      console.log(err);
      setIsAllowed(false)
    }
  };
if(isAllowed === null){
    return <div>Loading....</div>
}
if(!isAllowed){
    return <Navigate to={'/unauthorization'}/>
}


  return element;
};

export default ProtectRoute;
