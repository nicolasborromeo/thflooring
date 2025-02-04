import './productsmodal.css'
import { useEffect, useState, useCallback } from 'react'
import { IoBackspaceSharp } from "react-icons/io5";
import { useProducts } from '../../../context/ProductsContext';
import { useModal } from '../../Modal/Modal';
import { usePresupuesto } from '../../../context/PresupuestoContext';


const TableBody = ({ filteredData, setSelectedProd }) => {
    const [selectedRow, setSelectedRow] = useState()

    useEffect(() => {
        setSelectedProd(filteredData[selectedRow])
    }, [setSelectedProd, filteredData, selectedRow])


    return (
        <tbody>
            {
                filteredData.map((productObj, index) => (
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

export default function ProductsModal() {
    const { filterText, rowIndex, selectedProd, setSelectedProd, setProdDetails } = usePresupuesto();
    const {productData} = useProducts()
    const {setModalContent} = useModal()

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



    useEffect(() => {
        const handleKeyDown = (event) => {

            if (event.key === 'Enter' && selectedProd) {
                addProdDetails(rowIndex, selectedProd)
                setModalContent(null)
                setSelectedProd(null)
            }
        }
        if (selectedProd) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [selectedProd, rowIndex, addProdDetails, setModalContent, setSelectedProd]);


    const filteredData = productData.filter(prod => prod.descripcion.includes(filterText))
    if (!filteredData.length) return (
        <div className="modal">
            <div className="not-found-content" >
                <span style={{height: 'min-content', margin: '10px'}}>No products found</span>
                <button><IoBackspaceSharp
                    className='not-found-close-button'
                    onClick={() => {
                    setModalContent(null)
                    setSelectedProd(null)
                    }}/></button>

            </div>
        </div>
    )

    return (
        <div>
            <div className="products-modal" >
                <table id="products-ui">
                    <thead><tr><th>Codigo</th><th>Descripcion</th><th>Un. Med.</th><th>Precio</th><th>Compania</th></tr></thead>
                    <TableBody
                        filteredData={filteredData}
                        setSelectedProd={setSelectedProd}
                        filterText={filterText}
                    />
                </table>
                <div className="add-cancel">
                    <button
                        className="add-cancel-buttons"
                        id="agregar"
                        onClick={() => {
                            {if(selectedProd) addProdDetails(rowIndex, selectedProd)}
                            setModalContent(null)
                        }}
                    >
                        Agregar
                    </button>
                    <button
                        className="add-cancel-buttons"
                        id="cancelar"
                        onClick={() => { setModalContent(null) }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>

    )
}
