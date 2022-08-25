import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/empanada.png";

const navigation = [
  { name: "Reviews", href: "/Reviews" },
  { name: "Dishes", href: "/Dishes" },
  { name: "Drinks", href: "/Drinks" },
];

export const Navbar = (props) => {
  return (
    <header className="bg-gradient-to-r from-em_orange to-em_yellow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-em_white lg:border-none">
          <div className="flex items-center">
            <Link to="/">
              <img className="h-10 w-auto" src={logo} alt="Empanadas Review" />
            </Link>
            <Link to="/" className="font-semibold text-em_white ml-3">
              <span className="hidden md:inline-block">Empanadas Review</span>
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-base font-medium text-em_white hover:text-indigo-50"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          {props.user === null ? (
            <div className="ml-10 space-x-4">
              <Link
                to="/Login"
                className="inline-block bg-em_brown py-2 px-4 rounded-md text-base font-medium text-em_white hover:bg-em_brown_hover"
              >
                Log in
              </Link>
              <Link
                to="/Signin"
                className="inline-block bg-em_brown py-2 px-4 rounded-md text-base font-medium text-em_white hover:bg-em_brown_hover"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <Link
              to="/Profile"
              className="inline-block bg-em_brown py-2 px-4 rounded-md text-base font-medium text-em_white hover:bg-em_brown_hover"
            >
              {props.user[0][2]}
            </Link>
          )}
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};
