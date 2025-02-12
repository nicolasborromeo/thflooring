const router = require('express').Router();
const { Product } = require('../../db/models')
const { Op } = require('sequelize')
const { requireAuth } = require('../../utils/auth');





router.get('/presu', requireAuth, async (req,res,next)=> {
    const { descripcion } = req.query

    let query = {}

    if (descripcion !== 'undefined') {
        query.where = {}
        query.where.descripcion = {
            [Op.like]: `%${descripcion}%`
        };
    }

    let queryProducts = await Product.findAll(query);
    res.status(201).json(queryProducts)
} )





router.get('/query', requireAuth, async (req, res, next) => {
    let query = {};

    const { descripcion, orderBy, direction } = req.query

    if (descripcion !== 'undefined') {
        query.where={}
        query.where.descripcion = {
            [Op.like]: `%${descripcion}%`
        };
    }
    if (orderBy !== 'undefined') {
        query.order = []
        query.order.push([orderBy, direction.toUpperCase()])
    }
    let queryProducts = await Product.findAll(query);
    res.status(201).json(queryProducts)
});





router.get('/', async (req, res, next) => {
    let products = await Product.findAll()
    res.json(products)
});





router.post('/', requireAuth, async (req, res, next) => {
    const { codigo, descripcion, medidasType, costo, precio, company } = req.body
    const newProduct = await Product.create({
        codigo, descripcion, medidasType, costo, precio, company
    })
    res.status(201).json({
        message: 'Successfully added new product to the database',
        nuevoProducto: newProduct
    })
});





router.delete('/:id', requireAuth, async (req, res, next) => {
    const id = req.params.id
    let product = await Product.findByPk(id)
    let descripcion = product.descripcion
    await Product.destroy({
        where: {
            id: id
        }
    })
    res.status(200).json(`Succesfully deleted product: ${descripcion}`)
});




router.put('/:id', requireAuth, async (req, res, next) => {
    const id = req.params.id
    let product = await Product.findByPk(id)
    if (!product) {
        let err = new Error('Not Found')
        err.status = 404
        err.message = "Product not found"
        return next(err)
    }
    const { codigo, descripcion, medidasValor, medidasType, costo, precio, cambio, company } = req.body
    await Product.update(
        req.body,
        { where: { id: id } },
    );
    const update = await Product.findByPk(id)

    res.status(200).json({
        message: `Succesfully updated ${update.descripcion}`,
        updatedProduct: update
    })
})





module.exports = router
