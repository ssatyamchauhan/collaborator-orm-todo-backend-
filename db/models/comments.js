module.exports = (Sequelize, sequelize) => {

    var comments = sequelize.define('comments', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        todoid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: false
        },
        parentid: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    return comments;
}

