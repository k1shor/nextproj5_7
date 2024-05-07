let API = "http://localhost:5000/api"
// let API = process.env.API

export const getAllCategories = () => {
    return fetch(`${API}/getallcategories`)
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export const addCategory = (category_name, token) => {
    return fetch(`${API}/addcategory`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({category_name})
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}