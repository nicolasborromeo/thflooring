const router = require('express').Router();
const { Presupuesto, ProductDetail } = require('../../db/models')



//middleware
const checkDuplicate = async (req, res, next) => {
    const { codigo } = req.body
    let presuInDatabase = await Presupuesto.findOne({
        where: { codigo: codigo }
    })

    if (presuInDatabase) {
        let err = new Error('Invoice already exists in database');
        err.status = 500
        err.message = 'Invoice already exists in database'
        return next(err)
    }
    return next();
}



router.get('/', async (req, res, next) => {
    let presupuestos = await Presupuesto.findAll({
        include: { model: ProductDetail },
        order: [['id', 'DESC']]
    })
    res.status(200).json(presupuestos)
})



/////////////////////////////
//// CREATE PRESUESTO ////
//////////////////////////

router.post('/', checkDuplicate, async (req, res, next) => {

    const { codigo, vendedor, telVendedor, fecha, fechaVenc, cliente, direccion, provincia, localidad, codigoPostal, cuit, emailCliente, telCliente, condicion, iva, ivaDisc, comentarios, total, moneda, products } = req.body

    try {
        // CREAR PRESUPUESTO IN DATABASE
        const nuevoPresupuesto = await Presupuesto.create({
            codigo,
            vendedor,
            telVendedor,
            fecha,
            fechaVenc,
            cliente,
            direccion,
            provincia,
            localidad,
            codigoPostal,
            cuit,
            emailCliente,
            telCliente,
            condicion,
            iva,
            ivaDisc,
            comentarios,
            total,
            moneda
        })

        const presupuestoId = nuevoPresupuesto.id // set the id foreignkey

        const setEmptyStringsToNull = (obj) => {
            for (const key in obj) {
                if (obj[key] === "") {
                    obj[key] = null;
                }
            }
            return obj;
        };
        const createProdDetailPromises = products.map((reqProduct) => {
            const cleanedProduct = setEmptyStringsToNull(reqProduct)
            const { codigo, descripcion, precioUnit, cantidad, descuento, precioTotal } = cleanedProduct
            const productPack = {
                presupuestoId,
                codigo,
                descripcion,
                cantidad: Number(cantidad),
                precioUnit,
                descuento,
                precioTotal,
            }
            return ProductDetail.create(productPack)

        })

        await Promise.all(createProdDetailPromises)

        res.json({
            message: "Successfully stored in the Database",
        })

    } catch (error) {
        console.error(error.status, error.message)
        next(error)
    }

})

/////////////////////////////
//// EDIT PRESUESTO ////
//////////////////////////


router.put('/', async (req, res, next) => {
    const { codigo, vendedor, telVendedor, fecha, fechaVenc, cliente, direccion, provincia, localidad, codigoPostal, cuit, emailCliente, telCliente, condicion, iva, ivaDisc, comentarios, total, moneda, products } = req.body
    try {
        const editedPresupuesto = await Presupuesto.update({
            vendedor,
            telVendedor,
            fecha,
            fechaVenc,
            cliente,
            direccion,
            provincia,
            localidad,
            codigoPostal,
            cuit,
            emailCliente,
            telCliente,
            condicion,
            iva,
            ivaDisc,
            comentarios,
            total,
            moneda
        },
            {where: {codigo: codigo}}
        )

        const updatedPresupuesto = await Presupuesto.findOne({where: {codigo : codigo}})// set the id foreignkey

        const setEmptyStringsToNull = (obj) => {
            for (const key in obj) {
                if (obj[key] === "") {
                    obj[key] = null;
                }
            }
            return obj;
        };
        const updateProdDetailPromises = products.map((reqProduct) => {
            const cleanedProduct = setEmptyStringsToNull(reqProduct)
            const { codigo, descripcion, precioUnit, cantidad, descuento, precioTotal, id } = cleanedProduct
            const productPack = {
                presupuestoId : updatedPresupuesto.id,
                codigo,
                descripcion,
                cantidad: Number(cantidad),
                precioUnit,
                descuento,
                precioTotal,
            }
            return id ? ( ProductDetail.update(productPack, {where: {id : id}})) : (ProductDetail.create(productPack))

        })

        await Promise.all(updateProdDetailPromises)

        res.json({
            message: "Presupuesto updated successfully",
        })

    } catch (error) {
        console.error(error.status, error.message)
        next(error)
    }

})



router.delete('/:presupuestoId', async (req, res, next) => {

    const presupuestoId = req.params.presupuestoId

    const presupuesto = await Presupuesto.findByPk(presupuestoId)
    if (!presupuesto) {
        let err = new Error('Not Found');
        err.status = 404;
        err.message = ("Presupuesto couldn't be found")
        return next(err)
    }
    // if (!user.admin) {
    //     let err = new Error()
    //     err.status = 403
    //     err.message = "Forbidden"
    //     return next(err)
    // }

    await Presupuesto.destroy({ where: { id: presupuestoId } })

    res.status(200).json({ message: "Successfully deleted" })
})


router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const presupuesto = await Presupuesto.findByPk(id, {include: ProductDetail})
        res.status(200).json(presupuesto)

        if (!presupuesto) {
            let err = new Error('Not Found');
            err.status = 404;
            err.message = ("Presupuesto couldn't be found")
            return next(err)
        }
    } catch (error) {
        console.error(error)
    }
})


module.exports = router;
