import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import loginImage from "./images/login/img.jpg";
import { Link } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
    name: "",
  });
  const host = "http://localhost:5000";
  const onChangeHandler = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  // Login user
  const signUp = async (name, email, password) => {
    // Api call
    try {
      const url = `${host}/api/auth/createuser`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();
      if (!json.status) {
        json.errors.forEach((err) => {
          toast.warning(err.msg);
        });
      }

      if (json.status) {
        localStorage.setItem("auth-token", json.authtoken);
        toast.success("Account Created Successfully");
        navigate("/");
      }
    } catch (error) {
      toast.warning("error is", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(credential.name, credential.email, credential.password);
  };
  return (
    <div className="loginPage w-full py-20 ">
      <div className="w-2/3 mt-9 mx-auto flex justify-betweenitems-center shadow-2xl">
        <div className="login-image w-1/2 ">
          <img
            src={loginImage}
            className=" w-full"
            style={{ height: "80vh" }}
            alt="login "
          />
        </div>
        <div className="form w-1/2 bg-white " style={{ height: "80vh" }}>
          <div className="form-container flex flex-col justify-center items-center mt-12 gap-10  ">
            <div className="title text-3xl mt-3">
              Create Account to use iNoteBook{" "}
            </div>
            <div className="title text-xl mt-9 ">Welcome to iNoteBook</div>
            <div className="form">
              <form
                action=""
                className=" rounded space-y-5"
                onSubmit={handleSubmit}
              >
                <div className="login-input px-5 py-5 mx-20  space-y-5 ">
                  <label className="text-xl my-3 text-black" htmlFor="email">
                    Name, Email And Password
                  </label>
                  <input
                    className="w-full h-10 border-b-2 border-gray-300 outline-none px-3 py-3 rounded"
                    type="text"
                    name="name"
                    value={credential.name}
                    id="name"
                    onChange={onChangeHandler}
                    placeholder="Enter Name"
                    required
                  />
                  <input
                    className="w-full h-10 border-b-2 border-gray-300 outline-none px-3 py-3 rounded"
                    type="email"
                    name="email"
                    value={credential.email}
                    id="email"
                    onChange={onChangeHandler}
                    placeholder="Enter Email"
                    required
                  />
                  <input
                    className="w-full h-10 border-b-2 border-gray-300 outline-none px-3 py-3 rounded"
                    type="password"
                    name="password"
                    value={credential.password}
                    id="password"
                    onChange={onChangeHandler}
                    placeholder="Enter Password"
                    required
                  />
                  <div className="btn flex justify-center">
                    <button
                      type="submit"
                      className="inline-block  py-3 bg-blue-600 text-white font-medium  leading-tight uppercase  shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out rounded-xl px-7 text-xl "
                    >
                      Signup
                    </button>
                  </div>
                  <div className="signup-link flex justify-center">
                    <Link className="text-gray my-3 inline-block " to="/login">
                      <span className="underline">
                        Already have an Account ?
                      </span>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
