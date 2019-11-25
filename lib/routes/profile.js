module.exports = (endpoinst, db, jwtAuth) => {

    endpoinst.get('/profile', jwtAuth, (req,res) => {
        db.user.findOne({
            where: {
                email: req.email
            }
        })
        .then(data => {
            console.log(data)
            return res.json([data])
        })
        .catch(err => console.log(err))
    })
}