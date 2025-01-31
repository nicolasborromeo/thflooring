import { useState, useEffect } from "react"

export default function IVASection({ printMode, prodDetails, total, setTotal }) {
    const [ivaIncluido, setIvaIncluido] = useState(true)
    const [showIvaDisc, setShowIvaDisc] = useState(false)
    const [moneda, setMoneda] = useState('USD')


    useEffect(() => {
        let total = prodDetails.reduce((acc, prod) => {
            return acc += prod['precioTotal']
        }, 0)

        setTotal(total)
    }, [prodDetails, setTotal])




    if (printMode) return (
        <div className="iva-and-totals">
            <div className="iva">
                <section>
                    <label htmlFor="moneda-options" id="moneda-label">Moneda:</label>
                    <span className="input-span">{moneda}</span>
                </section>
                <section>
                    <label htmlFor="iva-incluido">IVA Incluido:</label>
                    <span className="input-span">{ivaIncluido ? 'Si' : 'No'}</span>
                </section>
                <section>
                    <label htmlFor="iva-discriminado">IVA Discriminado:</label>
                    <span className="input-span">{showIvaDisc ? 'Si' : 'No'}</span>
                </section>
            </div>

            <div id="totals">
                <div className="inside-totals">
                    <label htmlFor="total">{showIvaDisc ? 'SUB TOTAL: ' : 'TOTAL:'}</label>
                    <span className="input-span">{showIvaDisc ? (Number(total) / 1.21).toFixed(2) : Number(total)}</span>
                </div>
                <div className={showIvaDisc ? 'inside-totals' : 'hidden'}>
                    <label>IVA:</label>
                    <p>{(Number(total) - (Number(total) / 1.21)).toFixed(2)}</p>
                </div>
                <div className={showIvaDisc ? 'inside-totals separation' : 'hidden'}>
                    <label><strong>TOTAL:</strong></label>
                    <p >{Number(total).toFixed(2)}</p>
                </div>
            </div>

            {/* <div className={showIvaDisc ? 'iva-discriminado-div' : 'hidden'}>
                <p><strong>IVA:</strong>{(Number(total) - Number(total) / 1.21).toFixed(2)}</p>
                <p><strong>TOTAL:</strong>{Number(total).toFixed(2)}</p>
            </div> */}
        </div>
    )

    return (
        <div className="iva-and-totals">
            <div className="iva">
                <section>
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
                </section>
                <section>
                    <label htmlFor="iva-incluido">IVA Incluido:</label>
                    <input
                        type="checkbox"
                        id="iva-incluido"
                        name="iva-incluido"
                        defaultChecked
                        onChange={() => setIvaIncluido((prev) => !prev)}
                    />
                </section>
                <section>
                    <label htmlFor="iva-discriminado">IVA Discriminado:</label>
                    <input
                        type="checkbox"
                        id="iva-discriminado"
                        name="iva-discriminado"
                        checked={showIvaDisc}
                        onChange={() => setShowIvaDisc((prev) => !prev)}
                    />
                </section>
            </div>
            <div id="totals">
                <div className="inside-totals">
                    <label htmlFor="total">{showIvaDisc ? 'SUB TOTAL: ' : 'TOTAL:'}</label>
                    <p type="number" id="total" name="total" readOnly>{showIvaDisc ? (Number(total) / 1.21).toFixed(2) : Number(total).toFixed(2)}</p>
                </div>
                <div className={showIvaDisc ? 'inside-totals' : 'hidden'}>
                    <label>IVA:</label>
                    <p>{(Number(total) - (Number(total) / 1.21)).toFixed(2)}</p>
                </div>
                <div className={showIvaDisc ? 'inside-totals separation' : 'hidden'}>
                    <label><strong>TOTAL:</strong></label>
                    <p >{Number(total).toFixed(2)}</p>
                </div>
            </div>

        </div>
    )
}
