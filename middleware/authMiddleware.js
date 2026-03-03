const jwt = require('jsonwebtoken')

module.exports = (req,res)=>{
    const token = req.headers('Authorization')

    if(!token) return res.status(401).json({message: 'No token'})

        try{
            const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
            req.user = decoded.id
            next()
        }catch{
            res.status(401).json({message:'Invalid token'})
        }
}