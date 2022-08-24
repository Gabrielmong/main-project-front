import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./reviewsPage.css";

export const ReviewsPage = (props) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getAllReviews();
  }, []);

  function htmlToElement(html) {
    var template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  }

  async function getAllReviews() {
    var response = await fetch("/crudReviews");
    var data = await response.text();
    var inRevs = JSON.parse(data);
    setReviews(inRevs);
  }
  return (
    <div className="flex flex-col items-center justify-center h-content min-w-0 pt-5 bg-em_white">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-row justify-between items-center w-full pt-0">
          <p className="mt-1 text-4xl font-extrabold text-em_brown sm:text-3xl sm:tracking-tight lg:text-6xl mr-5">
            Reviews
          </p>
          {props.user ? (
            <Link
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full shadow-sm text-em_white bg-em_brown hover:bg-em_brown_hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:em_orange_hover text-center"
              to="/Reviews/Create"
            >
              Create Review
            </Link>
          ) : (
            <Link
              className="ml-1 inline-flex items-center px-5 py-1 text-base font-medium rounded-full shadow-sm text-em_white bg-em_orange hover:em_orange_hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:em_orange_hover text-center"
              to="/Login"
            >
              Login to leave a review
            </Link>
          )}
        </div>
        <div id="cards" className="cards">
          {reviews.map((review, key) =>  ( 
            <div className="card">
              <div className="card--image">
                <img
                  src={import.meta.env.VITE_IMG_URL + review[8]}
                  alt=""
                  width="200px"
                />
              </div>
              <div className="anotherContainer">
                <div className="card--content">
                  <h3 className="card--content--title">{review[1].replace("&#39", "'")}</h3>
                  <div className="yetanotherContainer">
                    <div className="card--location">
                      <p className="card--content--location">{review[7]}</p>
                    </div>

                    <p className="card--content--author">{review[2]}</p>
                  </div>
                  <p className="card--content--date">{review[5].slice(0, 10)}</p>
                </div>
                <div className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-em_brown hover:bg-em_brown_hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-em_brown">
                  <Link className="card--action" to={"/Review/"+review[0]}>
                    See
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
