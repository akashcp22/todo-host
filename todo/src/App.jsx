
import './App.css'
import Home from './Home'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function App() {


  return (
    <>
      <Home></Home>
      <ToastContainer  position="top-right"
        autoClose={3000}/>
    </>
  )
}

export default App
