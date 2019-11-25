module.exports = (Sequelize, sequelize) => {

    var user = sequelize.define('user', {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING
        }
    },
        {
            freezeTableName: true,
            timestamps: true
        })

    return user;
}