import { createBrowserRouter,Navigate } from "react-router-dom";
import Home from "./views/home";
import Login from "./views/login";
import Todo from "./views/todo";
import AddTodo from "./views/addTodo";
import Register from "./views/register";
import Page404 from "./views/page404";
import SecureWrapper from "./service/secure_wrapper"
import UpdateTodo from "./views/updateTodo";
import Settings from "./views/settings";

export const routes = createBrowserRouter([
  {
    path:'/',element:<SecureWrapper><Home/></SecureWrapper>
  },
  {
    path:'/todo',element:<SecureWrapper><Todo/></SecureWrapper>
  },
  {
    path:'/add-todo',element:<SecureWrapper><AddTodo/></SecureWrapper>
  },
  {
    path:'/update-todo/:id',element:<SecureWrapper><UpdateTodo/></SecureWrapper>
  },
  {
    path:'/login',element:<Login/>
  },
  {
    path:'/register',element:<Register/>
  },
  {
    path:'/:user/settings',element:<SecureWrapper><Settings/></SecureWrapper>
  },
  {
    path:'*',element:<Page404/>
  }
])