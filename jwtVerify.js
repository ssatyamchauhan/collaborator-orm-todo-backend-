const jwt = require('jsonwebtoken')
const config = require('./config')

module.exports = (req, res, next) => {

    // console.log('body', req.body)
    var token = req.query.token || req.body.token || req.headers.Cookies;
    // console.log('jwt token is here how it is working you can see here', token)
    if (token !== undefined) {
        if (token.startsWith('key=')) {
            token = token.slice(4, token.length)
            jwt.verify(token, config.key.secret, (err, decode) => {
                if (!err) {
                    req.name = decode.user.name
                    req.email = decode.user.email
                    next();
                }
                else {
                    console.log(err)
                    res.json('token is expired')
                }
            })
        }

        else {
            console.log('else is working')
            token = token.slice(4, token.length)
            jwt.verify(token, config.key.secret, (err, decode) => {
                if (!err) {
                    req.email = decode.user.email
                    next();
                }
                else {
                    console.log(err)
                    res.json('token is expired')
                }
            })
        }
    }
    else {
        res.json('please login first!')
    }
}

