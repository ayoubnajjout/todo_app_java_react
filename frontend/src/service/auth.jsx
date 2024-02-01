import React, { Component, useContext, createContext } from "react";
import { authUser } from "../api/config";

const Auth = createContext();
export const useAuth = () => useContext(Auth);

export default class AuthProvider extends Component {
  state = {
    isLogged: false,
    currentUser: null
    };

    login = async (credential) => {
      try {
        const response = await authUser(credential);
        if (response.status === 200) {
          this.setState({ isLogged: true, currentUser: credential.username });
          return true;
        } else {
          console.error("Login failed. Status: ", response.status);
          return false;
        }
      } catch (error) {
        console.error("Error during login:", error.message);
        return false;
      }
    };

  logout = () => {
    this.setState({ isLogged: false, currentUser: null});
    sessionStorage.clear();
  };

  render() {
    return (
      <Auth.Provider
        value={{
          login: this.login,
          logout: this.logout,
          currentUser: this.state.currentUser,
          isLogged: this.state.isLogged,
        }}
      >
        {this.props.children}
      </Auth.Provider>
    );
  }
}
