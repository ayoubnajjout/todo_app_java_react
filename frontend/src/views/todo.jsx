import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import {
  deleteTodoById,
  getTodoByUsername,
  toggleTodoState,
} from "../api/config";
import { useAuth } from "../service/auth";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const authContext = useAuth();
  const [todos, setTodo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => fetchTodo(), []);

  function fetchTodo() {
    getTodoByUsername(authContext.currentUser)
      .then((res) => setTodo(res.data))
      .catch((error) => console.log(error.message));
  }

  function deleteTodo(e, id) {
    e.preventDefault();
    const popup = window.confirm(
      "Are you sure you want to delete the item with id : " + id + "?"
    );
    if (popup) {
      deleteTodoById(authContext.currentUser, id)
        .then(() => fetchTodo())
        .catch((error) => console.log(error.message));
    }
  }

  function updateTodo(e, id) {
    e.preventDefault();
    navigate(`/update-todo/${id}`);
  }

  function toggletState(e, id) {
    e.preventDefault();
    toggleTodoState(authContext.currentUser, id)
      .then(() => fetchTodo())
      .catch((error) => console.log(error.message));
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-20">
        {/*<h1 className="text-indigo-600 font-bold text-xl">Your Todo :</h1>*/}
        <table className="w-1/2 text-lg text-left rtl:text-right text-gray-500 shadow-sm ">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-8 py-3">
                Todo item
              </th>
              <th scope="col" className="px-8 py-3">
                Target date
              </th>
              <th scope="col" className="px-8 py-3">
                is done
              </th>
              <th scope="col" className="px-8 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} className="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {todo.description}
                </th>
                <td className="px-6 py-4">{todo.targetDate}</td>
                <td className="px-6 py-4">
                  <button className="text-indigo-600 hover:text-indigo-700 border border-indigo-600 hover:bg-gray-100 py-2 px-4 rounded-md" onClick={(e) => toggletState(e, todo.id)}>
                    {todo.done.toString()}
                  </button>
                </td>
                <td className="flex gap-10 px-6 py-4">
                  <button
                    onClick={(e) => updateTodo(e, todo.id)}
                    className="text-indigo-600 hover:text-white border border-indigo-600 hover:bg-indigo-700 text-sm rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={(e) => deleteTodo(e, todo.id)}
                    className="text-red-600 hover:text-white border border-red-600 hover:bg-red-700 text-sm rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
