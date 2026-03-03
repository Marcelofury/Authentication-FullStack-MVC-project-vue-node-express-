const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req,res)=>{
    try{
      const {name, email, password} = req.body
// if user exists
      const existingUser = await User.findOne({email})
      if (existingUser) return res.status(400).json({message: 'user exists'})

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,email,password:hashedPassword
        })

        res.status(201).json({message: 'user registered'})
    }catch (err){
      res.status(500).json({error: err.message})
    }
}

exports.login = async (req,res) => {
    try{
         const {email,Password} = req.body

         const user = await User.findOne({email})
         if(!user) return res.status(400).json({message: 'Invalid credentials'})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({message: 'Invalid credentials'})

            const token = jwt.sign(
                {id: user._id},
                process.env.JWT_SECRET,
                {expiresIn: '1d'}
            )

            res.json({token,user: {id:user._id, name: user.name}})
    }catch(err){
        res.status(500).json({error: err.message})

    }
}