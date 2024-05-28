import { ADD_TO_CART, LOADING_FALSE, LOADING_TRUE, REMOVE_FROM_CART, UPDATE_CART } from "@/lib/features/cart/cart"
import Swal from "sweetalert2"

export const add_to_cart = (cart_item, quantity) => async (dispatch, getState) => {
    dispatch(LOADING_TRUE())
    let { _id, title, price, rating, image, count_in_stock } = cart_item

    let cart_items = await getCartItems()
    let itemExists = cart_items.find(item => item?.product == _id)


    if (!itemExists) {
        let item = {
            product: _id,
            quantity,
            title,
            price,
            rating,
            image,
            count: count_in_stock
        }


        dispatch(ADD_TO_CART(item))
        Swal.fire("Congrats", "Your item has been added to cart.", "success")
    }
    else {
        let item = {
            product: _id,
            quantity: itemExists.quantity + 1,
            title,
            price,
            rating,
            image,
            count: count_in_stock
        }
        dispatch(UPDATE_CART(item))
        Swal.fire("Congrats", "Your cart updated.", "success")
    }

    localStorage.setItem('cart_items', JSON.stringify(await getState().cart.cart_items))
    dispatch(LOADING_FALSE())
}

export const update_cart = (cart_item, quantity) => async (dispatch, getState) => {
    dispatch(LOADING_TRUE())
    let { product, title, price, rating, image, count } = cart_item

    let cart_items = await getCartItems()
    let itemExists = cart_items.find(item => item?.product == product)

    let item = {
        ...cart_item,
        quantity
    }
    dispatch(UPDATE_CART(item))
    Swal.fire("Congrats", "Your cart updated.", "success")

    localStorage.setItem('cart_items', JSON.stringify(await getState().cart.cart_items))
    dispatch(LOADING_FALSE())
}



export const remove_from_cart = (id) => async (dispatch, getState) => {
    console.log(id)
    dispatch(LOADING_TRUE())
    dispatch(REMOVE_FROM_CART(id))
    Swal.fire("Success", "Your item has been removed from cart.", "info")
    localStorage.setItem('cart_items', JSON.stringify(await getState().cart.cart_items))
    dispatch(LOADING_FALSE())
}




function getCartItems() {
    if (typeof window !== "undefined" && window.localStorage) {
        if (localStorage.getItem("cart_items")) {
            return JSON.parse(localStorage.getItem("cart_items"))
        }
        else {
            return []
        }
    }
}