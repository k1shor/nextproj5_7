import { createSlice } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

const initialState = {
  cart_items: [],
  loading: false
}

async function getCartItems() {
  if (typeof window !== "undefined" && window.localStorage)
    return localStorage.getItem('cart_items') ? await JSON.parse(localStorage.getItem('cart_items')) : []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    LOADING_TRUE(state, action){
      return {...state, loading: true} 
    } ,
    LOADING_FALSE(state, action){
      return {...state, loading: false} 
    } ,
    ADD_TO_CART(state, action) {
      return {
        cart_items: [...state.cart_items, action.payload]
      }
    },
    UPDATE_CART: (state, action) => {
      return {
        cart_items:
          state.cart_items.map(item => {
            return item.product == action.payload.product ? action.payload : item
          })


      }
    },
    REMOVE_FROM_CART: (state, action) => {
      console.log(action)
      return {
        cart_items:
          state.cart_items.filter(item => {
            return item.product != action.payload 
          })


      }
    },
    CLEAR_CART: (state, action) => {

    },
  },
  middleware: thunk
})

// Action creators are generated for each case reducer function
export const { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, INITIALIZE, UPDATE_CART, LOADING_TRUE, LOADING_FALSE } = cartSlice.actions

export default cartSlice.reducer