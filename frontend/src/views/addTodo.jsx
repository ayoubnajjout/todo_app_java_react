import React from "react";
import Navbar from "../components/navbar";
import Form from "../components/form";
import { addNewTodo } from "../api/config";
import { useAuth } from "../service/auth";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
  const authContext = useAuth();
  const navigate = useNavigate();

  function addTodo(_TODO) {
    addNewTodo(authContext.currentUser, _TODO)
      .then(() => navigate("/"))
      .catch((error) => console.log(error.message));
  }

  return (
    <div>
      <Navbar />
      <Form onValidation={addTodo} />
    </div>
  );
}
