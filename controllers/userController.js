const baseUrl = process.env.base_api_url

export const deleteUser = async(selectedUser)=>{
    try{
      await fetch(`http://localhost:3000/api/users/${selectedUser._id}`,{
      method:"DELETE",})
    }catch (error){
      console.log(error)
    }
}

export const registerUser = async (newUser)=>{
    try{
        await fetch('http://localhost:3000/api/users',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(newUser)
        })
    }catch(error){
        console.log(error)
    }
  }
  
export const updateUser = async ({query,newUser})=>{
try{
    await fetch('http://localhost:3000/api/users/'+query.id,{
        method:'PUT',
        headers:{
            "Content-Type":"application/json"
        },
        body : JSON.stringify(newUser)
    })
}catch(error){
    console.log(error)
}
}

export const getUser = async(query)=>{
    const res = await fetch("http://localhost:3000/api/users/"+query.id)
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