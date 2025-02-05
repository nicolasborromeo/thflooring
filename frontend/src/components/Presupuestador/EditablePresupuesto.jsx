import { useParams } from "react-router-dom"
import { usePresupuesto } from "../../context/PresupuestoContext"
import Presupuesto from "./Presupuesto"
import { useEffect, useState } from "react"

export default function EditablePresupuesto() {
    const { id } = useParams()
    const [presupuesto, setPresupuesto] = useState(null)

    useEffect(()=> {
        const fetchPresupuesto = async () => {
            const res = await fetch(`/api/presupuestos/${id}`)
            if(res.ok) {
                const data = await res.json()
                setPresupuesto(data)
            } else {
                const error = await res.json()
                console.log(error)
            }
        }
        fetchPresupuesto()
    }, [id])

    if(presupuesto) return (
        <div className='presupuestador-container'>
            <Presupuesto presupuesto={presupuesto} edit={true} />
        </div>
    )
}
