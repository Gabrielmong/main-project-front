import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export const Signin = (props) => {

  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const navigate = useNavigate();

  async function handleSignin() {
    if (!document.getElementById("userName").value) return toast.error("Username is required", { autoClose: true });
    if (!document.getElementById("password").value) return toast.error("Password is required", { autoClose: true });
    if (!document.getElementById("confPassword").value) return toast.error("Confirm your password", { autoClose: true });
    if (passwordsMatch === false) return toast.error("Passwords do not match", { autoClose: true });
    if (!document.getElementById("nameIn").value) return toast.error("Some name is required", { autoClose: true });
    if (!document.getElementById("apellidoIn").value) return toast.error("Some last name is required", { autoClose: true });
    if (!document.getElementById("correoIn").value) return toast.error("Email is required", { autoClose: true });
    if (!document.getElementById("telefonoIn").value) return toast.error("Phone number is required", { autoClose: true });
    var data = await setUserlogin();
  }

  function checkPassword() {
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("confPassword").value;
    if (password !== password2) {
      document.getElementById("confPassword").style.borderColor = "red";
      document.getElementById("confPassword").style.borderWidth = "1.5px";
      document.getElementById("messagePass").innerHTML = "Passwords do not match";
      document.getElementById("messagePass").style.color = "red";
      setPasswordsMatch(false);
    } else {
      document.getElementById("confPassword").style.borderColor = "green";
      document.getElementById("messagePass").innerHTML = "";
      setPasswordsMatch(true);
    } 
  }

  async function setUserlogin() {
    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    let nombre = document.getElementById("nameIn").value;
    let apellido = document.getElementById("apellidoIn").value;
    let correo = document.getElementById("correoIn").value;
    let telefono = document.getElementById("telefonoIn").value;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        password: password,
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        telefono: telefono,
      }),
    };

    const response = await fetch("/userCrud", requestOptions);
    const data = await response.text();

    toast.success(data, { autoClose: true });
    setTimeout(function () {
      if (data === "User added!") {
        navigate("/login");
      }
    }, 3000);
  }

  return (
    <div className="bg-em_white shadow px-4 py-5 sm:rounded-lg sm:p-6 h-screen">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Personal Information
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Please enter your personal information.
          </p>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                autoComplete="given-name"
                className="mt-1 focus:ring-em_orange focus:border-em_orange block w-full shadow-sm sm:text-sm border-em_orange rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="family-name"
                className="mt-1 focus:ring-em_orange focus:border-em_orange block w-full shadow-sm sm:text-sm border-em_orange rounded-md"
              />
            </div>
            

            <div className="col-span-6 sm:col-span-2">
              <div className="flex w-full justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 w-fit"
                >
                  Confirm Password
                </label>
                <p className="text-right right-0 text-sm w-fit font-medium text-gray-700" id="messagePass"></p>
              </div>

              <input
                type="password"
                name="confPassword"
                id="confPassword"
                autoComplete="family-name"
                className="mt-1 focus:ring-em_orange focus:border-em_orange block w-full shadow-sm sm:text-sm border-em_orange rounded-md"
                onChange={checkPassword}
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="nameIn"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <input
                type="text"
                name="nameIn"
                id="nameIn"
                autoComplete="given-name"
                className="mt-1 focus:ring-em_orange focus:border-em_orange block w-full shadow-sm sm:text-sm border-em_orange rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="apellidoIn"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                type="text"
                name="apellidoIn"
                id="apellidoIn"
                autoComplete="family-name"
                className="mt-1 focus:ring-em_orange focus:border-em_orange block w-full shadow-sm sm:text-sm border-em_orange rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="correoIn"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="text"
                name="correoIn"
                id="correoIn"
                autoComplete="email"
                className="mt-1 focus:ring-em_orange focus:border-em_orange block w-full shadow-sm sm:text-sm border-em_orange rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="telefonoIn"
                className="block text-sm font-medium text-gray-700"
              >
                Phone number
              </label>
              <input
                type="text"
                name="telefonoIn"
                id="telefonoIn"
                autoComplete="email"
                className="mt-1 focus:ring-em_orange focus:border-em_orange block w-full shadow-sm sm:text-sm border-em_orange rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={handleSignin}
          type="button"
          className="mt-10 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-em_brown hover:bg-em_brown_hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-em_orange"
        >
          Sign Up!
        </button>
      </div>

      <div className="flex justify-center items-center"></div>
    </div>
  );
};
