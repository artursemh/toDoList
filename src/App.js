import React, { useState, useEffect } from "react";
import "./styles.css";
import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList";
import Database from "./database.json";

const fs = require("fs");

let cont = 0;
let idAcc = 0;
const generateId = (idTask) => {
  if (idTask !== "") {
    idAcc = idTask;
  } else {
    idAcc = idAcc + 1;
  }
  return idAcc;
};

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, state, id) => {
    const newTask = {
      id: generateId(id),
      title,
      state
    };
    setTasks((existingTasks) => {
      var teste = [...existingTasks, newTask];
      console.log(teste);
      return teste;
    });
    let newElement = [
      ...Database,
      { id: 9, task: "Alterando Json", taskState: "Fazendo" }
    ];
    let dataElem = JSON.stringify(newElement);
    console.log(dataElem);
    //fs.writeFile('database2.json',dataElem);
  };

  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (id) => {
    setTasks((existingTasks) => {
      return existingTasks.filter((task) => task.id !== id);
    });
  };

  const loadTasks = () => {
    //"cont" rules the addTask function
    cont = cont + 1;
    if (cont === 1) {
      console.log(Database[0].task);
      for (var i = 0; i < Database.length; i++) {
        addTask(Database[i].task, Database[i].taskState, Database[i].id);
      }
      //Database = [...Database,{"id":9,"task":"Alterando Json","taskState":"Fazendo"}]
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <TaskList
          title="Pendente"
          onAddTask={addTask}
          taskState="Pendente"
          tasks={tasks.filter((t) => t.state === "Pendente")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
          onLoadTask={loadTasks}
        />
        <TaskList
          title="Fazendo"
          onAddTask={addTask}
          taskState="Fazendo"
          tasks={tasks.filter((t) => t.state === "Fazendo")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
          onLoadTask={loadTasks}
        />
        <TaskList
          title="Completo"
          onAddTask={addTask}
          taskState="Completo"
          tasks={tasks.filter((t) => t.state === "Completo")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
          onLoadTask={loadTasks}
        />
      </div>
    </div>
  );
}
