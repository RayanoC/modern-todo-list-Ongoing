CREATE DATABASE todoList;


CREATE TABLE user_account(
    user_id SERIAL NOT NULL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    profile_picture VARCHAR(250),
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todo_list(
    todo_list_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    is_main_list BOOLEAN DEFAULT false,
    todo_list_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES user_account(user_id) ON DELETE CASCADE
);

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    todo_list_id INT NOT NULL,
    todo_name VARCHAR(100) NOT NULL,
    description VARCHAR(250),
    reminder TIMESTAMP,
    due_date TIMESTAMP,
    order_no NUMERIC NOT NULL,
    attachment VARCHAR(250),
    finished BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_todo_list FOREIGN KEY(todo_list_id) REFERENCES todo_list(todo_list_id) ON DELETE CASCADE
);

