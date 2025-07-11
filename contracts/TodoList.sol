// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title TodoList
 * @author khoatran.kt1991@gmail.com (Kai Tran)
 * @notice This contract allows users to manage a list of tasks.
 * @dev This contract uses a simple array to store tasks.
 */
contract TodoList {
    struct Task {
        string description;
        bool completed;
    }

    Task[] public todos;
    event TaskAdded(uint256 indexed index, string description);
    event TaskUpdated(uint256 indexed index, bool completed);

    function addTask(string memory description) public {
        todos.push(Task({description: description, completed: false}));

        emit TaskAdded(todos.length - 1, description);
    }

    function toggleTask(uint256 index) public {
        require(index < todos.length, "Task index out of bounds");

        todos[index].completed = !todos[index].completed;

        emit TaskUpdated(index, todos[index].completed);
    }

    function getTasksCount() public view returns (uint256) {
        return todos.length;
    }

    function getTask(
        uint256 index
    ) public view returns (string memory description, bool completed) {
        require(index < todos.length, "Task index out of bounds");
        Task memory task = todos[index];
        return (task.description, task.completed);
    }

    function getAllTasks() public view returns (Task[] memory) {
        return todos;
    }
}
