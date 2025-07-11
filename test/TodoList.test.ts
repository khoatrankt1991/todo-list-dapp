import { expect } from "chai";
import { ethers } from "hardhat";
import { TodoList } from "../typechain-types";

describe("TodoList", function () {
  let todoList: TodoList;
  let owner: any;
  let addr1: any;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    
    const TodoListFactory = await ethers.getContractFactory("TodoList");
    todoList = await TodoListFactory.deploy();
    await todoList.waitForDeployment();
  });

  describe("addTask", function () {
    it("Should add a task with correct description and false completion status", async function () {
      const taskDescription = "Learn Solidity";
      
      await todoList.addTask(taskDescription);
      
      const task = await todoList.getTask(0);
      expect(task.description).to.equal(taskDescription);
      expect(task.completed).to.be.false;
      
      const tasksCount = await todoList.getTasksCount();
      expect(tasksCount).to.equal(1);
    });

    it("Should emit TaskAdded event", async function () {
      const taskDescription = "Learn Solidity";
      
      await expect(todoList.addTask(taskDescription))
        .to.emit(todoList, "TaskAdded")
        .withArgs(0, taskDescription);
    });

    it("Should add multiple tasks", async function () {
      await todoList.addTask("Task 1");
      await todoList.addTask("Task 2");
      
      const tasksCount = await todoList.getTasksCount();
      expect(tasksCount).to.equal(2);
      
      const task1 = await todoList.getTask(0);
      const task2 = await todoList.getTask(1);
      
      expect(task1.description).to.equal("Task 1");
      expect(task2.description).to.equal("Task 2");
    });
  });

  describe("toggleTask", function () {
    beforeEach(async function () {
      await todoList.addTask("Test task");
    });

    it("Should toggle task completion status from false to true", async function () {
      await todoList.toggleTask(0);
      
      const task = await todoList.getTask(0);
      expect(task.completed).to.be.true;
    });

    it("Should toggle task completion status from true to false", async function () {
      await todoList.toggleTask(0); // false -> true
      await todoList.toggleTask(0); // true -> false
      
      const task = await todoList.getTask(0);
      expect(task.completed).to.be.false;
    });

    it("Should emit TaskUpdated event", async function () {
      await expect(todoList.toggleTask(0))
        .to.emit(todoList, "TaskUpdated")
        .withArgs(0, true);
    });

    it("Should revert for invalid task index", async function () {
      await expect(todoList.toggleTask(1))
        .to.be.revertedWith("Task index out of bounds");
    });

    it("Should revert for empty task list", async function () {
      const emptyTodoList = await (await ethers.getContractFactory("TodoList")).deploy();
      await emptyTodoList.waitForDeployment();
      
      await expect(emptyTodoList.toggleTask(0))
        .to.be.revertedWith("Task index out of bounds");
    });
  });

  describe("getAllTasks", function () {
    it("Should return empty array for no tasks", async function () {
      const tasks = await todoList.getAllTasks();
      expect(tasks.length).to.equal(0);
    });

    it("Should return all tasks", async function () {
      await todoList.addTask("Task 1");
      await todoList.addTask("Task 2");
      await todoList.toggleTask(0);
      
      const tasks = await todoList.getAllTasks();
      expect(tasks.length).to.equal(2);
      expect(tasks[0].description).to.equal("Task 1");
      expect(tasks[0].completed).to.be.true;
      expect(tasks[1].description).to.equal("Task 2");
      expect(tasks[1].completed).to.be.false;
    });
  });
});