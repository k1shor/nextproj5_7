// let API = process.env.API
let API = "http://localhost:5000/api"

export const login = (user) => {
    return fetch(`http://localhost:5000/api/login`,{
        method:"POST",
        headers: {
            accept: "Application/json",
            "Content-Type":"Application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response=>{return response.json()})
    .catch(error=>console.log(error))
}

export const register = (user) => {
    return fetch(`http://localhost:5000/api/register`,{
        method:"POST",
        headers: {
            accept: "Application/json",
            "Content-Type":"Application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response=>{return response.json()})
    .catch(error=>console.log(error))
}

export const verifyuser = (token) => {
    console.log(API)
    return fetch(`${API}/verifyuser/${token}`)
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export const authenticate = (data) => {
    localStorage.setItem("jwt",JSON.stringify(data))
}

export const isAuthenticated = () => {
    return localStorage.getItem("jwt") ?
    JSON.parse(localStorage.getItem("jwt")) :
    false
}

export const logout = () => {
    localStorage.removeItem("jwt")
    return fetch(`${API}/logout`)
    .then(res=>res.json())
    .catch(err=>console.log(err))
}