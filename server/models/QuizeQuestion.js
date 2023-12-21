module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
        question: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.BOOLEAN
        },
        choices: {
            type: DataTypes.STRING
        },
        answer: {
            type: DataTypes.STRING
        }
       
    })
    return Question
}