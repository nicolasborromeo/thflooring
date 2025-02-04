import { createContext, useContext, useState, useEffect } from "react";
import { csrfFetch } from "../csrf/csrf";

const PresupuestoContext = createContext()

export function PresupuestoProvider({ children }) {
    const [selectedProd, setSelectedProd] = useState()
    const [printMode, setPrintMode] = useState(false)
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

        if(prodDetails) {
            prodDetails.forEach(prod => {
                console.log(prod)
                if(prod.cantidad && !prod.descripcion) {
                    alert('You have to add a description to all the products')
                    return
                }
            })
        }

        const formData = new FormData(e.target)
        const formObject = Object.fromEntries(formData)
        const keysToRemove = ['codigo', 'descripcion', 'descuento', 'precioTotal', 'precioUnit', 'cantidad', 'total'];
        keysToRemove.forEach(key => delete formObject[key]);
        const iva = formObject['iva-incluido'] ? true : false
        const ivaDisc = formObject['iva-discriminado'] ? true : false
        const products = prodDetails.filter(prod => prod.descripcion !== '')
        const payload = { ...formObject, codigo, iva, ivaDisc, products, total }

        if(!products.length) {
            alert('You have no products in this quote')
            return
        }


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
            alert('Error saving this quote, you might already have it stored')
            console.error('Error saving in the database:', error);
        }
    }

    const fetchPresupuestos = async () => {
        const response = await fetch('/api/presupuestos')
        const result = await response.json()
        setCodigo(result[0].id + 1001) //this only works because on the api I'm return the last one first (order:DESC)
        // setCodigo(result[0].codigo + 1)
    }
    useEffect(() => {
        fetchPresupuestos()
    }, [])


    const contextValue = {
        selectedProd, setSelectedProd,
        printMode, setPrintMode,
        filterText, setFilterText,
        rowIndex, setRowIndex,
        codigo, setCodigo,
        total, setTotal,
        prodDetails, setProdDetails,
        submitForm, fetchPresupuestos
    }

    return (
        <PresupuestoContext.Provider value={contextValue}>
            {children}
        </PresupuestoContext.Provider>
    )

}

export const usePresupuesto = () => useContext(PresupuestoContext)
