import './presupuestador.css'
import './print.css'

import { csrfFetch } from '../../csrf/csrf';

import { useState, useEffect } from 'react';

import ProductsModal from './components/ProductsModal'
import Presupuesto from './Presupuesto';


function Presupuestador({ productData }) {
    const [selectedProd, setSelectedProd] = useState()
    const [printMode, setPrintMode] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [filterText, setFilterText] = useState('')
    const [rowIndex, setRowIndex] = useState('')
    const [codigo, setCodigo] = useState()
    const [total, setTotal] = useState()
    const [prodDetails, setProdDetails] = useState(
        [...Array(10)].map(() => ({
            codigo: '',
            descripcion: '',
            cantidad: '',
            precioUnit: '',
            descuento: '',
            precioTotal: ''
        }))
    )

    const submitForm = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formObject = Object.fromEntries(formData)
        const keysToRemove = ['codigo', 'descripcion', 'descuento', 'precioTotal', 'precioUnit', 'cantidad', 'total'];
        keysToRemove.forEach(key => delete formObject[key]);
        const iva = formObject['iva-incluido'] ? true : false
        const ivaDisc = formObject['iva-discriminado'] ? true : false
        const products = prodDetails.filter(prod => prod.descripcion !== '')
        const payload = { ...formObject, codigo, iva, ivaDisc, products, total }
        try {
            const response = await csrfFetch(`/api/presupuestos`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const responseData = await response.json();
            if (response.ok) {
                alert(responseData.message);
            } else {
                alert(`Error: ${responseData.message}`);
            }
        } catch (error) {
            console.error('Error saving in the database:', error);
        }
    }

    useEffect(() => {
        const fetchPresupuestos = async () => {
            const response = await fetch('/api/presupuestos')
            const result = await response.json()
            setCodigo(result[0].id + 1001) //this only works because on the api I'm return the last one first (order:DESC)
        }
        fetchPresupuestos()
    }, [])


    return (
        <div className='presupuestador-container'>

            <Presupuesto
                submitForm={submitForm}
                codigo={codigo}
                setCodigo={setCodigo}
                prodDetails={prodDetails}
                setProdDetails={setProdDetails}
                printMode={printMode}
                setPrintMode={setPrintMode}
                showModal={showModal}
                setShowModal={setShowModal}
                selectedProd={selectedProd}
                setFilterText={setFilterText}
                filterText={filterText}
                setRowIndex={setRowIndex}
                total={total}
                setTotal={setTotal}
            />

            {showModal &&
                <ProductsModal
                    productData={productData}
                    setShowModal={setShowModal}
                    filterText={filterText}
                    selectedProd={selectedProd}
                    setSelectedProd={setSelectedProd}
                    rowIndex={rowIndex}
                    prodDetails={prodDetails}
                    setProdDetails={setProdDetails}
                />
            }
        </div>

    );
}

export default Presupuestador
