const _ = require('underscore')
module.exports = (endpoints, db, jwtAuth) => {

    endpoints.post('/description', jwtAuth, (req, res) => {

        db.todo.update(
            {
                description: req.body.description
            },
            {
                where: {
                    id: req.body.id
                }
            }
        )
        .then(() => {
            db.todo.findAll({
                raw: true,
                where: {
                    projectid: req.body.projectid
                }
            })
            .then(data => {
                var serialized = _.partition(data, (i) => {
                    if (i.done === 1 || i.done === true) {
                        return i.done = true;
                    }
                    else{
                        return i.done = false;
                    }
                })
                return res.json(data)
            })
        })
        .catch(err => console.log(err))


    })

}