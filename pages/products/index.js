import { getAllProducts } from "../api/productAPI";
import ProductCard from "../components/ProductCard";

export async function getStaticProps(){
    const products = await getAllProducts()
    return {props: {products}}
}
const product_main = (props) => {
let {products} = props

console.log(props)
    return ( <>
    {
        products?.length > 0 &&
        products.map((product)=>{
            return <ProductCard product={product}/>
        })
    }
    </> );
}
 
export default product_main;