import ProductRow from '../Productos/ProductRow'
import SearchBar from '../SearchBar'

function ProductSearch({ products }) {
    // const headers = products.length > 0 ? Object.keys(products[0]) : [];
    const keys = Object.keys(products[0])
    const headers = keys.map(header => <th key={header}> {header} </th>)
    return (
        <div className="productos-container" >
            <div className='product-search-box'>
                {/* <h2 >Search Poducts</h2> */}
                <SearchBar />
                <table id="products-ui">
                    <thead>
                        <tr>
                            {headers}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <ProductRow product={product} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
    // return <h1>HI for Product Searchh</h1>
}

export default ProductSearch
