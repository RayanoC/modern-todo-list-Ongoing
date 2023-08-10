const todoListService = require("../services/todo_list.service")


const findUserTodoList = async(req, res)=>{
    const user = req.user
    const result = await todoListService.findAllUserTodoList(user.user_id)
    res.json(result)
}

const createTodoList = async(req, res)=>{
    const user = req.user
    const {is_main_list, todo_list_name} = req.body
    const result = await todoListService.createTodoList(is_main_list, todo_list_name, user.user_id)
    res.json(result)
}

const findTodoListDetail = async(req, res)=>{
    const result = await todoListService.findTodoListDetail(req.params)
    res.json(result)
}

const deleteTodoListById = async(req, res)=>{
    const result = await todoListService.deleteTodoListById(req.params)
    res.json(result)
}

module.exports = {
    findUserTodoList,
    createTodoList,
    findTodoListDetail,
    deleteTodoListById
}
