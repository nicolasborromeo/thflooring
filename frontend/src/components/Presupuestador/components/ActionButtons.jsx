

export default function ActionButtons({printMode, handlePrint}) {

    if(!printMode) return (
        <div className='confirmar-guardar'>
            <button className='button' onClick={handlePrint}>Confirmar</button>
            <button className='button'>Guardar</button>
        </div>
    )
}
