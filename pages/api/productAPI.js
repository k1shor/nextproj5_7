let API = "http://localhost:5000/api"
// let API = process.env.API

export const getAllProducts = () => {
    return fetch(`${API}/products`)
        .then(res => res.json())
        .catch(err => console.log(err))
}
export const getFilteredProducts = (filter) => {
    return fetch(`${API}/filteredproducts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filter)
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}

export const addProduct = (product, token) => {
    return fetch(`${API}/addproduct`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}

export const getProduct = (id) => {
    return fetch(`${API}/product/${id}`)
        .then(res => res.json())
        .catch(err => console.log(err))
}

export const updateProduct = (id, product, token) => {
    return fetch(`${API}/updateproduct/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}