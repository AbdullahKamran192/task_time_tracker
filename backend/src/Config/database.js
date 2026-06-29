import mysql from "mysql2";

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
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

export async function getTasksByUserIdAndDate(date) {
    const [rows] = await pool.query("SELECT * FROM tasks WHERE user_id = ? AND ", [user_id])
}

export async function postTask(task_name, task_description, user_id) {
    const [query_response] = await pool.query("INSERT INTO tasks (task_name, task_description, user_id) VALUES (?,?,?)", [task_name, task_description, user_id])
    console.log(query_response.insertId)
    return query_response
}

export async function updateTask(task_id, task_name, task_description, user_id, task_colour) {
    const [query_response] = await pool.query("UPDATE tasks SET task_name = ?, task_description = ?, task_colour = COALESCE(?, task_colour) WHERE task_id = ? AND user_id = ?", [task_name, task_description, task_colour, task_id, user_id])
    return query_response
}

export async function deleteTask(task_id, user_id) {
    const [query_response] = await pool.query("DELETE FROM tasks WHERE task_id = ? AND user_id = ?", [task_id, user_id])
    return query_response
}

export async function getTimeSessionByTaskID(task_id) {
    const [result] = await pool.query("SELECT * FROM time_session WHERE task_id = ?", [task_id])
    return result[0]
}

export async function postTimeSession(start_time, stop_time, task_id, time_wasted) {
    const query_response = await pool.query("INSERT INTO time_session (start_time, stop_time, task_id, time_wasted) VALUES (?, ?, ?, ?)", [start_time, stop_time, task_id, time_wasted])
    return query_response
}

export async function updateTimeSession(start_time, stop_time, task_id, time_wasted) {
    const query_response = await pool.query("UPDATE time_session SET start_time = ?, stop_time = ?, time_wasted = ? WHERE task_id = ?", [start_time, stop_time, time_wasted, task_id])
}

export async function getUser(displayName, email) {
    const [user] = await pool.query("SELECT * FROM users WHERE username = ? AND email = ?", [displayName, email]);
    return user;
}

export async function getUserByGoogleId(google_id) {
    const [user] = await pool.query("SELECT * FROM users WHERE google_id = ?", [google_id]);
    return user;
}

export async function postUser(displayName, email, google_id) {
    const query_response = await pool.query("INSERT INTO users (username, email, google_id) VALUES (?, ?, ?)", [displayName, email, google_id]);
    return query_response
}

export const getTasksWithSessions = async (user_id) => {
    const [rows] = await pool.query(`
        SELECT 
            t.task_id,
            t.task_name,
            t.task_description,
            t.task_colour,
            ts.start_time,
            ts.stop_time,
            ts.time_wasted
        FROM tasks t
        JOIN time_session ts 
            ON t.task_id = ts.task_id
        WHERE t.user_id = ?
    `, [user_id]);

    return rows;
};

export async function getUserTimeStats(user_id, days = 30) {
    const [rows] = await pool.query(`
        SELECT
            COALESCE(
                SUM(
                    TIMESTAMPDIFF(MINUTE, ts.start_time, ts.stop_time)
                    - ts.time_wasted
                ),
                0
            ) AS productive_minutes,

            COALESCE(
                SUM(ts.time_wasted),
                0
            ) AS wasted_minutes

        FROM tasks t
        JOIN time_session ts
            ON t.task_id = ts.task_id

        WHERE t.user_id = ?
        AND ts.start_time >= DATE_SUB(NOW(), INTERVAL ? DAY)
    `, [user_id, days]);

    return rows[0];
}

export async function getUserTaskLimits(user_id) {
    const [rows] = await pool.query(
        `SELECT *
        FROM user_task_limits
        WHERE user_id = ?
        ORDER BY FIELD(colour,
            'darkgreen',
            'limegreen',
            'yellow',
            'orange',
            'red'
        );`, [user_id]
    )

    const numOfTaskColours = 5;

    if (rows.length != numOfTaskColours) {

        // Delete all current colours (and limits) and replace with default ones.
        await pool.query(
            "DELETE FROM user_task_limits WHERE user_id = ?",
            [user_id]
        );

        // Insert defaults values if user is new.
        await pool.query(
            `INSERT INTO user_task_limits (user_id, colour, minutes)
             VALUES (?, 'red', 120), (?, 'orange', 240), (?, 'yellow', 360),
             (?, 'limegreen', 480), (?, 'darkgreen', 600)`,
            [user_id, user_id, user_id, user_id, user_id]
        );

        const [newRows] = await pool.query(
            `SELECT *
            FROM user_task_limits
            WHERE user_id = ?
            ORDER BY FIELD(
                colour,
                'darkgreen',
                'limegreen',
                'yellow',
                'orange',
                'red'
            )`,
            [user_id]
        );

        return newRows;
    }

    return rows;
}

export async function updateUserTaskLimits(user_id, colour, minutes) {
    await pool.query(
        "UPDATE user_task_limits SET minutes = ? WHERE user_id = ? AND colour = ?",
        [minutes, user_id, colour]
    );
}