module.exports = function errorHandler(err, req, res, next) {
    console.log(err.name)
    // if(err.name === 'SequelizeValidationError'){
    //     let msg = []
    //     err.errors.map(el=>msg.push(el.message))
    //     res.status(400).json(msg)
    // } else if (err.name === 'SequelizeUniqueConstraintError') {
    //     err = {
    //         status:500,
    //         msg:err.errors[0].message
    //     }
    //     res.status(500).json(err)
    // } else if (err.name === 'SequelizeUniqueConstraintError') {

    // } else {
    //     console.log(err,'from')
    //     // res.status(err.status).json(err.msg)
    //     res.status(err.status).json(err)
    // }
    switch (err.name) {
        case 'BadRequestError': res.status(400).json({ msg: err.message })
            break;
        case 'SequelizeValidationError':
            let msg = []
            err.errors.map(el => msg.push(el.message))
            res.status(400).json({ msg })
            break;
        case 'SequelizeUniqueConstraintError': res.status(400).json({ msg: err.errors[0].message })
            break;
        case 'UnauthorizedError': 
        res.status(401).json({msg:err.message})
            break;
        default: 
        res.status(500).json({msg:'internal server error'})
            break;
    }
}