import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { csrfFetch } from "../csrf/csrf";

const PresupuestoContext = createContext()

export function PresupuestoProvider({ children }) {
    const [presupuestos, setPresupuestos] = useState([])
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

    const submitForm = async (e, edit) => {
        e.preventDefault()

        if (prodDetails) {
            for (let prod of prodDetails) {
              if (prod.cantidad && !prod.descripcion) {
                alert('You have to add a description to all the products');
                return;
              } else if (prod.descripcion && (!prod.cantidad || !prod.precioUnit)) {
                alert('You need to add cantidad and precio to the products before submitting');
                return;
              }
            }
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
                method: edit == true ? 'PUT' : 'POST',
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

    const generateNewCodigo = useCallback (async () => {
        const response = await fetch('/api/presupuestos')
        const result = await response.json()
        setPresupuestos(result)
        setCodigo(result[0].id + 1001)
    },[])

    useEffect(() => {
        generateNewCodigo()
    }, [generateNewCodigo])


    const contextValue = {
        selectedProd, setSelectedProd,
        printMode, setPrintMode,
        filterText, setFilterText,
        rowIndex, setRowIndex,
        codigo, setCodigo,
        total, setTotal,
        prodDetails, setProdDetails,
        submitForm, generateNewCodigo,
        presupuestos
    }

    return (
        <PresupuestoContext.Provider value={contextValue}>
            {children}
        </PresupuestoContext.Provider>
    )

}

export const usePresupuesto = () => useContext(PresupuestoContext)
