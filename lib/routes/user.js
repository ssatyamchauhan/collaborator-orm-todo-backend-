const forget = require('../../forget')
require('dotenv').config()

module.exports = (endpoints, db, jwt, jwtAuth) => {

    // For singn up we are using the findOrCreate method 
    // first it checks does this user if exists it will not create new user
    // otherwise it will create new user;
    endpoints.post('/signup', async (req, res) => {
        db.user.findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: {
                name: req.body.name,
                password: req.body.password
            }
        })
            .then(([user, create]) => {
                if (create) {
                    return res.json("you have successfully signup!");
                }
                else {
                    return res.json('Error')
                }
            })
            .catch(err => {
                console.log(err)
            })
    })

    // for login where are here checking the given email and password
    //  to verfiy the user's credential once it verified he will be able to logged in.
    endpoints.post('/login', (req, res) => {
        console.log('login is checking credentials!')
        db.user.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            },
            raw: true
        })
            .then((data) => {
                console.log(data)
                // if data then it will return a jwt using user's credentials
                if (data) {
                    jwt.sign(
                        {
                            user: data
                        },
                        process.env.secret,
                        {
                            expiresIn: '1hr'
                        },
                        (err, token) => {
                            if (!err) {
                                console.log('login successfully!', token)
                                res.send('key=' + token)
                            }
                            else {
                                console.log(err)
                            }
                        }
                    )
                }
                // If user does not exists then he will not be able to logged in 
                else {
                    console.log('This user does not exists!')
                    return res.json("This user does not exists!")
                }
            })
            .catch(err => console.log(err))
    })


    //  forget password to reset the password he needs to  authenticate first 

    endpoints.post('/forget', (req,res) => {

        db.user.findOne({
            raw: true,
            where: {
                email: req.body.email
            }
        })
        .then(data => {
            if(data){
                jwt.sign(
                    { user: data }, 
                    process.env.secret, 
                    { expiresIn: '5m' }, 
                    function (err, token) {
                        if (!err) {
                            forget(req, res, token)
                        }
                        else {
                            console.log('here is the error', err)
                        }
                })
            }
            else{
                console.log(data)
                return res.json(err)
            }
        })
        .catch(err => console.log(err))

    })

    endpoints.post('/reset', jwtAuth, (req,res) => {
        
        db.user.update(
            {
                password: req.body.password
            },
            {
                raw: true,
                where: {
                    email: req.email
                }
            }
        )
        .then(data =>{
            return res.json(data)
        })
        .catch(err => console.log(err))
    })
    

}