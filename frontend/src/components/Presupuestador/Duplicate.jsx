import Presupuesto from './Presupuesto'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Duplicate() {
    const { id } = useParams()
    const [presupuesto, setPresupuesto] = useState(null)

    useEffect(() => {
        const fetchPresupuestoByID = async () => {
            const res = await fetch(`/api/presupuestos/${id}`)
            if (res.ok) {
                const data = await res.json()
                setPresupuesto(data)
            } else {
                const error = await res.json()
                console.log(error)
            }
        }
        fetchPresupuestoByID()
    }, [id])

    if (presupuesto) return (
        <div className='presupuestador-container'>
            <Presupuesto presupuesto={presupuesto} duplicate={true}/>
        </div>
    )
}
