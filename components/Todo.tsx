"use client";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";

const Todo = () => {
  // States
  const [activeTab, setActiveTab] = useState("All");
  const [newUser, setNewUser] = useState<string>("");
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<
    { user: string; task: string; status: string; checked: boolean }[]
  >([
    {
      user: "Bilal Majeed",
      task: "Do some shopping",
      status: "Active",
      checked: false,
    },
    {
      user: "John Doe",
      task: "Complete todo list",
      status: "Completed",
      checked: true,
    },
    {
      user: "Bilal Majeed",
      task: "Go to gym",
      status: "Active",
      checked: false,
    },
    {
      user: "Bilal Majeed",
      task: "Go to office",
      status: "Active",
      checked: false,
    },
  ]);

  // Functions
  // Add Task
  const handleSubmit = (e: React.MouseEvent): void => {
    if (newUser === "" || newTask === "") {
      return;
    } else {
      const newTaskObject = {
        user: newUser,
        task: newTask,
        status: "Active", // Default status can be changed as needed
        checked: false, // Default to unchecked
      };
      setTasks([newTaskObject, ...tasks]);
      setNewUser("");
      setNewTask("");
    }
  };

  // CheckBox
  const handleCheckboxChange = (index: number): void => {
    const updatedTasks = tasks.map((task, i) =>
      i === index
        ? {
            ...task,
            checked: !task.checked,
            status: task.checked ? "Active" : "Completed",
          }
        : task
    );
    setTasks(updatedTasks);
  };

  // Delete
  const handleDelete = (index: number): void => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, status: "Deleted" };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  // Task counter
  const getCountByStatus = (status) => {
    if (status === "All") {
      return tasks.length;
    }
    return tasks.filter((task) => task.status === status).length;
  };

  return (
    <div>
      <div className="flex gap-5">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="User Name"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            className="text-[16px] py-2 rounded-md col-span-1 px-2 outline-none"
          />
          <input
            type="text"
            placeholder="Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="text-[16px] py-2 rounded-md col-span-2 px-2 outline-none"
          />
        </div>
        <button
          onClick={(e) => handleSubmit(e)}
          className="bg-blue-700 text-white p-2 px-5 text-[16px] rounded-md col-span-1 outline-none transition-colors duration-500"
        >
          Add
        </button>
      </div>
      <div className="flex justify-between items-center mt-10">
        <h1 className="font-bold">All todos</h1>
        <div className="flex justify-between items-center w-[376px] h-[50px] bg-white rounded-full py-2 px-5 text-[12px] font-medium">
          <h1
            className={`cursor-pointer ${
              activeTab === "All"
                ? "bg-[#4C30FF] text-white px-5 py-2 rounded-full shadow-md"
                : ""
            }`}
            onClick={() => setActiveTab("All")}
          >
           All ({getCountByStatus("All")})
          </h1>
          <h1
            className={`cursor-pointer ${
              activeTab === "Completed"
                ? "bg-[#4C30FF] text-white px-5 py-2 rounded-full shadow-md"
                : ""
            }`}
            onClick={() => setActiveTab("Completed")}
          >
            Completed ({getCountByStatus("Completed")})
          </h1>
          <h1
            className={`cursor-pointer ${
              activeTab === "Active"
                ? "bg-[#4C30FF] text-white px-5 py-2 rounded-full shadow-md"
                : ""
            }`}
            onClick={() => setActiveTab("Active")}
          >
            Active ({getCountByStatus("Active")})
          </h1>
          <h1
            className={`cursor-pointer ${
              activeTab === "Deleted"
                ? "bg-[#4C30FF] text-white px-5 py-2  rounded-full shadow-md"
                : ""
            }`}
            onClick={() => setActiveTab("Deleted")}
          >
            Deleted ({getCountByStatus("Deleted")})
          </h1>
        </div>
      </div>
      <div className="bg-white px-2 py-2 mt-5 rounded-md flex justify-between flex-col mb-10">
        {tasks
          .filter((task) => activeTab === "All" || task.status === activeTab)
          .map((task, index) => (
            <div
              key={index}
              className={`mt-5 flex justify-between items-center p-2 rounded-md bg-white ${
                task.status === "Deleted" ? "bg-red-200" : ""
              } border-2`}
            >
              <div className="flex gap-5 items-center w-full">
                <p className="font-semibold w-1/4 ">{task.user}</p>
                <p className="flex-1 ">{task.task}</p>
              </div>

              <div className="flex items-center gap-5">
                <p
                  className={`${
                    task.status === "Active"
                      ? "text-yellow-500 px-3 py-2 bg-yellow-200 rounded-full"
                      : task.status === "Completed"
                      ? "text-green-500 px-3 py-2 bg-green-200 rounded-full"
                      : "text-red-500 px-3 py-2 bg-red-200 rounded-full"
                  }`}
                >
                  {task.status}
                </p>
                <MdDelete
                  size={20}
                  className={`text-red-400 cursor-pointer ${
                    task.status === "Deleted" ? "hidden" : ""
                  }`}
                  onClick={() => handleDelete(index)}
                />
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={task.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  {task.checked ? (
                    <ImCheckboxChecked
                      className={`text-green-400 cursor-pointer ${
                        task.status === "Deleted" ? "hidden" : ""
                      }`}
                    />
                  ) : (
                    <ImCheckboxUnchecked
                      className={`text-red-400 cursor-pointer ${
                        task.status === "Deleted" ? "hidden" : ""
                      }`}
                    />
                  )}
                </label>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Todo;
