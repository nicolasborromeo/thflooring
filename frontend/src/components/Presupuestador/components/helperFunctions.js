
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
