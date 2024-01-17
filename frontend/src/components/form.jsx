import React, { useRef } from "react";
import { useAuth } from "../service/auth";

export default function Form({ onValidation }) {
  const authContext = useAuth();
  const todoRef = useRef();
  const dateRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo=todoRef.current.value;
    const date=dateRef.current.value;
    const _TODO={username:authContext.currentUser,description:todo,targetDate:date,done:false}
    onValidation(_TODO);
  };

  return (
    <div>
      <div className="mt-32 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New todo
              </label>
              <div className="mt-1">
                <input
                  ref={todoRef}
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Add a new todo"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Target date
              </label>
              <div className="mt-1">
                <input
                  ref={dateRef}
                  type="date"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
