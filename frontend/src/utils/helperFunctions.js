export const fechaArgentina = (fecha) => {
    if(!fecha) return '0-0-0000'
    fecha = fecha.toLocaleString().slice(0, 10)
    let fechaSplit = fecha.split('-')
    const [ano, mes, dia] = fechaSplit
    return `${dia}-${mes}-${ano}`
  }
