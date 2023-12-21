const express = require('express')
const router = express.Router();
const { Question, QAnswer } = require('../models')

router.get('/', async (req, res) => {
    var payload = [];
    var choices = ''
    const questionList = await Question.findAll()
    questionList.map((item) => {
        choices = item.choices.split(";")
        payload.push(
            {'id': item.id,'question': item.question, 'answer' : item.answer, 'choices': choices}
        )
    })
    res.json(payload)  
})

module.exports = router