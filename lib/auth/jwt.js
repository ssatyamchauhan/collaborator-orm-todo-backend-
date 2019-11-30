const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res, next) => {

    // Token from  body, query, cookies or local-storage
    let token = req.body.token || req.query.token || req.headers.cookies
    console.log('Authentication is in process', token)
    if (token !== undefined) {
        if (token.startsWith('key=')) {
            token = token.slice(4, token.length)
            console.log(token)
            jwt.verify(
                token,
                process.env.secret,
                (err, credentials) => {
                    console.log(credentials)
                    if (!err) {
                        req.name = credentials.user.name
                        req.email = credentials.user.email
                        next();
                    }
                    else {
                        console.log(err)
                        res.json('token is expired')
                    }
                })
        }
    }
}