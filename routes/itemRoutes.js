const express = require('express')
const auth = require('../middleware/authMiddlewarejs')
const {createItem,getItems,deleteItem} = require('../controllers/itemController.js')

const router = express.Router()

router.post('/', auth,createItem)
router.get('/', auth,getItems)

router.delete('/:id, auth,deleteItem')

module.exports = router