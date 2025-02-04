import EspecificacionesVenta from './components/EspecificacionesVenta';
import ProductsTable from './components/ProductsTable';
import DatosVendedor from './components/DatosVendedor';
import ActionButtons from './components/ActionButtons';
import DatosClientes from './components/DatosCliente';
import Comentario from './components/Comentario';
import IVASection from './components/IVASection';
import PrintHead from './components/PrintHead';
import { usePresupuesto } from '../../context/PresupuestoContext';
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function Presupuesto({ presupuesto }) {

    const { submitForm, codigo, setCodigo, printMode, setPrintMode, prodDetails, setProdDetails, filterText, setFilterText, setRowIndex, total, setTotal } = usePresupuesto()

    // Create a ref for the content to print
    const printRef = useRef();
    // Set up react-to-print so that handlePrint can be called programmatically
    const handlePrint = useReactToPrint({
      content: () => printRef.current,
      onBeforeGetContent: () => {
        setPrintMode(true); // <-- Set printMode to true before printing
        // Optionally, if you need to ensure asynchronous completion, return a promise:
        return Promise.resolve();
      },
    });

    useEffect(() => {
        if(presupuesto) {
            console.log(presupuesto)
            setProdDetails(presupuesto.ProductDetails)
            setPrintMode(true)
            setCodigo(presupuesto.codigo)
        } else {
            setPrintMode(false)
            setProdDetails(
                [...Array(10)].map(() => ({
                    codigo: '',
                    descripcion: '',
                    cantidad: '',
                    precioUnit: '',
                    descuento: '',
                    precioTotal: ''
                }))
            )
        }
        }, [setProdDetails, setPrintMode, presupuesto, setCodigo])



    return (
        <form className="presupuestador-form"
            onSubmit={submitForm}
        >
            <div ref={printRef}>
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
                    handlePrint={handlePrint}
                    printMode={printMode}
                    setPrintMode={setPrintMode}
                    submitForm={submitForm}
                />
            </div>
        </form>
    )
}
