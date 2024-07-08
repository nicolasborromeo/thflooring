import { fechaArgentina } from "../../../utils/helperFunctions"

function PresupuestoDetails({ selected, visible, handleClick, deletePresupuesto}) {


    if (!visible) return null

    if (!selected) return (
      <div style={{ maxWidth:'210px', minWidth:'210px', margin:'40px 20px'}}>
        <h3 className='presupuesto-title'>Presupuestos</h3>
        <p>Selecciona un presupuesto para ver los detalles</p>
      </div>
    )

    const {cliente, codigo, comentarios, condicion, fecha, fechaVenc,
    iva, moneda, telVendedor, total, vendedor, ProductsDetails} = selected

   

    return (
      <>

      <div className="presupuesto-details">
         <h3 className='presupuesto-title'>Presupuesto #{codigo} <button onClick={handleClick}> Ver</button></h3>
        <ul>

          <li>Vendedor: {vendedor}</li>
          <li>Telefono: {telVendedor}</li>
          <li>Fecha: {fechaArgentina(fecha)}</li>
          <li>Fecha Vencimiento: {fechaVenc ? fechaArgentina(fechaVenc) : null}</li>
          <li>Cliente: {cliente}</li>
          <li>Condicion: {condicion}</li>
          <li>Comentarios: {comentarios}</li>
          <li>IVA: {iva ? 'Incluido' : 'No Incluido'}</li>
          <li>Moneda: {moneda}</li>
          <li>Total: {total}</li>
        </ul>
        <h3>Products:</h3>

          {ProductsDetails.map((prod, index)=>(
            <ul key={index} className="product-detail-ul">
              <li>Codigo: {prod.codigo || 'Sin Codigo'}</li>
              <li>Descripcion: {prod.descripcion}</li>
              <li>Precio: {prod.precioUnit}</li>
              <li>Cantidad: {prod.cantidad}</li>
              {prod.descuent && <li>Descuento: {prod.descuento}</li>}
              <li>Precio Total: {prod.precioTotal}</li>
            </ul>
            ))
          }

      <div className="action-buttons-container">
        <button onClick={deletePresupuesto}>Delete</button>
      </div>
      </div>

      </>


    )
  }

  export default PresupuestoDetails;
