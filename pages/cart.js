import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { remove_from_cart, update_cart } from "./middleware/cartActions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const cart = () => {
    // let cart_items = useSelector(state => state.cart.cart_items)
    let [cart_items, setCartItems] = useState([])
    let loading = useSelector(state => state.cart?.loading)

    let router = useRouter()

    useEffect(() => {
        loadCartItems()
            .then(data => setCartItems(data))
    }, [loading])

    console.log(cart_items)

    const dispatch = useDispatch()
    const handleRemove = (id) => (e) => {
        console.log(id)
        e.preventDefault()
        dispatch(remove_from_cart(id))
    }

    const reduce = (item, quantity) => e => {
        e.preventDefault()
        let q = quantity - 1
        if (q == 0) {
            dispatch(remove_from_cart(item.product))
        }
        else {
            dispatch(update_cart(item, q))
        }

    }

    const increase = (item, count, quantity) => e => {
        e.preventDefault()
        let q = quantity + 1
        if (q > count) {
            Swal.fire("Warning", "Maximum quantity reached", 'Warning')
        }
        else {
            dispatch(update_cart(item, q))
        }
    }

    const checkout = e => {
        e.preventDefault()
        let individualTotals = cart_items.map(item => item.quantity * item.price)
        let total = individualTotals.reduce((a, c) => a + c)
        sessionStorage.setItem("total", total)
        router.push('/checkout')
    }


    async function loadCartItems() {
        return await JSON.parse(localStorage.getItem('cart_items'))
    }

    return (<>

<ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                    <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Cart
                        </span>
                    </li>

                    <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                        <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                            Checkout
                        </span>
                    </li>

                    <li className="flex shrink-0 items-center">
                        <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Order summary
                    </li>
                </ol>
        {loading && <div>LOADING</div>}

        {
            cart_items.length <= 0 ?
                <div className="p-5 text-center text-3xl">No items in Cart</div>
                :
                <>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    S.No.
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Unit Price
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Total
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart_items.map((product, i) => {
                                    console.log(product)
                                    return <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {i + 1}
                                        </th>
                                        <td class="px-6 py-4">
                                            <img src={`http://localhost:5000/${product.image}`} alt={`${product.image}`} className="h-24" />
                                        </td>
                                        <td class="px-6 py-4">
                                            {product.title}
                                        </td>
                                        <td class="px-6 py-4">
                                            {product.price}
                                        </td>
                                        <td class="px-6 py-4">
                                            <button onClick={reduce(product, product.quantity)}>-</button>
                                            {product.quantity}
                                            <button onClick={increase(product, product.count, product.quantity)}>+</button>
                                        </td>
                                        <td class="px-6 py-4">
                                            {product.quantity * product.price}
                                        </td>

                                        <td class="px-6 py-4">
                                            <button type="delete" class=""
                                                onClick={handleRemove(product.product)}>Delete</button>
                                        </td>
                                    </tr>
                                })
                            }



                        </tbody>
                    </table>
                    <div>
                        <button onClick={checkout}>Proceed to Checkout</button>
                    </div>
                </>
        }


    </>);
}

export default cart;