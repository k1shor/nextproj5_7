import { useEffect, useState } from "react";
import { getRelatedProducts } from "../api/productAPI";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ id }) => {
    let [products, setProducts] = useState([])
    let [length, setLength] = useState(4)

    useEffect(() => {
        getRelatedProducts(id)
            .then(data => setProducts(data))
    }, [id])


    return (<>
        <div className="flex flex-wrap justify-evenly">
            {
                products?.length > 0 &&
                products.slice(0, length).map(product => {
                    return <ProductCard product={product} />
                })
            }
        </div>
    </>);
}

export default RelatedProducts;