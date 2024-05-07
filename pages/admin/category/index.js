import { getAllCategories } from "@/pages/api/categoryAPI";
import Link from "next/link";
import { useEffect, useState } from "react";

const category = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategories(data)
                }
            })
    }, [])

    return (<>
        <div className="p-5 text-center">
            <h1 className="text-2xl">Categories</h1>
            <Link href={'/admin/category/new'}>
                <button type="add" className="">Add New Category</button>
            </Link>
        </div>



        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-3/4 text-center mx-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            S.No.
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Category Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((category, i) => {
                            return <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {i + 1}
                                </th>
                                <td class="px-6 py-4">
                                    {category.category_name}
                                </td>

                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><button type='warning'>Edit</button></a>
                                    <button type="delete" class="">Delete</button>
                                </td>
                            </tr>
                        })
                    }



                </tbody>
            </table>
        </div>

    </>);
}

export default category;