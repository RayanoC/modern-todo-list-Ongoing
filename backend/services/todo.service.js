const pool = require("../db");

class TodoService{
    createTodo = async (todo) => {
        try{
            const body = todo
            const newTodo = await pool.query("INSERT INTO todo (todo_list_id, todo_name, description, reminder, duew_date, order_no, attachment, finished) VALUES($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING RETURNING *", [body.activity, body.description, body.finished, body.activity, body.description, body.finished, body.activity, body.description])
            return(newTodo.rows)
        } catch(err){
            console.error(err.message)
            throw err
        }
    }

    getAllTodo = async () => {
        try{
            const getAllTodo = await pool.query("SELECT * FROM todo", [])
            // const getAllTodo = await pool.query("SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_schema = 'Todo' AND table_name = 'todo' )", [])
            return(getAllTodo.rows)
        } catch(err){
            console.error(err.message)
            throw err
        }
    }
    
    getTodoById = async (todo_id) => {
        try{
            const {id} = todo_id
            const getOneTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
            return(getOneTodo.rows)
        } catch(err){
            console.error(err.message)
            throw err
        }
    }
    
    deleteTodoById = async (todo_id) => {
        try{
            const {id} = todo_id
            const deleteOneTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
            return(deleteOneTodo.rows)
        } catch(err){
            console.error(err.message)
            throw err
        }
    }
    
    deleteAllTodo = async () => {
        try{
            const deleteAllTodo = await pool.query("DELETE FROM todo WHERE activity IS NOT NULL", [])
            return(deleteAllTodo.rows)
        } catch(err){
            console.error(err.message)
            throw err
        }
    }
    
    editTodoById = async (todo_id, edit) => {
        const body = edit
        const {id} = todo_id
        try {
            const editTodo = await pool.query("UPDATE todo SET $1 WHERE todo_id = $2", [body, id]) 
        } catch (err) {
            throw err
        }
    }
    
    toggleTodoStatus = async (todo_id) => {
        try {
            const {id} = todo_id
            const toggleTodoStatus = await pool.query("UPDATE todo SET finished = NOT finished WHERE todo_id = $1", [id]) 
            return(toggleTodoStatus)
        } catch (err) {
            throw err
        }
    }

    getAllTodoByTodoListId = async (todoListId) => {
        try {
            const todos = await pool.query("SELECT * FROM todo WHERE todo_list_id = $1 RETURNING *", [todoListId.todo_list_id])
            return(todos.rows)
        } catch (error) {
            throw new ErrorHandler(err.statusCode, err.message)
        }
    }
}
module.exports = new TodoService()