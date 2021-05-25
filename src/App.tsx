import React, {FC, ChangeEvent, useState} from 'react';
import './App.css';
import {ITask} from "./Interfaces";
import TodoTask from "./Components/TodoTask";


const App: FC = () => {

    const [task, setTask] = useState<string>('')
    const [deadline, setTDeadline] = useState<number>(0)
    const [todoList, setTodoList] = useState<ITask[]>([])

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.name === 'task') {
            setTask(event.target.value)
        } else {
            setTDeadline(Number(event.target.value))
        }
    }

    const addTask = (): void => {
        const newTask = {taskName: task, deadline: deadline}
        setTodoList([...todoList, newTask])
        setTask('')
        setTDeadline(0)
    }

    const completeTask = (taskNametoDelete: string): void => {
        setTodoList(todoList.filter(task => {
            return task.taskName !== taskNametoDelete
        }))
    }

    return (
        <div className='app'>
            <div className="header">
                <div className="inputContainer">
                    <input
                        type="text"
                        placeholder='Tasks...'
                        onChange={handleChange}
                        name='task'
                        value={task}
                    />
                    <input
                        type="number"
                        placeholder='Deadline in days ...'
                        onChange={handleChange}
                        name='deadline'
                        value={deadline}
                    />
                </div>

                <button onClick={addTask}>Add Tasks</button>
            </div>
            <div className="todoList">
                {todoList.map((task: ITask, key: number) => {
                    return <TodoTask
                        key={key}
                        task={task}
                        completeTask={completeTask}
                    />
                })}
            </div>
        </div>
    );
}

export default App;
