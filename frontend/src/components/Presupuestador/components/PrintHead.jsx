
export default function PrintHead ({presupuestos}) {
    let codigoPresupuesto = (presupuestos[presupuestos.length -1].codigo) + 1
    return (
        <>
            <div className="presupuesto-info-container">
                    <div className="presupuesto-header">
                        <h2>PRESUPUESTO</h2>
                        <p className="presupuesto-num" id="presupuesto-num-span">#000-{codigoPresupuesto}</p>
                    </div>
                    <span className="presupuesto-subtext">*No valido como factura</span>
            </div>
        </>
    )
}
