import { API_URL } from "./url"

export const createTask=async (taskObj)=>{
    const url=`${API_URL}/tasks`
    const options={
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(taskObj)
    }
    try{
        const result=await fetch(url,options)
        const data=await result.json()
        return data
    }catch(err){
return err
    }
}

export const getAllTasks=async ()=>{
    const url=`${API_URL}/tasks`
    const options={
        method:'GET',
        headers:{
            'Content-type':'application/json'
        }
       
    }
    try{
        const result=await fetch(url,options)
        const data=await result.json()
        return data
    }catch(err){
return err
    }
}
export const deleteTask=async (id)=>{
    const url=`${API_URL}/tasks/${id}`
    const options={
        method:'DELETE',
        headers:{
            'Content-type':'application/json'
        }
       
    }
    try{
        const result=await fetch(url,options)
        const data=await result.json()
        return data
    }catch(err){
return err
    }
}
export const updateTaskById=async (id,reqBody)=>{
    const url=`${API_URL}/tasks/${id}`
    const options={
        method:'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(reqBody)
       
    }
    try{
        const result=await fetch(url,options)
        const data=await result.json()
        return data
    }catch(err){
return err
    }
}