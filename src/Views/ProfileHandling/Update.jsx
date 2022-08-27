import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export const Update = (props) => {

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.user === null) {
      navigate("/403");
      return;
    }
    fillInfo();
  }, []);

  async function handleSignin() {
    if (!document.getElementById("password").value) return toast.error("Password is required", { autoClose: true });
    if (passwordsMatch === false) {
      if (!document.getElementById("confPassword").value) return toast.error("Confirm your password", { autoClose: true });
      if (passwordsMatch === false) return toast.error("Passwords do not match", { autoClose: true });
    }
    if (!document.getElementById("nameIn").value) return toast.error("Some name is required", { autoClose: true });
    if (!document.getElementById("apellidoIn").value) return toast.error("Some last name is required", { autoClose: true });
    if (!document.getElementById("correoIn").value) return toast.error("Email is required", { autoClose: true });
    if (!document.getElementById("telefonoIn").value) return toast.error("Phone number is required", { autoClose: true });
    var data = await setUserlogin();
  }

  function enableCheckPassword() {
    document.getElementById("checkDiv").hidden = false;
    setPasswordsMatch(false);
  }

  function checkPassword() {
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("confPassword").value;
    if (password !== password2) {
      document.getElementById("confPassword").style.borderColor = "red";
      document.getElementById("confPassword").style.borderWidth = "1.5px";
      document.getElementById("messagePass").innerHTML =
        "Passwords do not match";
      document.getElementById("messagePass").style.color = "red";
      setPasswordsMatch(false);
    } else {
      document.getElementById("confPassword").style.borderColor = "green";
      document.getElementById("messagePass").innerHTML = "";
      setPasswordsMatch(true);
    }
  }

  async function setUserlogin() {
    let indUser = props.user[0][2];
    let indPassword = props.user[0][1];
    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    let nombre = document.getElementById("nameIn").value;
    let apellido = document.getElementById("apellidoIn").value;
    let correo = document.getElementById("correoIn").value;
    let telefono = document.getElementById("telefonoIn").value;

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        indUser: indUser,
        indPassword: indPassword,
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
    if (data === "User updated!") {
      setTimeout(function () {
        props.handleLogout();
        navigate("/Login");
      }, 3000);
    }
  }

  const fillInfo = () => {
    document.getElementById("userName").value = props.user[0][2];
    document.getElementById("password").value = props.user[0][1];
    document.getElementById("nameIn").value = props.user[0][3];
    document.getElementById("apellidoIn").value = props.user[0][4];
    document.getElementById("correoIn").value = props.user[0][5];
    document.getElementById("telefonoIn").value = props.user[0][6];
  };

  return (
    <div className="bg-em_white shadow px-4 py-5 sm:rounded-lg sm:p-6 h-screen">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Personal Information
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Update your personal information.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            You can update only one field, just leave the rest as they are.
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
                className="mt-1 focus:ring-em_orange focus:border-em_orange block w-full shadow-sm sm:text-sm border-em_orange rounded-md bg-gray-300"
                readOnly
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Pasword
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="family-name"
                className="mt-1 focus:ring-em_orange focus:border-em_orange block w-full shadow-sm sm:text-sm border-em_orange rounded-md"
                onChange={enableCheckPassword}
              />
            </div>

            <div id="checkDiv" className="col-span-6 sm:col-span-2" hidden>
              <div className="flex w-full justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 w-fit"
                >
                  Confirm Password
                </label>
                <p
                  className="text-right right-0 text-sm w-fit font-medium text-gray-700"
                  id="messagePass"
                ></p>
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

            <div className="col-span-6 sm:col-span-3">
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

            <div className="col-span-6 sm:col-span-3">
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
                Tel. number
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
          className="mt-10 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-em_brown hover:bg-em_brown_hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-em_brown"
        >
          Save
        </button>
      </div>

      <div className="flex justify-center items-center"></div>
    </div>
  );
};
