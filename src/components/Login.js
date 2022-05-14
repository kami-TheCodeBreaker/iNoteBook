import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import loginImage from "./images/login/img.png";

function Login() {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({ email: "", password: "" });
  const host = "http://localhost:5000";
  const onChangeHandler = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  // Login user
  const login = async (email, password) => {
    // Api call
    try {
      const url = `${host}/api/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      if (response.status !== 200) return toast.warning(json.error);

      if (json.status) {
        console.log(json);
        localStorage.setItem("auth-token", json.authtoken);
        navigate("/");
      }
    } catch (error) {
      console.log("error is", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(credential.email, credential.password);
    console.log(
      `email is ${credential.email} and password is ${credential.password}`
    );
  };
  return (
    <div className="loginPage w-full py-20 ">
      <div className="w-2/3 mt-9 mx-auto flex justify-betweenitems-center shadow-2xl">
        <div className="login-image w-1/2 ">
          <img
            src={loginImage}
            className=" w-full"
            style={{ height: "80vh" }}
          />
        </div>
        <div className="form w-1/2 bg-white " style={{ height: "80vh" }}>
          <div className="form-container flex flex-col justify-center items-center mt-12 gap-10 ">
            <div className="title text-3xl">LoveBirds</div>
            <div className="title">
              Welcome to Loverbirds
              <form
                action=""
                className=" rounded space-y-7"
                onSubmit={handleSubmit}
              >
                <div className="email flex flex-col justify-start  px-5 py-5 ">
                  <label className="text-xl my-3 text-black" htmlFor="email">
                    Users name or Email
                  </label>
                  <input
                    className="w-full h-10 "
                    type="email"
                    name="email"
                    value={credential.email}
                    id="email"
                    onChange={onChangeHandler}
                    required
                  />
                </div>
                <div className="password ">
                  <input
                    className="w-full h-10 "
                    type="password"
                    name="password"
                    value={credential.password}
                    id="password"
                    onChange={onChangeHandler}
                    required
                  />
                </div>
                <div className="login-btn">
                  <button
                    type="submit"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
