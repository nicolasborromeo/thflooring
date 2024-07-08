import { useState } from "react"

export default function Comentario({printMode}) {
    const [comentario, setComentario] = useState('')
    return (
        <div className="section">
            <h3>COMENTARIO</h3>
            {printMode ? (
                <span>{comentario}</span>
            ) : (
                <textarea
                    id="comentarios"
                    name="comentarios"
                    rows="4"
                    value={comentario}
                    onInput={(e) => {
                        e.target.value = e.target.value.toUpperCase()
                        setComentario(e.target.value)
                    }}
                >
                </textarea>
            )}
        </div>
    )
}
