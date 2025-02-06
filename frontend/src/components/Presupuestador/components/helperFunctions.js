
export function calculateTotal({precioUnit, cantidad, descuento}) {

    if (cantidad) {
        let precioTotal = precioUnit * cantidad
        if (descuento) precioTotal = ((100 - descuento) / 100) * precioTotal
        return precioTotal
    } else return ''
}


export function twoDecimalsParser (num) {
    return Math.round(num * 100) / 100
}

export function setEmptyStringsToNull (obj) {
    for (const key in obj) {
        if (obj[key] === "") {
            obj[key] = null;
        }
    }
    return obj
}


// API

// export const fetchPresupuestoByID = async (id) => {
//     const res = await fetch(`/api/presupuestos/${id}`)
//     if(res.ok) {
//         const data = await res.json()
//         return data
//         // setPresupuesto(data)
//     } else {
//         const error = await res.json()
//         console.log(error)
//     }
// }
