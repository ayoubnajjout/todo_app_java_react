import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { useAuth } from "../service/auth";

export default function Home() {

  const authContext = useAuth();

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-20">
        <div>
          <h1 className="text-indigo-600 font-bold text-4xl">
            Welcome back {authContext.currentUser} ! Good to see you again !
          </h1>
          <Link to="todo" className="flex items-center justify-center mt-2">
            Manage your todo list
            <span className="text-indigo-700 underline px-1">here</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
