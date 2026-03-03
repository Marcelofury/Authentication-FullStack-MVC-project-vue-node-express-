 const Item = require('../models/item.js')

 exports.createItem = async (req,res)=>{
    const item = await Item.create({
        title: req.body.title,
        user: req.user
    })
    res.json(item)
 }


   exports.getItems = async (req,res)=>{
    const items = await Item.find({user: req.user})
    res.json(items)
   }

   exports.deleteItem = async (req,res) => {
    await Item.findByIdAndDelete(req.params.id)
    res.json({message: 'Deleted'})
   }