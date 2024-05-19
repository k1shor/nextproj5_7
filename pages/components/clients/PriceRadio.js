import React, { useState } from 'react'
import { prices } from './prices'

const PriceRadio = ({handleFilter}) => {
    let [price, setPrice] = useState([])

    const handleChange = (e) => {
        let sel_price = prices.find(price => price.id == e.target.value)
        let value = sel_price.value
        setPrice(value)
        // console.log(value)
        handleFilter('price',value)
    }

    return (
        <>
            <h1 className='mt-4 text-2xl'>Prices</h1>
            {
                prices.map(price => {
                    return <div class="flex items-center">
                        <input id={price.id} type="radio" value={price.id} name="price" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange}/>
                        <label for={price.id} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{price.title}</label>
                    </div>
                })
            }
        </>
    )
}

export default PriceRadio