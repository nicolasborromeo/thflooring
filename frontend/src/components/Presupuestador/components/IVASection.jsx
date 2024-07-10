import { useState, useEffect } from "react"

export default function IVASection({ printMode, prodDetails }) {
    const [ivaIncluido, setIvaIncluido] = useState(true)
    const [showIvaDisc, setShowIvaDisc] = useState(false)
    const [moneda, setMoneda] = useState('USD')
    const [total, setTotal] = useState(0)
    const [fixedTotal, setFixedTotal] = useState(0)

    useEffect(() => {
        let total = prodDetails.reduce((acc, prod) => {
            return acc += prod['precioTotal']
        }, 0)

        setTotal(total)
    }, [prodDetails])

    useEffect(()=> {
        setFixedTotal(total.toFixed(2))
    }, [total])


    if (printMode) return (
        <>
            <div className="iva-descuento">
                <label htmlFor="moneda-options" id="moneda-label">Moneda:</label>
                <span className="input-span">{moneda}</span>

                <label htmlFor="iva-incluido">IVA Incluido:</label>
                <span className="input-span">{ivaIncluido ? 'Si' : 'No'}</span>

                <label htmlFor="iva-discriminado">IVA Discriminado:</label>
                <span className="input-span">{showIvaDisc ? 'Si' : 'No'}</span>

                <label htmlFor="total">TOTAL:</label>
                <span className="input-span">{showIvaDisc ? (total * 0.79).toFixed(2) : total}</span>
            </div>

            <div id="iva-discriminado-div" className={showIvaDisc ? 'iva-discriminado-class' : 'hidden'}>
                <p ><strong>IVA:</strong>{(total * 0.21).toFixed(2)}</p>
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


                <label htmlFor="total">TOTAL:</label>

                <input type="number" id="total" name="total" value={showIvaDisc ? (total * 0.79).toFixed(2) : fixedTotal}
                    onChange={(e) => setTotal(e.target.value)}
                />


            </div>

            <div id="iva-discriminado-div" className={showIvaDisc ? 'iva-discriminado-class' : 'hidden'}>
                <p ><strong>IVA:</strong>{(total * 0.21).toFixed(2)}</p>
            </div>
        </>
    )
}
