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
        <div className='confirmar-guardar'>
            <button className='button' onClick={handlePrint}>Confirmar</button>
            <button className='button'>Guardar</button>
        </div>
    )
}
