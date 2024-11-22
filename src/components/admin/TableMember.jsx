import React, { useEffect,useState } from 'react'
import { listMember,removeMember,updateMember } from '../../api/member'
import useAuthStore from '../../store/auth-store'
import { toast } from 'react-toastify'


const TableMember = () => {
const [member,setMember] = useState([])
//Zustand
const token = useAuthStore((state)=>state.token)
// console.log(token)

useEffect(()=>{
//code
  getData()
},[])


const getData = async () =>{
  try {
    //code
    const resp = await listMember()
    setMember(resp.data)
    // console.log(resp.data)
  } catch (err) {
    //err
    console.log(err)
  }
}

// console.log(member)

const hdlRemoveMember =async (id)=>{
  try {
   //code
   const resp =await removeMember(token,id)
   console.log(resp)
   toast.success(resp.data.message)
   getData()
  } catch (err) {
    // err
    console.log(err)
  }
}


const hdlUpdateMember = async(e,id)=>{
  // console.log(e.target.value,id)
  const role = e.target.value
  console.log({role})
  try {
    //code
    const resp = await updateMember(token,id,{role})
    console.log(resp)
    toast.success(resp.data.message)
    getData()
  } catch (err) {
    //err
    console.log(err)
  }
}


const role = ["ADMIN","USER"]


  return (
    <div>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
      <th scope="col">Action</th>
    </tr>
  </thead>

  <tbody>


    
    
  {member.map((item,index)=>{
console.log(item)
return(
  <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{item.email}</td>


      
      <td>
        {/* {item.role} */}
        <select 
        onChange={(e)=>hdlUpdateMember(e,item.id)}
        defaultValue={item.role}>
          <option>ADMIN</option>
          <option>USER</option>
        </select>


        </td>

      <td>
        <p onClick={()=>hdlRemoveMember(item.id)}>
        Delete
          </p>
          </td>
    </tr>
)
})} 
    
   
    
  </tbody>
</table>
    </div>
  )
}

export default TableMember