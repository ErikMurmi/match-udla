const baseUrl = process.env.base_api_url

export const deleteGestor = async(selectedUser)=>{
    try{
      await fetch(`http://localhost:3000/api/gestores/${selectedUser._id}`,{
      method:"DELETE",})
    }catch (error){
      console.log(error)
    }
}

export const registerGestor = async (newGestor)=>{
    try{
        const res = await fetch('http://localhost:3000/api/gestores',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(newGestor)
        })
        return res
    }catch(error){
        return {error:1,msg:error}
    }
  }
  
export const updateGestor = async ({query,newGestor})=>{
try{
    console.log('query controller',query)
    await fetch('http://localhost:3000/api/gestores/'+query.id,{
        method:'PUT',
        headers:{
            "Content-Type":"application/json"
        },
        body : JSON.stringify(newGestor)
    })
    }catch(error){
        console.log(error)
    }
}

export const getGestor = async(query)=>{
    const res = await fetch("http://localhost:3000/api/gestores/"+query.id)
    const data = await res.json()
    return data   
}

export const findUserByCredentials = async(credentials) =>{
    try{
        const res = await fetch(`${baseUrl}users/login`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(credentials)})
        const data = await res.json()
        return data
    }catch(error){
        console.log(error)
        console.log('No se econtro el usuario')
        return null
    }
    
}