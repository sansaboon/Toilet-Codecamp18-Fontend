
import React from "react"
import AppRoute from "./routes/appRoute"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div>
      <ToastContainer/>
      <AppRoute/>
    </div>
  )   
}
export default App
