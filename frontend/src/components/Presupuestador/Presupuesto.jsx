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
import { useProducts } from '../../context/ProductsContext';

export default function Presupuesto({ presupuesto, edit = false, duplicate = false}) {
    const { submitForm, codigo, setCodigo, printMode, setPrintMode, prodDetails, setProdDetails, setFilterText, setRowIndex, total, setTotal, generateNewCodigo } = usePresupuesto()
    const { productData } = useProducts()

    // PRINTING LOGIC
    const printRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => printRef.current,
      onBeforeGetContent: () => {
        setPrintMode(true);
        return Promise.resolve();
      },
      onAfterPrint: () => {
        setPrintMode(false)
      }
    });


    // MODAL VIEW LOGIC // EDIT LOGIC // DUPLICATE LOGIC
    useEffect(() => {
        if(presupuesto) {
            setProdDetails(() => [...presupuesto.ProductDetails, ...[...Array(10 - presupuesto.ProductDetails.length)].map(() => ({
                codigo: '',
                descripcion: '',
                cantidad: '',
                precioUnit: '',
                descuento: '',
                precioTotal: ''
            }))])
            setPrintMode(() => (edit || duplicate) == true ? false : true)
        } else {
            // NEW PRESUPUESTO
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
        }, [setProdDetails, setPrintMode, presupuesto, edit, duplicate])

        useEffect(() => {
            if (!presupuesto || duplicate) {
              generateNewCodigo();
            } else if (presupuesto) {
              setCodigo(presupuesto.codigo);
            }
          }, [presupuesto, duplicate, edit, generateNewCodigo, setCodigo]);


    return (
        <form className="presupuestador-form"
            onSubmit={(e)=> {submitForm(e, edit)}}
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
                    edit={edit}
                    duplicate={duplicate}
                />
                <DatosClientes
                    printMode={printMode}
                    presupuesto={presupuesto}
                />
                <ProductsTable
                    printMode={printMode}
                    setFilterText={setFilterText}
                    prodDetails={prodDetails}
                    setProdDetails={setProdDetails}
                    setRowIndex={setRowIndex}
                    productData={productData}
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
                />
            </div>
        </form>
    )
}
