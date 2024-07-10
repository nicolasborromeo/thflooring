import './presupuestador.css'
import './print.css'

import { calculateTotal, twoDecimalsParser } from './components/helperFunctions';
import { useState, useEffect } from 'react';

import DatosVendedor from './components/DatosVendedor'
import DatosClientes from './components/DatosCliente'
import EspecificacionesVenta from './components/EspecificacionesVenta'
import Comentario from './components/Comentario'
import ActionButtons from './components/ActionButtons'
import Modal from './components/Modal'
import ProductsTable from './components/ProductsTable';
import PrintHead from './components/PrintHead';


function Presupuestador({ productData }) {
    const [presupuestos, setPresupuestos] = useState([])
    const [codigo, setCodigo] = useState()
    const [printMode, setPrintMode] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [filterText, setFilterText] = useState('')
    const [selectedProd, setSelectedProd] = useState()
    const [rowIndex, setRowIndex] = useState('')
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
        const keysToRemove = ['codigo', 'descripcion', 'descuento', 'precioTotal', 'precioUnit', 'cantidad'];
        keysToRemove.forEach(key => delete formObject[key]);

        // const codigo = presupuestos.length + 1001
        // const codigo = presupuestos[0].id + 1001
        const iva =  formObject['iva-incluido'] ? true : false
        const ivaDisc =  formObject['iva-discriminado'] ? true : false
        const products = prodDetails.filter(prod => prod.descripcion !== '')

        const payload = {...formObject, codigo, iva, ivaDisc, products}



        try {
            const response = await fetch(`/api/presupuestos`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
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

    const handleInputChange = (index, name, value) => {
        setProdDetails((prevProducts) => {
            let updatedProducts = [...prevProducts] //copy of the products
            updatedProducts[index] = { //copy of the specific prod
                ...updatedProducts[index], //and the rest
                [name]: value, //update value
            }
            updatedProducts[index] = {
                ...updatedProducts[index],
                precioTotal: twoDecimalsParser(calculateTotal(
                    updatedProducts[index]['precioUnit'],
                    updatedProducts[index]['cantidad'],
                    updatedProducts[index]['descuento']
                ))
            }
            return updatedProducts //return new state
        })
    }

    useEffect(()=> {
        const fetchPresupuestos = async () => {
            const response = await fetch('/api/presupuestos')
            const result = await response.json()
            setPresupuestos(result)
            setCodigo(result[0].id + 1001) //this only works because on the api I'm return the lastone first (order:DESC)
        }
        fetchPresupuestos()
    }, [])




    return (
        <>
            <form className="presupuestador-container"
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
