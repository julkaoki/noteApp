import "./../styles/styles.css"
import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCzo9nfQ6ITrSXSZ-2qrxRMQN59JDlwdiU",
    authDomain: "noteapp-7ec7b.firebaseapp.com",
    projectId: "noteapp-7ec7b",
    storageBucket: "noteapp-7ec7b.appspot.com",
    messagingSenderId: "889568994523",
    appId: "1:889568994523:web:3dc8f8369405aff7de98fe"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const tasksCol = collection(db, "tasks");
const completedCol = collection(db, "completedTasks");

// INPUT WINDOWS

const taskInp = document.getElementById("task-name");
const priorityInp = document.getElementById("priority");
const dateInp = document.getElementById("date");
const timeInp = document.getElementById("time");
const newTaskBtn = document.getElementById("new-task-btn");

// TASKS SECTION

const currentTasks = document.getElementById("to-do-tasks");
const doneTasks = document.getElementById("done-tasks");

// CREATE TASK CARD FUNCTION

function createTaskCard(taskId, taskData) {
    const taskCard = document.createElement("div");
    taskCard.classList.add("card-body");

    const taskNameHeader = document.createElement("h5");
    taskNameHeader.classList.add("card-subtitle");
    taskNameHeader.innerText = taskData.name;

    const taskDate = document.createElement("div");
    taskDate.classList.add("card-text");
    taskDate.innerText = taskData.date;

    const taskTime = document.createElement("div");
    taskTime.classList.add("card-text");
    taskTime.innerText = taskData.time;

    const completedBtn = document.createElement("button");
    completedBtn.id = "complete-btn";
    completedBtn.classList.add("complete-btn");
    completedBtn.innerText = "Zrobione!";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "Usuń";

    taskCard.appendChild(taskNameHeader);
    taskCard.appendChild(taskDate);
    taskCard.appendChild(taskTime);
    taskCard.appendChild(completedBtn);
    taskCard.appendChild(deleteBtn);

    taskCard.dataset.id = taskId;
    completedBtn.dataset.id = taskId;
    deleteBtn.dataset.id = taskId;

    currentTasks.appendChild(taskCard);
}

function createCompletedTaskCard(taskId, taskData) {
  const taskCard = document.createElement("div");
  taskCard.classList.add("card-body");

  const taskNameHeader = document.createElement("h5");
  taskNameHeader.classList.add("card-subtitle");
  taskNameHeader.innerText = taskData.name;

  const taskDate = document.createElement("div");
  taskDate.classList.add("card-text");
  taskDate.innerText = taskData.date;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerText = "Usuń";

  taskCard.appendChild(taskNameHeader);
  taskCard.appendChild(taskDate);
  taskCard.appendChild(deleteBtn);

  taskCard.dataset.id = taskId;
  completedBtn.dataset.id = taskId;
  deleteBtn.dataset.id = taskId;

  doneTasks.appendChild(taskCard);
}

// SHOW TASKS FROM DATABASE

getDocs(tasksCol).then((docs) => {
  docs.forEach((taskDoc) => {
      const taskItem = taskDoc.data();
      const taskId = taskDoc.id;
      console.log(taskItem);
      createTaskCard(taskId, taskItem);
  });
});

// SHOW COMPLETED TASKS FROM DATABASE

getDocs(completedCol).then((docs) => {
  docs.forEach((taskDoc) => {
      const taskItem = taskDoc.data();
      const taskId = taskDoc.id;
      console.log(taskItem);
      // createCompletedTaskCard(taskId, taskItem);
  });
});



// NEW TASK BUTTON EVENT

newTaskBtn.addEventListener("click", () => {
    const taskName = taskInp.value;
    const priority = priorityInp.selectedIndex;
    const date = dateInp.value;
    const time = timeInp.value;

    taskInp.value = "";
    priorityInp.selectedIndex = "0";
    dateInp.value = "";
    timeInp.value = "";

    addDoc(tasksCol, {
      name: `${taskName}`,
      date: `${date}`,
      time: `${time}`,
      priority: priority
    });

});

// "TASK COMPLETED" BUTTON EVENTS

const completedBtn = document.getElementById("complete-btn");
completedBtn.addEventListener("click", (event) => {
    const clickedTask = doc(tasksCol, event.target.dataset.id);
    const completedTaskCopy = doc(completedCol, event.target.dataset.id);

    const taskName = clickedTask.name;
    //const priority = clickedTask.priority;
    const date = clickedTask.date;
    //const time = clickedTask.time;

    console.log("complete button");

    setDoc(completedTaskCopy, {
      name: `${taskName}`,
      date: `${date}`
    });

});

