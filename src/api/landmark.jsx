import axios from 'axios'



export const landmark = (token)=>
    axios.get('http://localhost:5000/api/landmark', {headers: {Authorization:`Bearer ${token}`}})

export const removeLandmark = (token,id)=>  {
    // javascript
     return   axios.delete('http://localhost:5000/api/landmark/'+id,{
        headers:{
            Authorization: `Bearer ${token}`
        }
     })
    }


export const updateLandmark = (token,id,form)=>  {
    // javascript
    console.log(form)
     return   axios.patch('http://localhost:5000/api/landmark/'+id, form,{
        headers:{
            Authorization: `Bearer ${token}`
        }
     })
    }