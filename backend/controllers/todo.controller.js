const todoService = require("../services/todo.service")


const createTodo = async (req, res) => {
    const result = await todoService.createTodo(req.body)
    res.json(result)
}

const getAllTodo = async (req, res) => {
    const result = await todoService.getAllTodo()
    res.json(result)
}

const getTodoById = async (req, res) => {
    const result = await todoService.getTodoById(req.params)
    res.json(result)
}

const deleteTodoById = async (req, res) => {
    const result = await todoService.deleteTodoById(req.params)
    res.json(result)
}

const deleteAllTodo = async (req, res) => {
    const result = await todoService.deleteAllTodo()
    res.json(result)
}

const editTodoById = async (req, res) => {
    const result = await todoService.editTodoById(req.params, req.body)
    res.json(result)
}

const toggleTodoStatus = async (req, res) => {
    const result = await todoService.toggleTodoStatus(req.params)
    res.json(result)
}

module.exports = {
    createTodo,
    deleteAllTodo,
    deleteTodoById,
    editTodoById,
    getAllTodo,
    getTodoById,
    toggleTodoStatus
}
