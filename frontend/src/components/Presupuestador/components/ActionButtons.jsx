import { useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import PrintablePresupuesto from "./PrintablePresupuesto"

export default function ActionButtons({printMode, setPrintMode}) {
    const handlePrint = async (e) => {
        e.preventDefault()

        if(!printMode) await setPrintMode(true)

        window.print()
    }

    useEffect(()=> {
        window.addEventListener('afterprint', ()=> {
            setPrintMode(false)
        })

        return (
            window.removeEventListener('afterprint', ()=> {
                setPrintMode(false)
            })
        )
    })

    return (
        <div className='print-button'>
            <button onClick={handlePrint}>Confirmar</button>
            <button>Guardar</button>
        </div>
    )
}
