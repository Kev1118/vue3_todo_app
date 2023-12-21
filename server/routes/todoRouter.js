const express = require('express')
const router = express.Router()
const { Todos } = require('../models')
const verifyToken = require('./AuthVerify')

const getTodayDate = () => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2,'0');
    let mm = String(today.getMonth()+1).padStart(2,'0');
    let yyyy = today.getFullYear();
    return  mm + '/' + dd + '/' + yyyy; 
}


router.get('/', async (req,res) => {
    let authorization = req.headers.authorization
    authorization = authorization.substring(7,authorization.length)
    let decode = await verifyToken(authorization)
    const todoList = await(Todos.findAll({
        where: {
            user_id: decode.username
        }
    }))
    res.json(todoList)
})

router.get('/load-todo/:status/:token', async (req, res) => {
    let status = req.params.status
    let todoList;
    let decode = await verifyToken(req.params.token)
    if(status == 2){
         todoList = await Todos.findAll();
    }else{
         todoList = await Todos.findAll({
            where:{
                status: status,
                user_id: decode.username
            }
        })
    }
    
    res.json(todoList)
})

router.post('/create-todo', async (req, res) => {
    let authorization = req.headers.authorization
    authorization = authorization.substring(7,authorization.length)
    let decode =  await verifyToken(authorization)
    let todo_items = {
        title: req.body.title,
        description: req.body.description,
        user_id: decode.username,
    }
    await Todos.create(todo_items);
    res.status(200).send('Success')

})

router.post('/update-todo/:id', async (req, res) => {
    let id = req.params.id
   
    let todo = await Todos.findOne({
        where:{
            id: id
        }
    })
    todo.status == 1 ? todo.status = 0 : todo.status = 1;
    await todo.save();
    res.send(todo)
})

router.delete('/delete-todo/:id', async (req, res) => {
    let id = req.params.id
    await Todos.destroy({
        where:{
            id: id
        }
    })
    res.status(200).send('Delete success')
})


 module.exports = router