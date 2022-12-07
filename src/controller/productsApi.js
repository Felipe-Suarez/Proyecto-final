import { Router } from 'express'
const route = Router()

import { auth } from '../middleware/auth.js'

import { serviceGetProducts, serviceGetProduct, serviceProductSave, serviceProductUpdate, serviceDeleteProduct } from '../services/productsApi.js'

route.get('/', async (req, res) => {
    res.json(await serviceGetProducts())
})

route.get('/:id', async (req, res) => {
    const productId = req.params.id

    res.json(await serviceGetProduct(productId))
})

route.post('/', async (req, res) => {
    const bodyProduct = req.body
    await serviceProductSave(bodyProduct)

    res.redirect('/admin')
})

route.put('/:id', async (req, res) => {
    const productId = req.params.id
    const bodyProduct = req.body

    res.json(await serviceProductUpdate(bodyProduct, productId))
})

route.delete('/:id', async (req, res) => {
    let productId = req.params.id

    await serviceDeleteProduct(productId)
    res.end()
})

export default route