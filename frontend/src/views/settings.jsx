import React, { useRef, useState } from "react";
import Navbar from "../components/navbar";
import { getUserCredentials, updatedUserCredentials } from "../api/config";
import { useAuth } from "../service/auth";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const authContext = useAuth();
  const usernameRef = useRef();
  const emailRef = useRef();
  const newEmailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const confirmNewRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [errState, setErrState] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const res = await getUserCredentials(authContext.currentUser);
    if (
      res.data.email === emailRef.current.value &&
      res.data.password === passwordRef.current.value
    ) {
      const newCredentials = {
        username: usernameRef.current.value,
        email: newEmailRef.current.value,
        password: confirmRef.current.value,
      };      
      setErrState(false);
      if (confirmRef.current.value === confirmNewRef.current.value) {
        updatedUserCredentials(authContext.currentUser,newCredentials);
        authContext.logout();
      } else {
        setErrState(true);
        setError(
          "New password and new password confirmation dont match ! check again your new password !"
        );
      }
    } else {
      setErrState(true);
      setError("Error entering credentials ! check your email or password !");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Manage your account
          </h2>
        </div>
        {errState ? (
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-red-600 font-semibold text-white flex items-center justify-center py-8 px-4 shadow-sm sm:rounded-lg sm:px-10">
              {error}
            </div>
          </div>
        ) : null}

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  change your username
                </label>
                <div className="mt-1">
                  <input
                    ref={usernameRef}
                    type="text"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Change your Username"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter current email
                </label>
                <div className="mt-1">
                  <input
                    ref={emailRef}
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Change your email
                </label>
                <div className="mt-1">
                  <input
                    ref={newEmailRef}
                    type="text"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter new Email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter current password
                </label>
                <div className="mt-1">
                  <input
                    ref={passwordRef}
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter new password
                </label>
                <div className="mt-1">
                  <input
                    ref={confirmRef}
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm new password
                </label>
                <div className="mt-1">
                  <input
                    ref={confirmNewRef}
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm your new password"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={submit}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
