module.exports = (sequelize, DataTypes) => {
    const Todos = sequelize.define('Todos', {
        user_id: {
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.INTEGER,
            default: 1
        },
        date_finish: {
            type: DataTypes.DATE,
        },
       
    })
    return Todos
}