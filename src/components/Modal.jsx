import React, { useContext, useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  // redirecting to home page or specifig page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password)
    login(email, password)
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: data.name,
          email: data.email,
        };
        axios
          .post("http://localhost:8080/users", userInfor)
          .then((response) => {
            alert("Signin successful!");
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Please provide valid email & password!");
      });
    reset();
  };

  // google signin
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axios
          .post("http://localhost:8080/users", userInfor)
          .then((response) => {
            alert("Signin successful!");
            navigate("/");
          });
      })
      .catch((error) => console.log(error));
  };
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <span class="text-sm text-gray-900">Welcome back</span>
            <h3 className="text-2xl font-bold">Login to your account</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password")}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* error */}
            {errorMessage ? (
              <p className="text-red text-xs italic">{errorMessage}</p>
            ) : (
              ""
            )}

            {/* login btn */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-red text-white"
              />
            </div>
            <div className="flex space-x-2 justify-center items-end bg-gray-700 hover:bg-gray-600 text-black py-2 rounded-md transition duration-100 bg-lightwight hover:bg-red hover:text-white">
              <img
                class=" h-5 cursor-pointer"
                src="https://i.imgur.com/arC60SB.png"
                alt=""
              />
              <button onClick={handleRegister}>Or sign-in with google</button>
            </div>

            <p className="text-center my-2">
              Do not have an account?{" "}
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>{" "}
            </p>

            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
