module.exports = (Sequelize, sequelize) => {

    var bucket = sequelize.define('bucket', {
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
            type: Sequelize.STRING,
            allowNull: false
        },
        filename: {
            type: Sequelize.STRING,
            alloNull: false
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
        {
            freezeTableName: true,
            timestamps: false
        })
    
    return bucket;
}