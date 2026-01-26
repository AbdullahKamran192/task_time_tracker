import mysql from "mysql2";

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise()

export async function getTasks() {
    const [rows] = await pool.query("SELECT * FROM tasks")
    return rows
}

export async function getTasksByUserId(user_id) {
    const [rows] = await pool.query("SELECT * FROM tasks WHERE user_id = ?", [user_id])
    return rows
}

export async function postTask(task_name, task_description, user_id) {
    const [query_response] = await pool.query("INSERT INTO tasks (task_name, task_description, user_id) VALUES (?,?,?)", [task_name, task_description, user_id])
    console.log(query_response.insertId)
    return query_response
}

export async function getTimeSessionByTaskID(task_id) {
    const [result] = await pool.query("SELECT * FROM time_session WHERE task_id = ?", [task_id])
    return result[0]
}

export async function postTimeSession(start_time, stop_time, task_id) {
    const query_response = await pool.query("INSERT INTO time_session (start_time, stop_time, task_id) VALUES (?, ?, ?)", [start_time, stop_time, task_id])
    return query_response
}

export async function getUser(displayName, email) {
    const [user] = await pool.query("SELECT * FROM users WHERE username = ? AND email = ?", [displayName, email]);
    return user;
}

export async function postUser(displayName, email) {
    const query_response = await pool.query("INSERT INTO users (username, email) VALUES (?, ?)", [displayName, email]);
    return query_response
}