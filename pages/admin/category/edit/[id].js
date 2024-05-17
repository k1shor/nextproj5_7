// import { useState } from "react";
'use client'
import { addCategory, editCategory, getAllCategories, getCategory } from "@/pages/api/categoryAPI";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const categories = await getAllCategories()

    // Get the paths we want to pre-render based on posts
    const paths = categories.map((category) => ({
      categories: { id: category._id },
    }))
   
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }
   
  // This also gets called at build time
  export async function getStaticProps({ categories }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const category = await getCategory(categories.id)
   
    // Pass post data to the page via props
    return { props: { category } }
  }

const update = ({category}) => {
    // let [category_name, setCategoryName] = useState('')
    let [category_name, setCategoryName] = useState(category.category_name)
    // let {token} = isAuthenticated()
    let [token, setToken] = useState('')

    let [error, setError] = useState('')
    let [success, setSuccess] = useState(false)

    // let id = useParams()?.id

// useEffect(()=>{
//     if(id){
//         getCategory(id).then(
//             data=>{
//                 if(data.error){
//                     console.log(data.error)
//                 }
//                 else{
//                     setCategoryName(data.category_name)
//                 }
//             }
//         )
//     }
// },[id])


    const handleSubmit = e => {
        e.preventDefault()
        editCategory(category._id, {category_name}, token)
        .then(data=>{
            if(data.error){
                setError(data.error)
                setSuccess(false)
            }
            else{
                setSuccess(true)
                setError('')
            }
        })
    }

    const showError = () => {
        if(error){
            return <div className="bg-red-200 text-center">{error}</div>
        }
    }
    const showSuccess = () => {
        if(success){
            return <div className="bg-green-200 text-center">Category Updated Successfully</div>
        }
    }

    useEffect(()=>{
        getToken().then(data=>setToken(data))

        async function getToken(){
           return await JSON.parse(localStorage.getItem('jwt'))?.token
        }
    }, [])



    return (<>
        

        <div id="defaultModal" tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full p-5">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Edit Category
                        </h3>
                    </div>
                    <form>
                        {showError()}
                        {showSuccess()}
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Category name" required="" 
                                onChange={e=>setCategoryName(e.target.value)}
                                value={category_name}
                                
                                />
                            </div>



                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSubmit}>
                            <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Update Category
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>);
}

export default update;