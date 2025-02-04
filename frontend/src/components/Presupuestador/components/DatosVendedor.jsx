import { useEffect, useState } from "react"
import { calculateFechaVenc } from "../../../utils/helperFunctions"
import { fechaArgentina } from "../../../utils/helperFunctions"

export default function DatosVendedor({ printMode, presupuesto}) {
    const [vendedor, setVendedor] = useState('')
    const [telVendedor, setTelVendedor] = useState('')
    const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10))
    const [fechaVenc, setFechaVenc] = useState(calculateFechaVenc)

    useEffect(() => {
        if(presupuesto) {
            setVendedor(presupuesto.vendedor || '')
            setTelVendedor(presupuesto.telVendedor || '')
            setFecha(fechaArgentina(presupuesto.fecha) || new Date().toISOString().slice(0, 10))
            setFechaVenc(fechaArgentina(presupuesto.fechaVenc) || calculateFechaVenc)
        }
    }, [presupuesto])

    return (
        <div className="section">
            {printMode ? (null
            ) : (
                <h3 id="vendedor-h3">VENDEDOR</h3>
            )}
            <div id="presupuestador-from" name="presupuestador-form" className="presupuestador-from">
                <div className="vendedor-container">
                    <span className="detalle-vendedor">
                        <label htmlFor="vendedor">Representante Comercial:</label>
                        {printMode ? (
                            <span>{vendedor}</span>
                        ) : (
                            <input
                                type="text"
                                id="vendedor"
                                name="vendedor"
                                value={vendedor}
                                onInput={(e) => {
                                    e.target.value = e.target.value.toUpperCase()
                                    setVendedor(e.target.value)
                                }}
                            />
                        )}
                        <label htmlFor="telefono-vendedor">Telefono Vendedor:</label>
                        {printMode ? (
                            <span>{telVendedor}</span>
                        ) : (
                            <input
                                type="text"
                                id="telefono-vendedor"
                                name="telVendedor"
                                value={telVendedor}
                                onChange={(e) => setTelVendedor(e.target.value)}
                            />
                        )}
                    </span>
                    <span className="fechas">
                        <label htmlFor="fecha">Fecha:</label>
                        {printMode ? (
                            <span>{fecha}</span>
                        ) : (
                            <input
                                type="date"
                                id="fecha"
                                name="fecha"
                                defaultValue={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                            />
                        )}
                        <label htmlFor="fecha-venc">Fecha Venc:</label>
                        {printMode ? (
                            <span>{fechaVenc}</span>
                        ) : (
                            <input
                                type="date"
                                id="fecha-venc"
                                name="fechaVenc"
                                defaultValue={fechaVenc}
                                onChange={(e) => setFechaVenc(e.target.value)}
                            />
                        )}
                    </span>
                </div>
            </div>
        </div>
    )
}
