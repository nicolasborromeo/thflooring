
function ProductRow({product}){
    let prodRow = []
    for (let key in product) {
       prodRow.push(<td key={product.id}>{product[key]}</td>)
    }
    return ([prodRow])
}


export default ProductRow
