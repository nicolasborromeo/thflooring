import EspecificacionesVenta from './components/EspecificacionesVenta';
import ProductsTable from './components/ProductsTable';
import DatosVendedor from './components/DatosVendedor';
import ActionButtons from './components/ActionButtons';
import DatosClientes from './components/DatosCliente';
import Comentario from './components/Comentario';
import IVASection from './components/IVASection';
import PrintHead from './components/PrintHead';
import { useEffect } from 'react';


export default function Presupuesto({ presupuesto, submitForm, codigo, printMode, setPrintMode, prodDetails, setProdDetails, showModal, setShowModal, filterText, setFilterText, setRowIndex, total, setTotal }) {

    // TODO
    /*
    setProdDetails, setTotal, total, setCodigo, printMode, etc IS NOT A FUNCTION. useContext?
    */



    // console.log(presupuesto)
        // useEffect(()=> {
        //     if (presupuesto){
        //     setProdDetails(presupuesto.ProductDetails || [])
        //     setCodigo(presupuesto.codigo || `10${presupuesto?.id || "EDIT"}`)
        // }
        // }, [setProdDetails, presupuesto, codigo, setCodigo])
        // console.log(presupuesto.ProductDetails)
        useEffect(() => {
            console.log('PRESUPUESTO: ', presupuesto)
            if (presupuesto) {
                setProdDetails((prevProdDetails)=>
                    [...prevProdDetails,
                    ...Array(10 - prevProdDetails.length)].map(() => ({
                        codigo: '',
                        descripcion: '',
                        cantidad: '',
                        precioUnit: '',
                        descuento: '',
                        precioTotal: ''
                    }))
            )
            console.log('prodDETAILS',prodDetails)
            }
        }, [presupuesto, prodDetails])


    return (
        <form className="presupuestador-form"
            onSubmit={submitForm}
        >
            <>
                <div className='logo-container'>
                    <img src={'/th-logo.png'} className='company-logo' />
                </div>
                {printMode && <PrintHead
                    codigo={codigo}
                />}

                <DatosVendedor
                    printMode={printMode}
                    presupuesto={presupuesto}
                />
                <DatosClientes
                    printMode={printMode}
                    presupuesto={presupuesto}
                />
                <ProductsTable
                    presupuesto={presupuesto}
                    prodDetails={prodDetails}
                    setProdDetails={setProdDetails}
                    printMode={printMode}
                    setPrintMode={setPrintMode}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setFilterText={setFilterText}
                    filterText={filterText}
                    setRowIndex={setRowIndex}
                    total={total}
                    setTotal={setTotal}
                />
                <IVASection
                    prodDetails={prodDetails}
                    printMode={printMode}
                    total={total}
                    setTotal={setTotal}
                    presupuesto={presupuesto}
                />
                <EspecificacionesVenta
                    printMode={printMode}
                />
                <Comentario
                    printMode={printMode}
                    presupuesto={presupuesto}
                />
                <ActionButtons
                    printMode={printMode}
                    setPrintMode={setPrintMode}
                    submitForm={submitForm}
                />
            </>
        </form>
    )
}
