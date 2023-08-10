const router = require("express").Router();
const {
    createTodo, 
    deleteAllTodo, 
    deleteTodoById, 
    editTodoById,
    getAllTodo,
    getTodoById,
    toggleTodoStatus
    } = require("../controllers/todo.controller");

router
    .route("/")
    .get(getAllTodo)
    .post(createTodo)
    .delete(deleteAllTodo);

router
    .route("/:id")
    .get(getTodoById)
    .put(editTodoById)
    .patch(toggleTodoStatus)
    .delete(deleteTodoById);

module.exports = router;