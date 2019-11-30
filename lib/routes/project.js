const _ = require('underscore');
const Op = require('sequelize').Op
module.exports = (endpoints, db, jwtAuth) => {

    endpoints.post('/project', jwtAuth, (req, res) => {

        db.card.create({
            email: req.email,
            createdon: new Date(),
            name: req.body.name
        })
            .then(() => {
                db.card.findAll({
                    where: { email: req.email }
                })
                    .then(data => res.json(data))
            })
            .catch(err => {
                console.log(err)
            })
    })

    endpoints.get('/project', jwtAuth, (req, res) => {
        // console.log(req.email)
        db.card.findAll({
            raw: true,
            attributes: ['id'],
            where: {
                email: req.email
            }
        })
            .then(data => {
                db.todo.findAll({
                    attributes: [['projectid', 'id']],
                    raw: true,
                    where: {
                        [Op.or]: [
                            { assignedby: req.email },
                            { assignedto: req.email }
                        ]
                    }

                })
                    .then((tododata) => {
                        console.log(tododata)
                        var totalPojects = data.concat(tododata)
                        var list = _.uniq(totalPojects, false, function (i) {
                            return i.id
                        })
                        Promise.all(list.map((i) => {
                            return db.card.findAll({
                                raw: true,
                                where: {
                                    id: i.id
                                }
                            })
                                .then((data) => {
                                    return (data[0])
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }))
                            .then(finallist => {
                                return res.json(finallist)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
            })
            .catch(err => {
                console.log(err)
            })
    })
}