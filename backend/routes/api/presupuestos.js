const router = require('express').Router();
const { Product, Presupuesto, ProductsPresupuesto, ProductDetail, sequelize } = require('../../db/models')
const { check, body } = require('express-validator')
const { handleValidationError, handleValidationErrors } = require('../../utils/validation')

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


router.get('/ultimo', async (req, res, next) => {
    let ultimo = await Presupuesto.findAll({
        limit: 1,
        attributes: ['codigo'],
        order: [['codigo', 'DESC']]
    })
    res.status(200).json(...ultimo)
})

router.get('/', async (req, res, next) => {
    console.log('made it to get /...')
    let presupuestos = await Presupuesto.findAll({
        include: { model: ProductDetail },
        order: [['id', 'DESC']]
    })
    res.status(200).json(presupuestos)
})

const validateBody = [
    check('cantidad')
        .exists()
        .notEmpty().withMessage('Por favor ingrese una cantidad')
        .isNumeric()
        .custom = (val) => {
            if (val <= 0) {
                let err = new Error('Cantidad tiene que ser mayor que 0')
            }
            return true
        },
    handleValidationErrors
]

router.post('/', checkDuplicate, async (req, res, next) => {

    const { codigo, vendedor, telVendedor, fecha, fechaVenc, cliente, direccion, provincia, localidad, codigoPostal, cuit, emailCliente, telCliente, condicion, iva, ivaDisc, comentarios, total, moneda, products } = req.body
            //TODO figure out a way to use clientId


    try {

        const result = await sequelize.transaction(async (t) => {

            // CREAR PRESUPUESTO IN DATABASE
            await Presupuesto.create({
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
            }, { transaction: t })


            const nuevoPresupuesto = await Presupuesto.findOne({
                order: [['id', 'DESC']],
                limit: 1
            }, {transaction: t})
            const presupuestoId = nuevoPresupuesto.id // set the id foreignkey


            products.forEach(async reqProduct => {
                function setEmptyStringsToNull(obj) {
                    for (const key in obj) {
                        if (obj[key] === "") {
                            obj[key] = null;
                        }
                    }
                    return obj;
                };

                reqProduct = setEmptyStringsToNull(reqProduct)

                let { codigo, descripcion, precioUnit, cantidad, descuento, precioTotal } = reqProduct

                let productPack = {
                    presupuestoId,
                    codigo,
                    descripcion,
                    cantidad: Number(cantidad),
                    precioUnit,
                    descuento,
                    precioTotal,
                }

                await ProductDetail.create(productPack, {transcation: t})
            })

        });

        res.json({
            message: "Successfully stored in the Database",
        });
    } catch (error) {
        console.error(error.status, error.message)
        next(error)
    }
});

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





module.exports = router;
