import "./../styles/styles.css"
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

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

// INPUT WINDOWS

const taskInp = document.getElementById("task-name");
const priorityInp = document.getElementById("priority");
const dateInp = document.getElementById("date");
const timeInp = document.getElementById("time");
const newTaskBtn = document.getElementById("new-task-btn");

// YOUR TASKS SECTION

const currentTasks = document.getElementById("to-do-tasks");

// CREATE TASK CARD FUNCTION

function createTaskCard(name, priority, date, time) {
    const taskCard = document.createElement("div");
    taskCard.classList.add("card-body");

    const taskNameHeader = document.createElement("h4");
    taskNameHeader.classList.add("card-subtitle");
    taskNameHeader.innerText = name;

    const taskDate = document.createElement("p");
    taskDate.classList.add("card-text");
    taskDate.innerText = date;

    const taskTime = document.createElement("p");
    taskDate.classList.add("card-text");
    taskDate.innerText = time;

    taskCard.appendChild(taskNameHeader);
    taskCard.appendChild(taskDate);
    taskCard.appendChild(taskTime);

    currentTasks.appendChild(taskCard);
}

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

    console.log(taskName, priority, date, time);

    createTaskCard(taskName, priority, date, time);

    addDoc(tasksCol, {
      name: `${taskName}`,
      date: `${date}`,
      time: `${time}`,
      priority: priority
    });

});