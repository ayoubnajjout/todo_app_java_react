import React, { Component, useContext, createContext } from "react";
import { api, basicAuthTokenService } from "../api/config";

const Auth = createContext();
export const useAuth = () => useContext(Auth);

export default class AuthProvider extends Component {
  state = {
    isLogged: false,
    currentUser: null,
    token:null
  };

  login = async (username, password) => {
    const baToken = "Basic " + window.btoa(username + ":" + password);
    try {
      const response = await basicAuthTokenService(baToken);
      console.log(response);
      if (response.status == 200) {
        this.setState({ isLogged: true, currentUser: username,token:baToken});
        api.interceptors.request.use(
          (config)=> {
            config.headers.Authorization=baToken;
            return config;
          }
        )
        return true;
      } else return false;
    } catch (error) {
      (err) => console.log(err.message);
      return false;
    }
  };

  logout = () => {
    this.setState({ isLogged: false, currentUser: null ,token:null});
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
          token:this.state.token
        }}
      >
        {this.props.children}
      </Auth.Provider>
    );
  }
}
