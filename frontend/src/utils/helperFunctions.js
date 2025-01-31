export const fechaArgentina = (fecha) => {
    if(!fecha) return '0-0-0000'
    fecha = fecha.toLocaleString().slice(0, 10)
    let fechaSplit = fecha.split('-')
    const [ano, mes, dia] = fechaSplit
    return `${dia}-${mes}-${ano}`
  }


export  const calculateFechaVenc = () => {
    let fechaVenc = new Date()
    fechaVenc.getMonth === '12' ? fechaVenc.setMonth(0) : fechaVenc.setMonth((fechaVenc.getMonth()) + 1)
    let fecha = fechaVenc.toISOString().slice(0, 10)
    return fecha
}
