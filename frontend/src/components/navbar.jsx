import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../service/auth";

export default function Navbar() {

  const navigate = useNavigate();
  const authContext = useAuth();

  const logout = (e) => {
    e.preventDefault();
    authContext.logout();
    navigate('/login');
  }

  const items = [
    {
      name: "Home",
      id: 1,
      linkTo: "/",
    },
    {
      name: "Manage your todo",
      id: 2,
      linkTo: "/todo",
    },
    {
      name: "Add a new todo",
      id: 3,
      linkTo: "/add-todo",
    },
  ];

  return (
    <div>
      <nav className="bg-white border-gray-200 shadow-sm">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to='/'
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Eo_circle_purple_white_checkmark.svg/2048px-Eo_circle_purple_white_checkmark.svg.png"
              className="h-8"
              alt="#"
            />
            <span className="self-center text-3xl font-bold whitespace-nowrap">
              Todo
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto">
            <ul className="font-bold flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-12 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              {items.map((item) => (
                <li key={item.id}>
                  <Link to={item.linkTo}
                    className="block py-2 text-indigo-600 hover:text-indigo-700 rounded md:bg-transparent md:text-indigo-700 md:p-0"
                    aria-current="page"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4">
            <button className="text-indigo-600 hover:text-indigo-700 border border-indigo-600 hover:bg-gray-100 font-bold py-2 px-4 rounded-md">
              {authContext.currentUser}
            </button>
            <button onClick={logout} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
