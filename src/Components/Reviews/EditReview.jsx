import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { Preview } from "../Preview";

const revId = window.location.pathname.split("/")[2];

export const EditReview = (props) => {
  const [isReady, setIsReady] = useState(false);

  const navigate = useNavigate();

  const discard = () => {
    navigate(-1);
  }

  useEffect(() => {
    if (props.user === null) {
      navigate("/403");
      return;
    }
    setTimeout(function () {
      getReview();

    }, 150);
  }, [isReady]);

  const [file, setFile] = useState(null);
  const onInputChange = (event) => {
    setFile(event.target.files[0]);
    var fileName = event.target.files[0].name;
    setName(fileName);
  };

  function setName(file) {
    document.getElementById("fileName").innerHTML = file;
  }

  const charCounter = (event) => {
    let review = document.getElementById("reviewIn").value;
    let charCount = review.length;
    let charLeft = 1000 - charCount;

    if (charCount > 800 && charCount < 900) {
      document.getElementById("charLeft").style.color = "orange";
    } else if (charCount > 900) {
      document.getElementById("charLeft").style.color = "red";
    } else {
      document.getElementById("charLeft").style.color = "black";
    }

    document.getElementById("charLeft").innerHTML = charLeft;
    if (charCount == 1000) {
      document.getElementById("charLeft").innerHTML = "Stop typing jesus";
    }
  };

  async function getReview() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`/loneReview?id=${revId}`, requestOptions);
    const data = await response.json();
    document.getElementById("restauranteIn").innerHTML = data[0][1];
    document.getElementById("infoRest").innerHTML = data[0][1];
    document.getElementById("ratingIn").value = data[0][3];
    document.getElementById("ubicacionIn").innerHTML = data[0][7];
    document.getElementById("reviewIn").value = data[0][4].replace("&#39", "'");
    setIsReady(true);
  }

  async function editReview() {
    let rating = parseInt(document.getElementById("ratingIn").value);
    let review = document.getElementById("reviewIn").value.replace("'", "&#39");
    var todayDate = new Date().toISOString().slice(0, 10);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: revId,
        rating: rating,
        review: review,
        edited: todayDate,
      }),
    };

    const response = await fetch("/loneReview", requestOptions);
    const data = await response.text();

    toast.success(data, { autoClose: true });

    setTimeout(function () {
      if (data === "Review edited!") {
        navigate("/reviews");
      }
    }, 3000);
  }

  return (
    <>
      <div className="bg-em_white">
        <div className="md:grid md:grid-cols-3 md:gap-6 h-screen p-5">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Edit Review
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                You can change what you think about <i id="infoRest"></i>
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="restauranteIn"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Restaurant
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <p
                        type="text"
                        name="restauranteIn"
                        id="restauranteIn"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 bg-gray-300"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="ubicacionIn"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Location
                      </label>
                      <p
                        type="text"
                        name="ubicacionIn"
                        id="ubicacionIn"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300"
                        readOnly
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-2">
                      <label
                        htmlFor="ratingIn"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Rating
                      </label>
                      <select
                        name="ratingIn"
                        id="ratingIn"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-em_orange focus:border-em_orange block w-full shadow-sm sm:text-md border-em_orange rounded-md"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="reviewIn"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Review
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="reviewIn"
                      name="reviewIn"
                      rows={10}
                      className="shadow-sm focus:ring-em_orange focus:border-em_orange mt-1 block w-full sm:text-sm border border-em_orange rounded-md"
                      defaultValue={""}
                      maxLength={1000}
                      onChange={charCounter}
                    />
                  </div>
                  <div className="mt-1 text-sm text-gray-600 absolute right-11">
                    <span id="charLeft">1000</span> / 1000
                  </div>
                  <p className="mt-5 text-sm text-gray-500">Changed opinion?</p>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  onClick={discard}
                  type="button"
                  className="left-0 mr-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-em_brown hover:bg-em_brown_hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-em_brown_hover"
                >
                  Discard
                </button>
                <button
                  onClick={editReview}
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-em_orange hover:bg-em_orange_hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-em_orange_hover"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
