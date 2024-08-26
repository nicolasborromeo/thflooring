import { useState, useEffect } from "react"

export default function IVASection({ printMode, prodDetails }) {
    const [ivaIncluido, setIvaIncluido] = useState(true)
    const [showIvaDisc, setShowIvaDisc] = useState(false)
    const [moneda, setMoneda] = useState('USD')
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let total = prodDetails.reduce((acc, prod) => {
            return acc += prod['precioTotal']
        }, 0)

        setTotal(total)
    }, [prodDetails])




    if (printMode) return (
        <>
            <div className="iva-descuento">
                <label htmlFor="moneda-options" id="moneda-label">Moneda:</label>
                <span className="input-span">{moneda}</span>

                <label htmlFor="iva-incluido">IVA Incluido:</label>
                <span className="input-span">{ivaIncluido ? 'Si' : 'No'}</span>

                <label htmlFor="iva-discriminado">IVA Discriminado:</label>
                <span className="input-span">{showIvaDisc ? 'Si' : 'No'}</span>

                <label htmlFor="total">{showIvaDisc ? 'SUB TOTAL: ' : 'TOTAL:'}</label>
                <span className="input-span">{showIvaDisc ? (total / 1.21).toFixed(2) : total}</span>
            </div>

            <div id="iva-discriminado-div" className={showIvaDisc ? 'iva-discriminado-class' : 'hidden'}>
                <p ><strong>IVA:</strong>{(total - total / 1.21).toFixed(2)}</p>
                <p style={{padding: '10px 0', margin:'10px 0', borderTop: '1px solid lightgray', maxWidth: '100%'}}><strong>TOTAL:</strong>{total}</p>
            </div>
        </>
    )

    return (
        <>
            <div className="iva-descuento">

                <label htmlFor="moneda-options" id="moneda-label">Moneda:</label>

                <select
                    name="moneda"
                    id="moneda-select"
                    defaultValue={moneda}
                    onChange={(e) => setMoneda(e.target.value)}
                >
                    <option value="USD">USD</option>
                    <option value="ARS">ARS</option>
                </select>



                <label htmlFor="iva-incluido">IVA Incluido:</label>

                <input
                    type="checkbox"
                    id="iva-incluido"
                    name="iva-incluido"
                    defaultChecked
                    onChange={() => setIvaIncluido((prev) => !prev)}
                />



                <>
                    <label htmlFor="iva-discriminado">IVA Discriminado:</label>
                    <input
                        type="checkbox"
                        id="iva-discriminado"
                        name="iva-discriminado"
                        defaultChecked={false}
                        onChange={() => setShowIvaDisc((prev) => !prev)}
                    />
                </>


                <label htmlFor="total">{showIvaDisc ? 'SUB TOTAL: ' : 'TOTAL:'}</label>

                <input type="number" id="total" name="total" value={showIvaDisc ? (total / 1.21).toFixed(2) : Number(total).toFixed(2)}
                    onChange={(e) => setTotal(e.target.value)}
                />


            </div>

            <div id="iva-discriminado-div" className={showIvaDisc ? 'iva-discriminado-class' : 'hidden'}>
                <p ><strong>IVA:</strong>{(total - (total / 1.21)).toFixed(2)}</p>
                <p style={{padding: '10px 0', margin:'10px 0', borderTop: '1px solid lightgray', maxWidth: '100%'}}><strong>TOTAL:</strong>{total}</p>
            </div>
        </>
    )
}
