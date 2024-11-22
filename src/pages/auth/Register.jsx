import React, {useState} from "react";
import validateRegister from "../../utils/validator";
import useAuthStore from "../../store/auth-store";

const initialState ={
    email: '',
    password:'',
    confirmPassword: '',
}



const Register = () => {
  //javaScript
  //Get data
  const name = useAuthStore((state)=> state.name)
  const actionRegister = useAuthStore((state)=> state.actionRegister)
  console.log(name)

const [form, setForm] =useState({
  email: '',
  password:'',
  confirmPassword: ''
})
const [formatError, setFormErrors] = useState({})

const hdlOnChange = (e)=>{
  console.log(e.target.name, e.target.value)
  setForm({
    ...form,
    [e.target.name]:e.target.value
  })
}

const hdlSubmit = (e)=>{
  e.preventDefault()

  console.log(form)
  const error = validateRegister(form)
  // console.log(error)
  if(error){
  return  setFormErrors(error)
  }
  //step 1 Validate with joi
  //step 2 Send to back
  actionRegister(form)
  
  setForm(initialState)
  setFormErrors({})
}

  return (
    <div className="bg-green-100 flex w-full h-full p-2">
      <div className="w-3/5">Coming Soon...</div>
      <div>
        <div className="flex flex-col items-center ">
           <p className="text-2xl font-bold mb-4">Register</p>
          {/* {Form Register} */}
          <form  onSubmit={hdlSubmit}  className="flex flex-col space-y-4">
            <input
            value={form.email}
            name="email"
            onChange={hdlOnChange}
            type="email"
            placeholder="Email"
              className="p-2 rounded w-64 
          border border-gray-300 shadow-md"
            />
            {
              formatError.email && (
                <span className="text-red-500">
                  {formatError.email}
                  </span>
              )
            }
            <input
            value={form.password}
            name="password"
            onChange={hdlOnChange}
            type="password"
            placeholder="Password"
              className="p-2 rounded w-64 
          border border-gray-300 shadow-md"
            />
             {
              formatError.password && (
                <span className="text-red-500">
                  {formatError.password}
                  </span>
              )
            }
            <input
            value={form.confirmPassword}
            name="confirmPassword"
            onChange={hdlOnChange}
            type="password"
            placeholder="Confirm Password"
              className="p-2 rounded w-64 
          border border-gray-300 shadow-md"
            />
            {
              formatError.confirmPassword && (
                <span className="text-red-500">
                  {formatError.confirmPassword}
                  </span>
              )
            }
            <button
              className="bg-blue-500 rounded-md
          hover:bg-blue-700 hover:scale-105 hover:duration-200
          font-bold text-white shadow-md
          "
            >
              Register
            </button>
          </form>
          {}
        </div>
      </div>
    </div>
  );
}

export default Register;
