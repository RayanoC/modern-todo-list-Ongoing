const pool = require("../db");
const { ErrorHandler } = require("../helper/error");
const todoService = require("./todo.service");

class TodoListService{
    createUserMainList = async (user_id)=>{
        try {
            const is_main_list = true
            const todo_list_name = "Main List"
            const newTodoList = await this.createTodoList(is_main_list, todo_list_name, user_id)
            return newTodoList
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message)
        }
    }

    createTodoList = async (is_main_list, todo_list_name, user_id) =>{
        try{
            const newTodoList= await pool.query(
                "INSERT INTO todo_list(user_id, is_main_list, todo_list_name) VALUES($1, $2, $3) ON CONFLICT DO NOTHING RETURNING *", [
                    user_id, is_main_list, todo_list_name
                    ]
                )
            
            return(newTodoList.rows)
        } catch(error){
            throw new ErrorHandler(error.statusCode, error.message)
        }
    }

    findAllUserTodoList = async (user_id)=>{
        try{
            const todoLists= await pool.query("SELECT * FROM todo_list WHERE user_id = $1", [user_id])
            // return(body)
            return(todoLists.rows)
        } catch(error){
            throw new ErrorHandler(error.statusCode, error.message)
        }
    }

    deleteTodoListById = async (todoListId) =>{
        try {
            const deleteOneTodoList = await pool.query("DELTE FROM todo_list WHERE todo_list_id = $1 RETURNING *", [todoListId])
            return(deleteOneTodoList.rows)
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message)
        }
    }

    findTodoListDetail = async (todoListId) =>{     
        const todos= await todoService.getAllTodoByTodoListId(todoListId)
        if(todos[0]){
            throw new ErrorHandler(401, "no todo found in this list with the id of"+todoListId.todo_list_id)
        }
        return(todos.rows)
    }

    findAllTodoList = async () =>{
        const todoLists = await pool.query("SELECT * FROM todo_list")
        return(todoLists.rows)
    }

    findOneTodoList = async (todo_list_id) =>{
        const todoList = await pool.query("SELECT * FROM todo_list WHERE todo_list_id = $1", [todo_list_id])
        return todoList.rows
    }

}

module.exports = new TodoListService() 