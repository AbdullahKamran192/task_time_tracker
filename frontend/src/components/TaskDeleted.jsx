import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const TaskDeleted = ({onClose}) => {

    return (
        <div>
            <h1>Task Deleted!</h1>
            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default TaskDeleted