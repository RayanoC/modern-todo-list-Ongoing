const router = require("express").Router();
const {
    createTodoList,
    findTodoListDetail,
    findUserTodoList
} = require("../controllers/todo_list.controller")
const authorization = require("../middleware/authorization");
router
    .route("/")
    .post(authorization, createTodoList)
    .get(authorization,findUserTodoList)

router
    .route(":id")
    .get(authorization,findTodoListDetail)

    
module.exports = router