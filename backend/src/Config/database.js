import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export async function getTasks() {
    const { rows } = await pool.query("SELECT * FROM tasks");
    return rows;
}


export async function getTasksByUserId(user_id) {
    const { rows } = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [user_id]);
    return rows;
}

// export async function getTasksByUserIdAndDate(date) {
//     const [rows] = await pool.query("SELECT * FROM tasks WHERE user_id = ? AND ", [user_id])
// }


export async function postTask(task_name, task_description, user_id) {
    const { rows } = await pool.query(
        `INSERT INTO tasks
        (task_name, task_description, user_id)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [task_name, task_description, user_id]
    );

    return rows[0];
}


export async function updateTask(
    task_id,
    task_name,
    task_description,
    user_id,
    task_colour
) {
    const { rows } = await pool.query(
        `UPDATE tasks
        SET
            task_name = $1,
            task_description = $2,
            task_colour = COALESCE($3, task_colour)
        WHERE task_id = $4
        AND user_id = $5
        RETURNING *`,
        [
            task_name,
            task_description,
            task_colour,
            task_id,
            user_id
        ]
    );

    return rows[0];
}


export async function deleteTask(task_id, user_id) {
    await pool.query(
        `DELETE FROM tasks
        WHERE task_id = $1
        AND user_id = $2`,
        [task_id, user_id]
    );
}

export async function getTimeSessionByTaskID(task_id) {
    const { rows } = await pool.query(
        "SELECT * FROM time_session WHERE task_id = $1",
        [task_id]
    );

    return rows[0];
}

export async function postTimeSession(start_time, stop_time, task_id, time_wasted) {
    const { rows } = await pool.query(
        `INSERT INTO time_session
        (start_time, stop_time, task_id, time_wasted)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [start_time, stop_time, task_id, time_wasted]
    );

    return rows[0];
}

export async function updateTimeSession(start_time, stop_time, task_id, time_wasted) {
    const { rows } = await pool.query(
        `UPDATE time_session
        SET
            start_time = $1,
            stop_time = $2,
            time_wasted = $3
        WHERE task_id = $4
        RETURNING *`,
        [start_time, stop_time, time_wasted, task_id]
    );

    return rows[0];
}

export async function getUser(displayName, email) {
    const { rows } = await pool.query(
        `SELECT *
        FROM users
        WHERE username = $1
        AND email = $2`,
        [displayName, email]
    );

    return rows;
}

export async function getUserByGoogleId(google_id) {
    const { rows } = await pool.query(
        `SELECT *
        FROM users
        WHERE google_id = $1`,
        [google_id]
    );

    return rows;
}

export async function postUser(displayName, email, google_id) {
    const { rows } = await pool.query(
        `INSERT INTO users
        (username, email, google_id)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [displayName, email, google_id]
    );

    return rows[0];
}

export const getTasksWithSessions = async (user_id) => {
    const { rows } = await pool.query(
        `
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
        WHERE t.user_id = $1
        `,
        [user_id]
    );

    return rows;
};

export async function getUserTimeStats(user_id, days = 30) {
    const { rows } = await pool.query(
        `
        SELECT
            COALESCE(
                SUM(
                    (EXTRACT(EPOCH FROM (ts.stop_time - ts.start_time)) / 60)
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

        WHERE t.user_id = $1
        AND ts.start_time >= NOW() - ($2 * INTERVAL '1 day')
        `,
        [user_id, days]
    );

    return rows[0];
}

export async function getUserTaskLimits(user_id) {
    const { rows } = await pool.query(
        `
        SELECT *
        FROM user_task_limits
        WHERE user_id = $1
        ORDER BY CASE colour
            WHEN 'darkgreen' THEN 1
            WHEN 'limegreen' THEN 2
            WHEN 'yellow' THEN 3
            WHEN 'orange' THEN 4
            WHEN 'red' THEN 5
        END
        `,
        [user_id]
    );

    const numOfTaskColours = 5;

    if (rows.length !== numOfTaskColours) {

        await pool.query(
            "DELETE FROM user_task_limits WHERE user_id = $1",
            [user_id]
        );

        await pool.query(
            `
            INSERT INTO user_task_limits (user_id, colour, minutes)
            VALUES
                ($1, 'red', 0),
                ($1, 'orange', 180),
                ($1, 'yellow', 300),
                ($1, 'limegreen', 390),
                ($1, 'darkgreen', 480)
            `,
            [user_id]
        );

        const { rows: newRows } = await pool.query(
            `
            SELECT *
            FROM user_task_limits
            WHERE user_id = $1
            ORDER BY CASE colour
                WHEN 'darkgreen' THEN 1
                WHEN 'limegreen' THEN 2
                WHEN 'yellow' THEN 3
                WHEN 'orange' THEN 4
                WHEN 'red' THEN 5
            END
            `,
            [user_id]
        );

        return newRows;
    }

    return rows;
}

export async function updateUserTaskLimits(user_id, colour, minutes) {
    await pool.query(
        `
        UPDATE user_task_limits
        SET minutes = $1
        WHERE user_id = $2
        AND colour = $3
        `,
        [minutes, user_id, colour]
    );
}