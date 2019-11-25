module.exports = (endpoints, db, jwtAuth) => {

    endpoints.post('/todo', jwtAuth, (req, res) => {
        delete req.body["token"];
        req.body["assignedby"] = req.email,
            db.user.count({
                raw: true,
                where: {
                    email: req.email
                }
            })
                .then(data => {
                    if (data > 0) {
                        db.todo.create(req.body)
                            .then(data => {
                                db.todo.findAll({
                                    raw: true,
                                    where: {
                                        projectid: req.body.projectid
                                    }
                                })
                                    .then(data => {
                                        console.log(data)
                                        var finalData = data.filter((i) => {
                                            if (i.done) {
                                                return i.done = true;
                                            }
                                            else {
                                                return i.done = false;
                                            }
                                        })
                                        return res.json(data)
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
    })

    endpoints.get('/todo', jwtAuth, (req, res) => {
        console.log(req.query)
        db.todo.findAll({
            raw: true,
            where: {
                projectid: req.query.projectid
            }
        })
            .then(data => {
                var finalData = data.filter((i) => {
                    // console.log(i)
                    if (i.done) {
                        return i.done = true;
                    }
                    else {
                        return i.done = false;
                    }
                })
                return res.json(data)
            })
            .catch(err => {
                console.log(err)
            })
    })

    endpoints.put('/todo', jwtAuth, (req, res) => {
        console.log(req.body.todo)
        db.todo.update(
            {
                todo: req.body.todo
            },
            {
                returning: true,
                where: {
                    id: req.body.id
                },

            })
            .then(data => {
                db.todo.findAll({
                    where: {
                        projectid: req.body.projectid
                    }
                })
                .then(data => {
                    return res.json(data)
                })
                .catch(err => console.log(err))
            })
            .catch(err => {
                console.log(err)
            })
    })

}