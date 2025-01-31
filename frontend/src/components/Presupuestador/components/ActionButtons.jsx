import { useEffect } from "react"


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

    if(!printMode) return (
        <div className='confirmar-guardar'>
            <button className='button' onClick={handlePrint}>Confirmar</button>
            <button className='button'>Guardar</button>
        </div>
    )
}
