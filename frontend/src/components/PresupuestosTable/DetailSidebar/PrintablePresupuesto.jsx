import './modalpresupuesto.css'
import { fechaArgentina } from '../../../utils/helperFunctions'
import { ProductTableHeaders } from '../../Presupuestador/components/ProductsTable'
import EspecificacionesVenta from "../../Presupuestador/components/EspecificacionesVenta"

export default function PrintablePresupuesto({ presupuesto }) {
    const { ProductDetails, codigo, telVendedor, vendedor, fecha, fechaVenc, cliente, direccion, provincia, localidad, codigoPostal, condicion, cuit, telCliente, emailCliente, iva, ivaDisc, moneda, total, comentarios } = presupuesto

    return (
        <div className="presupuesto-modal-container">

            <div className='logo-container'>
                <img src={'/th-logo.png'} className='company-logo' />
            </div>

            <div className="presupuesto-info-container">
                <div className="presupuesto-header">
                    <h2>PRESUPUESTO</h2>
                    <p className="presupuesto-num" id="presupuesto-num-span">#000-{codigo}</p>
                </div>
                <span className="presupuesto-subtext">*No valido como factura</span>
            </div>

            <div className="section vendedor">
                <div id="presupuestador-from" name="presupuestador-form" className="presupuestador-from">
                    <div className="vendedor-container">
                        <span className="detalle-vendedor">
                            <label htmlFor="representante">Representante Comercial:</label><span>{vendedor}</span>
                            <label htmlFor="telefono-vendedor">Telefono Vendedor:</label><span>{telVendedor}</span>
                        </span>
                        <span className="fechas">
                            <label htmlFor="fecha">Fecha:</label><span>{fechaArgentina(fecha)}</span>
                            <label htmlFor="fecha-venc">Fecha Venc:</label><span>{fechaArgentina(fechaVenc)}</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="section">
                <h3>CLIENTE</h3>
                <div className="cliente-direccion">
                    <label htmlFor="cliente">Cliente:</label><span>{cliente}</span>
                    <label htmlFor="direccion">Dirección:</label><span>{direccion}</span>
                </div>
                <div className="prov-loc-cp">
                    <label htmlFor="provincia">Provincia:</label><span>{provincia}</span>
                    <label htmlFor="loc">Loc.:</label><span>{localidad}</span>
                    <label htmlFor="cp">C.P.:</label> <span>{codigoPostal}</span>
                </div>
                <div className="condicion-cuit">
                    <label htmlFor="condicion">Condición:</label><span>{condicion}</span>
                    <label htmlFor="cuit">C.U.I.T.:</label><span>{cuit}</span>
                </div>
                <div className="telefono-cliente-container">
                    <label htmlFor="telefono-cliente">Teléfono:</label><span>{telCliente}</span>
                    <label htmlFor="email-cliente">Email:</label><span>{emailCliente}</span>
                </div>
            </div>

            <div className='section'>
                <h3>DETALLE</h3>
                <table className="details-table">
                    <thead>
                        <ProductTableHeaders />
                    </thead>
                    <tbody id="detalle-body" className='detalle-products'>
                        {ProductDetails.map((product, i) => (
                            <tr key={i}>
                                <td><span>{product.codigo}</span></td>
                                <td><span>{product.descripcion}</span></td>
                                <td><span>{product.cantidad}</span></td>
                                <td><span>{product.precioUnit}</span></td>
                                <td><span>{product.descuento}</span></td>
                                <td><span>{product.precioTotal}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

               

                <div className="iva-and-totals">
                    <div className="iva">
                        <section>
                            <label htmlFor="moneda-options" id="moneda-label">Moneda:</label>
                            <span className="input-span">{moneda}</span>
                        </section>
                        <section>
                            <label htmlFor="iva-incluido">IVA Incluido:</label>
                            <span className="input-span">{iva ? 'Si' : 'No'}</span>
                        </section>
                        <section>
                            <label htmlFor="iva-discriminado">IVA Discriminado:</label>
                            <span className="input-span">{ivaDisc ? 'Si' : 'No'}</span>
                        </section>
                    </div>

                    <div id="totals">
                        <div className="inside-totals">
                            <label htmlFor="total">{ivaDisc ? 'SUB TOTAL: ' : 'TOTAL:'}</label>
                            <span className="input-span">{ivaDisc ? (Number(total) / 1.21).toFixed(2) : Number(total)}</span>
                        </div>
                        <div className={ivaDisc ? 'inside-totals' : 'hidden'}>
                            <label>IVA:</label>
                            <p>{(Number(total) - (Number(total) / 1.21)).toFixed(2)}</p>
                        </div>
                        <div className={ivaDisc ? 'inside-totals separation' : 'hidden'}>
                            <label><strong>TOTAL:</strong></label>
                            <p >{Number(total).toFixed(2)}</p>
                        </div>
                    </div>
                </div>




                <EspecificacionesVenta className='modal-especificaciones-venta' />

                <div className="section comentario">
                    <h3>COMENTARIO</h3>
                    <span>{comentarios}</span>
                </div>

            </div>

        </div>
    )
}
