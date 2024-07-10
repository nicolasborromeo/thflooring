
export default function PrintHead ({codigo}) {
    return (
        <>
            <div className="presupuesto-info-container">
                    <div className="presupuesto-header">
                        <h2>PRESUPUESTO</h2>
                        <p className="presupuesto-num" id="presupuesto-num-span">#000-{codigo}</p>
                    </div>
                    <span className="presupuesto-subtext">*No valido como factura</span>
            </div>
        </>
    )
}
