module.exports = (sequelize, DataTypes) => {
    const QAnswer = sequelize.define('Q_Answer', {
        question_id:{
            type: DataTypes.INTEGER
        },
        user_id:{
            type: DataTypes.INTEGER
        },
        answer: {
            type: DataTypes.STRING
        },
        status_asnwer: {
            type: DataTypes.INTEGER
        }
       
    })
    return QAnswer
}