import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [dueDate, setDueDate] = useState(null);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, date: dueDate, done: false }]);
            setNewTask("");
            setDueDate(null);
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const toggleDone = (index) => {
        const updatedTasks = tasks.map((task, i) => 
            i === index ? { ...task, done: !task.done } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <div className="container">
            <h1>Not To Do List</h1>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    placeholderText="Select due date"
                />
            </div>
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} style={{ textDecoration: task.done ? "line-through" : "none" }}>
                        {task.text} {task.date && `- Due: ${task.date.toLocaleDateString()}`}
                        <div className="button-container">
                            <button onClick={() => toggleDone(index)}>{task.done ? "Undo" : "Done"}</button>
                            <button onClick={() => deleteTask(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
