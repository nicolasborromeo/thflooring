import './presupuestador.css'
import './print.css'

import { calculateTotal, twoDecimalsParser } from './components/helperFunctions';
import { useState, useEffect } from 'react';

import EspecificacionesVenta from './components/EspecificacionesVenta'
import ProductsTable from './components/ProductsTable';
import DatosVendedor from './components/DatosVendedor'
import ActionButtons from './components/ActionButtons'
import DatosClientes from './components/DatosCliente'
import Comentario from './components/Comentario'
import PrintHead from './components/PrintHead';
import Modal from './components/Modal'


function Presupuestador({ productData }) {
    const [presupuestos, setPresupuestos] = useState([])
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

        const iva =  formObject['iva-incluido'] ? true : false
        const ivaDisc =  formObject['iva-discriminado'] ? true : false
        const products = prodDetails.filter(prod => prod.descripcion !== '')

        const payload = {...formObject, codigo, iva, ivaDisc, products, total}

        try {
            const response = await fetch(`/api/presupuestos`, {
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

    const handleInputChange = (index, col, newValue) => {
        setProdDetails((prev) => (
            prev.map((productRow, i) => {
                if (i === index) {
                    let updatedRow = {...productRow}
                    updatedRow[col] = newValue
                    updatedRow['precioTotal'] = twoDecimalsParser(calculateTotal(updatedRow))
                    return updatedRow
                } else return productRow
            })
        ))
    }

    useEffect(()=> {
        const fetchPresupuestos = async () => {
            const response = await fetch('/api/presupuestos')
            const result = await response.json()
            setPresupuestos(result)
            setCodigo(result[0].id + 1001) //this only works because on the api I'm return the last one first (order:DESC)
        }
        fetchPresupuestos()
    }, [])


    return (
        <>
            <form className="presupuestador-form"
                 onSubmit={submitForm}
                >
                <>
                    <div className='logo-container'>
                        <img src={'/th-logo.png'} className='company-logo' />
                    </div>
                    {printMode && <PrintHead
                        presupuestos={presupuestos}
                        codigo={codigo}
                    />}

                    <DatosVendedor
                        printMode={printMode}
                        presupuestos={presupuestos}
                    />
                    <DatosClientes
                        printMode={printMode}
                    />
                    <ProductsTable
                        prodDetails={prodDetails}
                        setProdDetails={setProdDetails}
                        handleInputChange={handleInputChange}
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
                    <EspecificacionesVenta
                        printMode={printMode}
                    />
                    <Comentario
                        printMode={printMode}
                    />
                    <ActionButtons
                        printMode={printMode}
                        setPrintMode={setPrintMode}
                        submitForm={submitForm}
                    />
                </>
            </form>

            {showModal &&
                <Modal
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
        </>

    );
}

export default Presupuestador
