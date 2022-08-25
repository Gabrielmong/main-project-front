import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="bg-em_white h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-5/6 flex flex-center justify-center flex-col">
        <div className="text-center">
          <p className="mb-5 text-4xl font-extrabold text-em_brown sm:text-5xl sm:tracking-tight lg:text-6xl">
            How did you end up here?
          </p>
          <Link
            to="/"
            className="mt-1 text-base font-semibold text-em_orange tracking-wide uppercase"
          >
            Go back to the home page
          </Link>
        </div>
      </div>
    </div>
  );
};
