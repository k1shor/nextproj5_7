import { useEffect, useState } from "react";
import { getAllProducts, getFilteredProducts } from "../api/productAPI";
import ProductCard from "../components/ProductCard";
import CategoryCheckbox from "../components/clients/CategoryCheckbox";
import PriceRadio from "../components/clients/PriceRadio";

// export async function getStaticProps() {
//     const products = await getFilteredProducts()
//     return { props: { products } }
// }
const product_main = () => {
    // let { products } = props
    let [products, setProducts] = useState([])
    let [filters, setFilter] = useState({
        category: [],
        price: []
    })

    const handleFilter = (filterBy, filter) => {
        setFilter({...filters, [filterBy]:filter})
        console.log(filters)
    }

    useEffect(()=>{
        getFilteredProducts(filters)
        .then(data=>{
            // console.log(data)
            setProducts(data)})
    },[filters])

    // console.log(props)
    return (<>
        <div className="grid grid-cols-4">
            <div className="col-span-1">
                <CategoryCheckbox handleFilter={handleFilter}/>
                <PriceRadio handleFilter={handleFilter}/>
            </div>
            <div className="col-span-3 grid grid-cols-3">
                {
                    products?.length > 0 &&
                    products.map((product) => {
                        return <ProductCard product={product} />
                    })
                }

            </div>
        </div>

    </>);
}

export default product_main;