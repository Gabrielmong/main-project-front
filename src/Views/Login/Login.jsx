import UserProfile from "../../Components/UserData/UserProfile";
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/images/empanada.png";
import { Link } from "react-router-dom";

export const Login = (props) => {
  let navigate = useNavigate();

  async function handleLogin() {
    document.getElementById("message").innerHTML = "";
    var data = await getUserlogin();
    props.handleLogin(data);
    navigate("/profile");
  }

  async function getUserlogin() {
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    const response = await fetch(
      "/userCrud?userName=" + userName + "&password=" + password
    );
    const data = await response.text();
    if (data === "User not found" || data === "Missing required fields") {
      document.getElementById("message").innerHTML = data;
      setTimeout(function () {
        document.getElementById("message").innerHTML = "";
      }, 3000);
    } else {
      return JSON.parse(data);
    }
  }

  return (
    <>
      <div className="bg-em_white min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src={Logo} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log In
          </h2>
          <h4
            id="message"
            className="mt-1 text-center text-2x1 font-semibold text-red-600"
          ></h4>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                className="mt-5 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-em_brown hover:bg-em_brown_hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleLogin}
              >
                Sign in
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">New here?</span>
                </div>
              </div>

              <div>
                <Link
                  to="/Signin"
                  className="mt-6 w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
