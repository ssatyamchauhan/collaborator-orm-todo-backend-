module.exports = (endpoints, db, jwtAuth) => {

    endpoints.get('/comments', jwtAuth, (req,res) => {
        db.comments.findAll({ raw: true})
        .then(data =>{
            return res.json(data)
        })
        .catch(err => console.log(err))
    })

    endpoints.post('/comment', jwtAuth, (req,res) => {
        var data = {
            name:req.name,
            comment:req.body.comment,
            todoid:req.body.todoid,
            email:req.email,    
        }
        db.comments.create(data)
        .then(() => {
            db.comments.findAll()
            .then(data => {
                return res.json(data)
            })
        })
        .catch(err => console.log(err))
    })

    endpoints.post('/replied', jwtAuth, (req,res) => {
        var data = {
            name:req.name,
            comment:req.body.comment,
            todoid:req.body.todoid,
            email:req.email,
            parentid:req.body.parentid
        }
        db.comments.create(data)
        .then(() => {
            db.comments.findAll()
            .then(data => {
                return res.json(data)
            })
        })
        .catch(err => console.log(err))
    })

}