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

export const getCategory = (id) => {
    return fetch(`${API}/getcategory/${id}`)
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export const editCategory = (id, category, token) => {
    return fetch(`${API}/updatecategory/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export const deleteCategory = (id) => {
    return fetch(`${API}/deletecategory/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            // Authorization: `Bearer ${token}`
        },
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))

}