import React from "react";
import "./tasklist.css";
import PropTypes from "prop-types";
import plusIcon from "../../img/plus-icon.svg";

import TaskItem from "../TaskItem/TaskItem";

export default function TaskList({
  title,
  taskState,
  onAddTask,
  tasks,
  onTaskUpdate,
  onDeleteTask,
  onLoadTask
}) {
  const addTask = () => {
    onAddTask("Nova tarefa", taskState, "");
  };

  const loadTasks = () => {
    console.log("Primeiro aqui na TaskList");
    onLoadTask();
  };

  return (
    <div className="tasklist">
      <div className="title">{title}</div>
      <div className="content">
        {tasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              taskState={task.state}
              onTaskUpdate={onTaskUpdate}
              onDeleteTask={onDeleteTask}
              onLoadTask={onLoadTask}
            />
          );
        })}
        {tasks.length === 0 && <div className="empty-list">Lista vazia</div>}
        <button className="btn" onClick={addTask} onLoad={loadTasks}>
          <img src={plusIcon} alt="Add new task" />
          Adicionar
        </button>
      </div>
    </div>
  );
}

TaskList.propTypes = {
  //Definindo os tipos das props
  title: PropTypes.string.isRequired,
  onAddTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired
};
