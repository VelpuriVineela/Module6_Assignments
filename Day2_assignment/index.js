const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Define tasks file path
const tasksFilePath = path.join(__dirname, "task.txt");

// Function to add a new task
const addTask = (task) => {
  fs.appendFileSync(tasksFilePath, task + "\n");
  console.log("Task added successfully");
};

//Function to view tasks
const viewTasks = () => {
  const tasks = fs
    .readFileSync(tasksFilePath, "utf8")
    .split("\n")
    .filter(Boolean);
  console.log("Tasks:");
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
};

// Function to mark a task a complete
const markTaskComplete = (taskIndex) => {
  const tasks = fs
    .readFileSync(tasksFilePath, "utf8")
    .split("\n")
    .filter(Boolean);
  if (taskIndex >= 1 && taskIndex <= tasks.length) {
    tasks[taskIndex - 1] = "[Completed] " + tasks[taskIndex - 1];
    fs.writeFileSync(tasksFilePath, tasks.join("\n"));
    console.log("Task marked as complete");
  } else {
    console.log("Invalid task index.");
  }
};

//Function to remove a task
const removeTask = (taskIndex) => {
  const tasks = fs
    .readFileSync(tasksFilePath, "utf8")
    .split("\n")
    .filter(Boolean);
  if (taskIndex >= 1 && taskIndex <= tasks.length) {
    tasks.splice(taskIndex - 1, 1);
    fs.writeFileSync(tasksFilePath, tasks.join("\n"));
    console.log("Task removed successfully");
  } else {
    console.log("Invalid task index");
  }
};

//Main function to start the task Manager

const main = () => {
  console.log("\n1. Add a new task");
  console.log("2. View tasks");
  console.log("3. Mark a task as complete");
  console.log("4. Remove a task");
  console.log("5. Exit");

  //Create readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  //Function to prompt user for input
  const prompt = () => {
    rl.question("Enter your choice: ", (choice) => {
      switch (choice) {
        case "1": {
          rl.question("Enter the task: ", (newTask) => {
            addTask(newTask);
            prompt();
          });
          break;
        }
        case "2": {
          viewTasks();
          prompt();
          break;
        }
        case "3": {
          rl.question(
            "Enter the task index to mark as complete: ",
            (completeIndex) => {
              markTaskComplete(completeIndex);
              prompt();
            }
          );
          break;
        }
        case "4": {
          rl.question("Enter the task to remove: ", (removeIndex) => {
            removeTask(parseInt(removeIndex));
            prompt();
          });
          break;
        }
        case "5": {
          console.log("Exiting...");
          rl.close();
          break;
        }
        default: {
          console.log("Invalid choice. Please try again");
          prompt();
        }
      }
    });
  };

  //Start prompting user for input
  prompt();
};

//Call the main function to start the task manager
main();
