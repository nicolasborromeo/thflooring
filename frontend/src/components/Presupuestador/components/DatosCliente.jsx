import { useState, useEffect} from 'react'

export default function DatosClientes({ printMode, presupuesto }) {
    const [clientName, setClientName] = useState('')
    const [direccion, setDireccion] = useState('')
    const [provincia, setProvincia] = useState('')
    const [localidad, setLocalidad] = useState('')
    const [codigoPostal, setCodigoPostal] = useState('')
    const [condicion, setCondicion] = useState('')
    const [cuit, setCuit] = useState('')
    const [telCliente, setTelCliente] = useState('')
    const [emailCliente, setEmailCliente] = useState('')

    useEffect(() => {
        if(presupuesto) {
            setCuit(presupuesto.cuit || '')
            setClientName(presupuesto.cliente || '')
            setDireccion(presupuesto.direccion || '')
            setProvincia(presupuesto.provincia || '')
            setLocalidad(presupuesto.localidad || '')
            setCodigoPostal(presupuesto.codigoPostal || '')
            setCondicion(presupuesto.condicion || '')
            setTelCliente(presupuesto.telCliente || '')
            setEmailCliente(presupuesto.emailCliente || '')
        }
    }, [presupuesto])

    return (
        <div className="section">
            <h3>CLIENTE</h3>

            <div className="cliente-direccion">
                <label htmlFor="cliente">Cliente:</label>
                {printMode ? (
                    <span>{clientName}</span>
                ) : (
                    <input
                        type="text"
                        id="cliente"
                        name="cliente"
                        defaultValue={clientName}
                        onInput={(e) => {
                            e.target.value = e.target.value.toUpperCase()
                            setClientName(e.target.value)
                        }}
                    />
                )}


                <label htmlFor="direccion">Dirección:</label>
                {printMode ? (
                    <span>{direccion}</span>
                ) : (
                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        defaultValue={direccion}
                        onChange={(e)=> setDireccion(e.target.value)}
                    />
                )}

            </div>


            <div className="prov-loc-cp">

                <label htmlFor="provincia">Provincia:</label>
                {printMode ? (
                    <span>{provincia}</span>
                ) : (
                     <input
                        type="text"
                        id="provincia"
                        name="provincia"
                        defaultValue={provincia}
                        onInput={(e) => {
                            e.target.value = e.target.value.toUpperCase()
                            setProvincia(e.target.value)
                        }}
                    />
                )}

                <label htmlFor="localidad">Loc.:</label>
                {printMode ? (
                    <span>{localidad}</span>
                ) : (
                    <input
                        type="text"
                        id="localidad"
                        name="localidad"
                        defaultValue={localidad}
                        onInput={(e) => {
                            e.target.value = e.target.value.toUpperCase()
                            setLocalidad(e.target.value)
                        }}
                    />
                )}

                <label htmlFor="codigoPostal">C.P.:</label>
                {printMode ? (
                    <span>{codigoPostal}</span>
                ) : (
                    <input
                        type="text"
                        id="codigoPostal"
                        name="codigoPostal"
                        defaultValue={codigoPostal}
                        onChange={(e)=> setCodigoPostal(e.target.value)}
                    />
                )}

            </div>


            <div className="condicion-cuit">

                <label htmlFor="condicion">Condición:</label>
                {printMode ? (
                    <span>{condicion}</span>
                ) : (
                    <input
                        type="text"
                        id="condicion"
                        name="condicion"
                        defaultValue={condicion}
                        onInput={(e) => {
                            e.target.value = e.target.value.toUpperCase()
                            setCondicion(e.target.value)
                        }}
                    />
                )}


                <label htmlFor="cuit">C.U.I.T.:</label>
                {printMode ? (
                    <span>{cuit}</span>
                ) : (
                    <input
                        type="text"
                        id="cuit"
                        name="cuit"
                        defaultValue={cuit}
                        onChange={(e)=> setCuit(e.target.value)}
                    />
                )}

            </div>


            <div className="telefono-cliente-container">

                <label htmlFor="telefono-cliente">Teléfono:</label>
                {printMode ? (
                    <span>{telCliente}</span>
                ) : (
                    <input
                        type="text"
                        id="telefono-cliente"
                        name="telCliente"
                        defaultValue={telCliente}
                        onChange={(e)=> setTelCliente(e.target.value)}
                    />
                )}

                <label htmlFor="email-cliente">Email:</label>
                {printMode ? (
                    <span>{emailCliente}</span>
                ) : (
                    <input
                        type="email"
                        id="email-cliente"
                        name="emailCliente"
                        defaultValue={emailCliente}
                        onChange={(e) => setEmailCliente(e.target.value)}
                    />
                )}

            </div>

        </div>
    )
}
