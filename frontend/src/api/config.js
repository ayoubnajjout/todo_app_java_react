import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getTodoByUsername = (username) =>
  api.get(`/users/${username}/todo`);

export const deleteTodoById = (username, id) =>
  api.delete(`/users/${username}/todo/${id}`);

export const addNewTodo = (username, todo) =>
  api.post(`/users/${username}/todo/add`, todo);

export const updateTodoById = (username, id, todo) =>
  api.put(`/users/${username}/todo/update/${id}`, todo);

export const toggleTodoState = (username, id) =>
  api.put(`/users/${username}/todo/toggle/${id}`);

export const addNewUser = (user) => {
  api.post('/register', user);
}

export const authUser = (credential) => {
  return api.post('/login', credential);
}

export const updatedUserCredentials = (user,userData) => {
  api.put(`${user}/edit`,userData);
}

export const getUserCredentials = (username) => {
  const res = api.get(`/getCredentials/${username}`)
  return res;
}