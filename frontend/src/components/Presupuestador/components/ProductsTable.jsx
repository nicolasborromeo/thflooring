import { twoDecimalsParser, calculateTotal } from './helperFunctions';
import { useModal } from '../../Modal/Modal';
import ProductsModal from './ProductsModal';
import { usePresupuesto } from '../../../context/PresupuestoContext';

export default function ProductsTable({ printMode, setFilterText, prodDetails, setProdDetails, setRowIndex, productData }) {

    const handleInputChange = (index, col, newValue) => {
        setProdDetails((prev) => (
            prev.map((productRow, i) => {
                if (i === index) {
                    let updatedRow = { ...productRow }
                    updatedRow[col] = newValue
                    updatedRow['precioTotal'] = twoDecimalsParser(calculateTotal(updatedRow))
                    return updatedRow
                } else return productRow
            })
        ))
    }
    return (
        <div className='section'>
            <h3>DETALLE</h3>
            <>
                <table className="details-table">
                    <thead>
                        <ProductTableHeaders />
                    </thead>
                    <tbody id="detalle-body">
                        {prodDetails.map((product, i) => (
                            <TableRow
                                key={i}
                                index={i}
                                product={product}
                                handleInputChange={handleInputChange}
                                printMode={printMode}
                                setFilterText={setFilterText}
                                setRowIndex={setRowIndex}
                                productData={productData}
                            />
                        ))}
                    </tbody>
                </table>
            </>
        </div>
    )
}



export function ProductTableHeaders() {
    return (
        <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Cant.</th>
            <th>P. Unit</th>
            <th>Desc.</th>
            <th>P. Tot.</th>
        </tr>
    )
}

export function TableRow({ index, product, handleInputChange, printMode, setFilterText, setRowIndex, productData }) {
    const {setModalContent} = useModal()
    const {filterText, selectedProd, setSelectedProd, rowIndex, prodDetails, setProdDetails} = usePresupuesto()


    if (printMode) {
        return (
            <tr>
                <td><span>{product.codigo}</span></td>
                <td><span>{product.descripcion}</span></td>
                <td><span>{product.cantidad}</span></td>
                <td><span>{product.precioUnit}</span></td>
                <td><span>{product.descuento}</span></td>
                <td><span>{product.precioTotal}</span></td>
            </tr>
        );
    }
    return (
        <tr>
            <td>
                <input
                    className="detalle-input"
                    type="text"
                    name="codigo"
                    value={product.codigo || ''}
                    onChange={(e) => handleInputChange(index, 'codigo', e.target.value)}
                />
            </td>
            <td>
                <input
                    className="detalle-input"
                    type="text"
                    name="descripcion"
                    value={product.descripcion || ''}
                    onChange={(e) => {
                        e.target.value = e.target.value.toUpperCase();
                        handleInputChange(index, 'descripcion', e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.includes('?')) {
                            e.preventDefault()
                            setRowIndex(index)
                            setFilterText(e.target.value.split('?')[1])
                            setModalContent(<ProductsModal
                                productData={productData}
                                filterText={filterText}
                                selectedProd={selectedProd}
                                setSelectedProd={setSelectedProd}
                                rowIndex={rowIndex}
                                prodDetails={prodDetails}
                                setProdDetails={setProdDetails}
                                />)
                        }
                    }}
                />
            </td>
            <td>
                <input
                    className="detalle-input"
                    type="number"
                    name="cantidad"
                    value={product.cantidad || ''}
                    onChange={(e) => handleInputChange(index, 'cantidad', e.target.value)}
                />
            </td>
            <td>
                <input
                    className="detalle-input"
                    type="number"
                    name="precioUnit"
                    value={product.precioUnit || ''}
                    onChange={(e) => handleInputChange(index, 'precioUnit', e.target.value)}
                />
            </td>
            <td>
                <input
                    className="detalle-input"
                    type="number"
                    name="descuento"
                    value={product.descuento || ''}
                    onChange={(e) => handleInputChange(index, 'descuento', e.target.value)}
                />
            </td>
            <td>
                <input
                    className="detalle-input"
                    type="number"
                    name="precioTotal"
                    value={product.precioTotal || ''}
                    readOnly
                />
            </td>
        </tr>
    );
}
