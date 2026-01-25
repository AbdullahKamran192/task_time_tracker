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
}

export async function postTask(task_name, task_description) {
    const [query_response] = await pool.query("INSERT INTO tasks (task_name, task_description) VALUES (?,?)", [task_name, task_description])
    console.log(query_response.insertId)
    return query_response
}

export async function postTimeSession(start_time, stop_time, task_id) {
    const query_response = await pool.query("INSERT INTO time_session (start_time, stop_time, task_id) VALUES (?, ?, ?)", [start_time, stop_time, task_id])
    return query_response
}