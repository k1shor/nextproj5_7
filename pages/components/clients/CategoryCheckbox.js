import { getAllCategories } from '@/pages/api/categoryAPI'
import React, { useEffect, useState } from 'react'

// export async function getStaticProps() {
//     const categories = await getAllCategories()
//     return { props: { categories } }
// }

const CategoryCheckbox = ({ handleFilter }) => {
    // let categories = props?.categories
    let [categories, setCategories] = useState([])
    let [selected, setSelected] = useState([])

    // [a,b,c]

    useEffect(() => {
        getAllCategories()
            .then(data => {
                setCategories(data)
            })
    }, [])

    const handleChange = (e) => {
        // b
        let selected_new = [...selected]
        let exists = selected_new.findIndex(cat => cat === e.target.value)
        if (exists != -1) {
            selected_new.splice(exists, 1)
        }
        else {
            selected_new.push(e.target.value)
        }
        setSelected(selected_new)
        handleFilter("category", selected_new)
        // console.log(selected_new)

    }

    // console.log(props)
    return (
        <>
            <h1 className='text-2xl'>Categories</h1>
            {
                categories.length > 0 &&
                categories.map(category => {
                    return <div class="flex items-center" key={category._id}>
                        <input id={category._id} type="checkbox" value={category._id} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} />
                        <label for={category._id} class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{category.category_name}</label>
                    </div>
                })
            }
        </>
    )
}

export default CategoryCheckbox