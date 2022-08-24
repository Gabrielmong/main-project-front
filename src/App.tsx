import React, { FC } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CreateReview } from "./Components/Reviews/CreateReview";
import { EditReview } from "./Components/Reviews/EditReview";
import { FullReview } from "./Components/Reviews/FullReview";
import { About } from "./Views/About/About";
import { Home } from "./Views/Home/Home";
import { Login } from "./Views/Login/Login";
import { Profile } from "./Views/Profile/Profile";
import { ReviewsPage } from "./Views/ReviewsPage/ReviewsPage";
import { Signin } from "./Views/ProfileHandling/Signin";
import { Update } from "./Views/ProfileHandling/Update";
import { NotFound } from "./Components/Generalized/NotFound";
import { Forbidden } from "./Components/Generalized/Forbidden";
import { DishesPage } from "./Views/Optional/DishesPage";
import { DrinksPage } from "./Views/Optional/DrinksPage";
import { Navbar } from "./Components/Generalized/Navbar";
import { Footer } from "./Components/Generalized/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App: FC = () => {
  const [user, setUser] = React.useState<any>(null);

  const handleLogin = (user: any) => {
    setUser(user);

  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="bottom-right"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/Reviews" element={<ReviewsPage user={user} />} />
          <Route
            path="/Reviews/Create"
            element={<CreateReview user={user} />}
          />
          <Route
            path="/Review/:id"
            element={<FullReview user={user}/>}
          />
          <Route path="/editReview/:id" element={<EditReview user={user} />} />
          <Route path="/About" element={<About />} />
          <Route
            path="/Profile"
            element={
              <Profile
                user={user}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              />
            }
          />
          <Route
            path="/Login"
            element={<Login user={user} handleLogin={handleLogin} />}
          />
          <Route
            path="/Signin"
            element={<Signin user={user} handleLogin={handleLogin} />}
          />
          <Route path="/Update" element={<Update user={user} />} />
          <Route path="/Dishes" element={<DishesPage />} />
          <Route path="/Drinks" element={<DrinksPage />} />
          <Route path="/403" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
};
