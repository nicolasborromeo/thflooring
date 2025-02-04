import { csrfFetch } from "../csrf/csrf";
import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext()

export function ProductsProvider ({children}) {
    const [products, setProducts] = useState()

    useEffect(()=> {
        const fetchProducts = async () => {
            try {
                const res = await csrfFetch('/api/products/')
                if(res.ok) {
                    const data = await res.json()
                    setProducts(data)
                } else {
                    console.log('There was an error fetching products')
                }
            } catch (error) {
                console.error("Error fetching products", error)
            }
        }
        fetchProducts()
    },[])

    return (
        <ProductContext.Provider value={{productData : products}}>
            {children}
        </ProductContext.Provider>
    )

}

export const useProducts = () => useContext(ProductContext);
