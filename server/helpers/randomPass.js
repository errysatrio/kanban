module.exports = function randomPass(){
    const char = 'abcdefghijkmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let pass = ''
    for (let i = 0; i < 10; i++) {
        pass+=char[Math.ceil(Math.random()*62)]
    }
    return pass
}