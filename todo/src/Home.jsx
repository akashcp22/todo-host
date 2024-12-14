import React, { useEffect, useState } from 'react'
import{FaCheck, FaPencilAlt, FaPlus,FaSearch, FaTrash} from 'react-icons/fa'
import { createTask, deleteTask, getAllTasks,  updateTaskById } from './api'
import { toast } from 'react-toastify'


function Home() {

    const[input,setInput]=useState('')
    const[tasks,setTasks]=useState([])
    const [copyTask,setCopyTask]=useState([])
    const [updateTask,setUpdateTask]=useState(null)

  const  handleTasks=()=>{
    if (!input.trim()) {
        toast.warn('Please enter a task before adding!');
        return;
      }

    if(updateTask && input){
        const obj={
            taskName:input,
            isDone:updateTask.isDone,
            _id:updateTask._id
        }
handleUpdate(obj)
    }
    else if(updateTask===null && input){
        handleAddTask()
    }

    setInput('')
  }

  useEffect(()=>{
    if(updateTask){
        setInput(updateTask.taskName)
    }
  },[updateTask])
    const handleAddTask=async()=>{
        const obj={
            taskName:input,
            isDone:false
        }
        try{
        const {success,message}=await createTask(obj)
        
        if(success){
            toast.success("task added")
        }
        
        setInput('')
        fetchAllTasks()
        
        }
        catch(err){
        console.error(err)
        toast.error("failed to add")
        }
    }

const fetchAllTasks=async()=>{
    try{
        const {data}=await getAllTasks()
        
               
            console.log(data)
            setTasks(data)
            setCopyTask(data)
        
        }
        catch(err){
        console.error(err)
     
        }
}

const handleDeleteTask=async(id)=>{
    try{
        const {success,message}=await deleteTask(id)
        
               
           
            if(success){
                toast.success("task deleted")
            }
            fetchAllTasks()
        
        }
        catch(err){
        console.error(err)
        toast.error("failed to delete")
     
        }
}
const handleCheckAndUncheck=async(item)=>{
const{_id,isDone,taskName}=item
const obj={
    taskName,
    isDone:!isDone
}
try{
    const {success,message}=await updateTaskById(_id,obj)
    
           
       
        if(success){
            toast.success("done")
        }
        fetchAllTasks()
    
    }
    catch(err){
    console.error(err)
    toast.error("failed to delete")
 
    }

}


const handleUpdate=async(item)=>{

    const{_id,isDone,taskName}=item
    const obj={
        taskName,
        isDone:isDone
    }
    try{
        const {success,message}=await updateTaskById(_id,obj)
        
               
           
            if(success){
                toast.success("done")
            }
            fetchAllTasks()
        
        }
        catch(err){
        console.error(err)
        toast.error("failed to delete")
     
        }

}

const handleSearch=(e)=>{
    const term=e.target.value.toLowerCase()
    const oldTasks=[...copyTask]
    const result=oldTasks.filter((item)=>item.taskName.toLowerCase().includes(term))
    setTasks(result)
}



useEffect(()=>{
    fetchAllTasks()
},[])



  return (
    <>

     <div className='container d-flex flex-column align-items-center w-50  mt-5'>
     <h1 style={{ 
  fontSize: '2.5rem', 
  fontWeight: 'bold', 
  color: '#4caf50', 
  textAlign: 'center', 
  marginBottom: '20px', 
  textShadow: '2px 2px 5px rgba(0,0,0,0.3)' 
}}>
  To-Do List
</h1>

        <div className='d-flex justify-content-between align-items-center mb-4 w-100 '>
            <div className='input-group flex-grow-1 me-2'>
                <input type="text" className='form-control me-1' placeholder='Add a new task' value={input} onChange={(e)=>setInput(e.target.value)}/>
                <button className='btn btn-success btn-sm me-2' onClick={handleTasks}>
                    <FaPlus className='m-2'></FaPlus>
                </button>
            </div>
            <div className='input-group flex-grow-1 '>
                <span className='input-group-text'><FaSearch></FaSearch></span>
                <input type="text" onChange={handleSearch} className='form-control me-1' placeholder='search' />
            </div>
        </div>

<div className='d-flex flex-column w-75'>
    {
        tasks.map((item)=>(
            <div key={item._id} className='m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center'>
<span className={item.isDone?'text-decoration-line-through':''}>{item.taskName}</span>

<div>
    <button type='button' className='btn btn-primary btn-sm me-2'onClick={()=>handleCheckAndUncheck(item)}><FaCheck></FaCheck></button>
    <button type='button' className='btn btn-warning btn-sm me-2'onClick={()=>setUpdateTask(item)}><FaPencilAlt></FaPencilAlt></button>
    <button type='button' onClick={()=>handleDeleteTask(item._id)} className='btn btn-danger btn-sm me-2'><FaTrash></FaTrash></button>
</div>
    </div>
        ))
    }

</div>


        </div> 


    </>
  )
}

export default Home
