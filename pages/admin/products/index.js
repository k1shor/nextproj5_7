import { getAllCategories } from "@/pages/api/categoryAPI";
import { getAllProducts } from "@/pages/api/productAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export async function getStaticProps() {
    const products = await getAllProducts()
    const categories = await getAllCategories()
    return { props: { products, categories } }
}

const products = (props) => {

    let { products,categories } = props
    let router = useRouter()


    const handleDelete = id => e => {
        e.preventDefault()
        Swal.fire({
            title: "Confirm ?",
            text: "Are you sure you want to delete this category?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: '#dd1111',
            confirmButtonText: "OK, Delete!",
            cancelButtonText: "No, Don't Delete!",
            // position:"bottom-end"
            // timer:1000
        }).then(result => {
            if (result.isConfirmed) {
                // deleteCategory(id)
                //     .then(data => {
                //         if (data.error) {
                //             Swal.fire('Error', data.error, 'error')
                //         }
                //         else {
                //             Swal.fire('Success', data.message, 'success')
                //                 .then(result => {
                //                     router.refresh()
                //                 })
                //             // window.location.reload()
                //         }
                //     })
            }
            else {
                Swal.fire('Cancelled', "Nothing is deleted", 'info')
            }
        })





    }

    return (<>
        <div className="p-5 text-center">
            <h1 className="text-2xl">Categories</h1>
            <Link href={'/admin/products/new'}>
                <button type="add" className="">Add New Product</button>
            </Link>
        </div>



        <div class="relative overflow-x-auto shadow-md sm:rounded-lg text-center mx-auto">
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
                            Count In Stock
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, i) => {
                            return <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {i + 1}
                                </th>
                                <td class="px-6 py-4">
                                    <img src={`http://localhost:5000/${product.image}`} alt={`${product.title}`} className="h-24" />
                                </td>
                                <td class="px-6 py-4">
                                    {product.title}
                                </td>
                                <td class="px-6 py-4">
                                    {product.price}
                                </td>
                                <td class="px-6 py-4">
                                    {product.count_in_stock}
                                </td>
                                <td class="px-6 py-4">
                                    {product.category?.category_name}
                                </td>

                                <td class="px-6 py-4">
                                    <Link href={`/admin/products/edit/${product._id}`} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><button type='warning'>Edit</button></Link>
                                    <button type="delete" class=""
                                        onClick={handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        })
                    }



                </tbody>
            </table>
        </div>

    </>);
}

export default products;