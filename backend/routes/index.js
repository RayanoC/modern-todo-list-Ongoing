const router = require("express").Router();
const todo = require("./todo");
const user = require("./user");
const auth = require("./auth");
const todoList = require("./todo_list")


router.use("/todo",todo);
router.use("/user",user);
router.use("/auth",auth);
router.use("/todo-list",todoList)

module.exports = router;
