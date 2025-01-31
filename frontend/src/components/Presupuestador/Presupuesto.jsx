import EspecificacionesVenta from './components/EspecificacionesVenta'
import ProductsTable from './components/ProductsTable';
import DatosVendedor from './components/DatosVendedor'
import ActionButtons from './components/ActionButtons'
import DatosClientes from './components/DatosCliente'
import Comentario from './components/Comentario'
import PrintHead from './components/PrintHead';
import IVASection from './components/IVASection';


export default function Presupuesto({submitForm, codigo, printMode, setPrintMode, prodDetails, setProdDetails, showModal, setShowModal, selectedProd, filterText, setFilterText, setRowIndex, total, setTotal }) {

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
                />
                <DatosClientes
                    printMode={printMode}
                />
                <ProductsTable
                    prodDetails={prodDetails}
                    setProdDetails={setProdDetails}
                    // handleInputChange={handleInputChange}
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
                <IVASection
                    prodDetails={prodDetails}
                    printMode={printMode}
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


    )
}
