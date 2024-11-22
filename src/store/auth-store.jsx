import {create} from "zustand"
import {register} from "../api/auth"
import {login} from "../api/auth"
import { toast } from 'react-toastify';
import {createJSONStorage, persist} from "zustand/middleware"

const useAuthStore = create(persist((set,get)=>({ 
    // name:"first",
    user:null,  //กำหนดค่าเริ่มต้นให้กับ user และ token เป็น null (ยังไม่มีผู้ใช้ล็อกอิน)
    token:null,
    actionRegister : async(form)=>{
        try {
            //code
            const resp = await register(form)
            console.log(resp.data)
            toast.success(resp.data.message)
        } catch (err) {
            //err
            console.log(err.response.data.message)  //พยายาม (try) ส่งข้อมูลการล็อกอินไปยังฟังก์ชัน login ถ้าสำเร็จจะตั้งค่า user และ token ด้วยข้อมูลที่ได้จากเซิร์ฟเวอร์ ถ้าล้มเหลวจะ log ข้อความและแสดงข้อผิดพลาด (toast.error)
            toast.error(err.response.data.message)
        }
    },
    actionLogin : async(form)=>{  // รับข้อมูล login จาก form
        try {
            //code
            console.log(form)
            const resp = await login(form)
            // console.log(resp.data.user.user.role)
            console.log(resp.data)
            set({ 
                user: resp.data.user,
                token: resp.data.token
             })
             return resp.data.user.user.role
            // toast.success(resp.data.message)
        } catch (err) {
            //err
            console.log(err)
            console.log(err.response.data.message)
            toast.error(err.response.data.message)
        }
    },
    actionLogout: ()=>{  //ฟังก์ชัน actionLogout ใช้เพื่อล็อกเอาท์ผู้ใช้ โดยล้างข้อมูลใน localStorage และตั้งค่า user และ token กลับเป็น null
        localStorage.clear()
        set({ user: null, token: null})
    },

    
}),{
    name:'user-store', //กำหนดให้สถานะ (state) ที่บันทึกมีชื่อว่า user-store และบันทึกลงใน localStorage โดยใช้ createJSONStorage
    storage: createJSONStorage(()=>localStorage)
}))


export default useAuthStore