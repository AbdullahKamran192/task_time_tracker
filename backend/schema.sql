CREATE DATABASE tasks_tracker;
USE tasks_tracker;

CREATE TABLE tasks (
	task_id INT PRIMARY KEY AUTO_INCREMENT,
	task_name VARCHAR(50) NOT NULL,
    task_description TEXT,
    task_colour VARCHAR(15)
);

CREATE TABLE time_session (
	time_session_id INT PRIMARY KEY AUTO_INCREMENT,
	start_time DATETIME NOT NULL,
    stop_time DATETIME NOT NULL,
    task_id INT NOT NULL UNIQUE,
    time_wasted INT NOT NULL DEFAULT 0,
    CONSTRAINT chk_stop_time CHECK (stop_time > start_time),
    FOREIGN KEY(task_id) REFERENCES tasks(task_id) ON DELETE CASCADE
);

