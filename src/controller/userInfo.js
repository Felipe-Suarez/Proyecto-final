import { Router } from "express"
const route = Router()

import { auth, isAdmin } from '../middleware/auth.js'

import { serviceUser } from '../services/userInfo.js'

import multerEdit from '../middleware/multerEdit.js'

route.get('/', auth, async (req, res) => {
    if (req.user) {
        const { userData, myCart } = await serviceUser(req.user?._id)

        const veifyAdmin = await isAdmin(req)

        res.render('userInfo', {
            userInfo: userData,
            cartId: myCart.id,
            userAdmin: veifyAdmin
        })
    }
})

route.get('/name', async (req, res) => {
    if (req.user) {
        const dtoUser = {
            username: req.user.username,
            mail: req.user.email
        }
        res.json(dtoUser)
    } else {
        res.json({ error: 'Login requerido' })
    }
})

route.get('/data', async (req, res) => {
    if (req.user) {
        const { myCart } = await serviceUser(req.user?._id)
        res.send(myCart)
    } else {
        res.json({ error: 'Login requerido' })
    }
})

route.post('/editImg', multerEdit.single('newImage'), (req, res) => {
    res.redirect('/userInfo')
})

export default route