import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import '../CSS/pagination.css';
import { Route } from "react-router-dom";
import Produc from "../Feature/Products";
import ProductPagination from "../Feature/ProductPagination";
import { Products } from "../Interface/types.js"


function Product(){
   
    let [product,setProduct] = useState(Array<Products>)
    const [currentPage,setCurrentPage] = useState(1)
    const [productsPerPage,setProductsPerPage] = useState(2)

    useEffect(() => {
    async function allProducts(){
        const url = "http://localhost:7777/products/test";
        
        try {
            let response = await axios(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
           
           console.log(response.data);
           setProduct(response.data)
           
        } catch (error: any) {
            console.error(error.message);
        }
       
    }
    allProducts()
}, []);
/*
return(
    <>{
        product.map((p,index = 0)=>{
        return(
         <div key = {index}>
          <p>Product: {p.productId} </p>
          <p>Name: { p.name}</p>
          <p> Product Description: {p.description}</p>
         </div>
        )
        })
    }
 
    </>
)
    */

const indexOfLastProduct = currentPage * productsPerPage
const indexOfFistProuct = indexOfLastProduct -productsPerPage
const currentProduct = product.slice(indexOfFistProuct,indexOfLastProduct)

const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

return (
    <div>
        
    <Produc product={currentProduct}/>
    <ProductPagination productsPerPage={productsPerPage} totalProduct={product.length} pagination={paginate}/>
  
    </div>
    
  );
  
}


export default Product