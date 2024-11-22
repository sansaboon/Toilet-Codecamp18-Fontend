import React, {useState} from "react";
import useAuthStore from "../../store/auth-store";
import { useNavigate } from "react-router-dom";




const Login = () => {
  const navigate = useNavigate()
  // Javascript
  const [form, setForm] =useState({
    email: '',
    password:'',
  })

//Zustand
const actionLogin = useAuthStore((state)=>state.actionLogin)




  const hdlOnChange =  (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const hdlSubmit = async (e)=>{
    e.preventDefault()
    // console.log(form)
    const role = await actionLogin(form)
    roleRedirect(role)
  }

  const roleRedirect = (role) => {

    console.log(role)
    if(role === 'ADMIN'){
    
      navigate('/admin')
    }else{
      navigate('/user')
    }
  }
  // actionLogin(form)

  return (
    <div className="bg-green-50 flex w-full h-full p-2">
      <div className="w-4/5">Coming Soon...</div>
      <div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold mb-4">Login</p>
          {/* Form Login */}
          <form onSubmit={hdlSubmit}
          className="flex flex-col space-y-4">
            <input
            name="email"
            value={form.email}
            onChange={hdlOnChange}
              placeholder="Email"
              className="p-2 rounded w-64 
              border border-gray-300 shadow-md"
            />
            <input
            name="password"
            type="password"
            value={form.password}
            onChange={hdlOnChange}
              placeholder="Password"
              className="p-2 rounded w-64 
              border border-gray-300 shadow-md"
            />
            <button
              className="bg-blue-400 rounded-md
              hover:bg-blue-700 hover:scale-105 hover:duration-200
              font-bold text-white shadow-md
              "
            >
              Login
            </button>
          </form>
          {/* /Form Login */}
        </div>
      </div>
    </div>
  );
};

export default Login