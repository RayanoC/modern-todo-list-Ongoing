const express = require('express');
const path = require('path')
require("express-async-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const cors = require('cors')
const helmet = require("helmet");
const { handleError } = require('./helper/error');

const app = express()





//middleware
app.use(cors({credentials:true, origin:true}));
app.use(express.json());
app.unsubscribe(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use("/backend", routes);
app.use(express.static(path.join(__dirname,"./uploads")))
app.get("/", (req, res) => 
    res.send("<h1 style='text-align: center'>Todo-List Server</h1>")
);

app.use(handleError)

module.exports = app;


