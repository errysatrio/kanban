const {Card} = require('../models')
const createError = require('http-errors')
function authorization(req,res,next){
    
    let id = Number(req.params.id)
    Card.findOne({where:{id}})
    .then(data=>{
        if(data){
            if(data.UserId === req.user.id){
                next()
            }
        } else {
            throw createError(403, 'forbidden')
        }
    })
    .catch(err=>{
        next(err)
    })

}

module.exports = authorization