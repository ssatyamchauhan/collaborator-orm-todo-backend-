module.exports = (endpoints , db, jwtAuth) => {

    endpoints.get('/bucket', jwtAuth, (req,res) => {
        db.bucket.findAll()
        .then(data => {
            return res.json(data)
        })
        .catch(err => console.log(err))
    })
    
}
