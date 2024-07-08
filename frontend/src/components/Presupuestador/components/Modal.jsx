import './modal.css'
import { useEffect, useState, useCallback } from 'react'
import { IoBackspaceSharp } from "react-icons/io5";


const TableBody = ({ productData, setSelectedProd, filterText }) => {

    if (filterText) productData = productData.filter(prod => prod.descripcion.includes(filterText))

    const [selectedRow, setSelectedRow] = useState()

    useEffect(() => {
        setSelectedProd(productData[selectedRow])
    }, [setSelectedProd, productData, selectedRow])


    return (
        <tbody>
            {
                productData.map((productObj, index) => (
                    <tr key={index}
                        onClick={() => (setSelectedRow(index))}
                        className={selectedRow === index ? 'selected-row' : ''}
                    >
                        <td>{productObj.codigo}</td>
                        <td>{productObj.descripcion}</td>
                        <td>{productObj.medidasType}</td>
                        <td>{productObj.precio}</td>
                        <td>{productObj.company}</td>
                    </tr>
                ))
            }
        </tbody>
    )

}

export default function Modal({ productData, setShowModal, setSelectedProd, filterText, rowIndex, selectedProd, setProdDetails }) {

    const addProdDetails = useCallback((index, selectedProd) => {
        setProdDetails(prevProducts => {
            let updatedProducts = [...prevProducts];
            updatedProducts[index] = {
                ...updatedProducts[index],
                codigo: selectedProd.codigo,
                descripcion: selectedProd.descripcion,
                precioUnit: selectedProd.precio
            };
            return updatedProducts;
        });
    }, [setProdDetails]);

    // const onChange = (e) => {
    //     const value = e.target.value
    //     return productData.filter(prod => prod.toLowerCase().includes(value))
    // }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter' && selectedProd) {
                addProdDetails(rowIndex, selectedProd)
                setShowModal(false)
                setSelectedProd(null)
            }
        }
        if (selectedProd) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [selectedProd, rowIndex, addProdDetails, setShowModal, setSelectedProd]);


    productData = productData.filter(prod => prod.descripcion.includes(filterText))
    if (!productData.length) return (
        <div className="modal">
            <div className="not-found-content" >
                <span style={{height: 'min-content', margin: '10px'}}>No products found</span>
                <button><IoBackspaceSharp
                    className='not-found-close-button'
                    onClick={() => {
                    setShowModal(false)
                    setSelectedProd(null)
                    }}/></button>

            </div>
        </div>
    )

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setShowModal(false)}>&times;</span>

                {/* Search: <input onChange={onChange} type="search" placeholder='additional filtering...'/>
                <br /> */}
                <table id="products-ui">
                    <thead><tr><th>Codigo</th><th>Descripcion</th><th>Un. Med.</th><th>Precio</th><th>Compania</th></tr></thead>
                    <TableBody
                        productData={productData}
                        setSelectedProd={setSelectedProd}
                        filterText={filterText}
                    />
                </table>

                <div className="add-cancel">
                    <button
                        className="add-cancel-buttons"
                        id="agregar"
                        onClick={() => {
                            addProdDetails(rowIndex, selectedProd)
                            setShowModal(false)
                        }}

                    >
                        Agregar
                    </button>

                    <button
                        className="add-cancel-buttons"
                        id="cancelar"
                        onClick={() => { setShowModal(false) }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>

    )
}
