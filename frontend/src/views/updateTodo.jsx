import React from "react";
import Navbar from "../components/navbar";
import Form from "../components/form";
import { useAuth } from "../service/auth";
import { useNavigate, useParams } from "react-router-dom";
import { updateTodoById } from "../api/config";

export default function UpdateTodo() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  function updateTodo(_TODO) {
    updateTodoById(authContext.currentUser, id, _TODO)
      .then(() => navigate("/"))
      .catch((error) => console.log(error.message));
  }

  return (
    <div>
      <Navbar />
      <Form onValidation={updateTodo} />
    </div>
  );
}
