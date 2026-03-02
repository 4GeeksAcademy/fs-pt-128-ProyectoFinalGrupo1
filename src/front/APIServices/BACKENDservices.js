export const login = async (user, navigate) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`,{
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json"
        }
    })
   
    
    const data = await response.json()
    if(!response.ok){
        return data
    }
    localStorage.setItem("token", data.token)
    navigate("/")
    console.log(data)
    return data
}