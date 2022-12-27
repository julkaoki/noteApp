import "./../styles/styles.css"
import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, setDoc } from "firebase/firestore";

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

// 

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
    completedBtn.classList.add("complete-btn");
    completedBtn.innerText = "Zrobione!";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "Usuń";

    deleteBtn.addEventListener("click", () => {
      const toDoTask = doc(db, "tasks", taskId);
      deleteDoc(toDoTask);
    });

    taskCard.appendChild(taskNameHeader);
    taskCard.appendChild(taskDate);
    taskCard.appendChild(taskTime);
    taskCard.appendChild(completedBtn);
    taskCard.appendChild(deleteBtn);

    taskCard.dataset.id = taskId;
    completedBtn.dataset.id = taskId;
    deleteBtn.dataset.id = taskId;

    currentTasks.appendChild(taskCard);

    completedBtn.addEventListener("click", () => {
      const toDoTask = doc(db, "tasks", taskId);
      const completedTask = doc(db, "completedTasks", taskId);
      setDoc(completedTask, {
        name: `${taskData.name}`,
        date: `${taskData.date}`,
        time: `${taskData.time}`,
        priority: taskData.priority
      });
      deleteDoc(toDoTask);
      // currentTasks.removeChild(taskCard);
    });

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

  const restoreBtn = document.createElement("button");
  restoreBtn.classList.add("restore-btn");
  restoreBtn.innerText = "Przywróć";

  restoreBtn.addEventListener("click", () => {
      const toDoTask = doc(db, "tasks", taskId);
      const completedTask = doc(db, "completedTasks", taskId);
      setDoc(toDoTask, {
        name: `${taskData.name}`,
        date: `${taskData.date}`,
        time: `${taskData.time}`,
        priority: taskData.priority
      });
      deleteDoc(completedTask);
    });

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerText = "Usuń";

  deleteBtn.addEventListener("click", () => {
    const completedTask = doc(db, "completedTasks", taskId);
    deleteDoc(completedTask);
  });

  taskCard.appendChild(taskNameHeader);
  taskCard.appendChild(taskDate);
  taskCard.appendChild(restoreBtn);
  taskCard.appendChild(deleteBtn);

  taskCard.dataset.id = taskId;
  restoreBtn.dataset.id = taskId;
  deleteBtn.dataset.id = taskId;

  doneTasks.appendChild(taskCard);
}

// SHOW TASKS FROM DATABASE

onSnapshot(tasksCol, (snapshot) => {
  currentTasks.innerHTML = "";
  snapshot.forEach((taskDoc) => {
    const taskItem = taskDoc.data();
    const taskId = taskDoc.id;
    createTaskCard(taskId, taskItem);
  });
});

onSnapshot(completedCol, (snapshot) => {
  doneTasks.innerHTML = "";
  snapshot.forEach((taskDoc) => {
    const taskItem = taskDoc.data();
    const taskId = taskDoc.id;
    createCompletedTaskCard(taskId, taskItem);
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

