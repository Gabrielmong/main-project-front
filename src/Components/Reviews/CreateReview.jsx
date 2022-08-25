import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const CreateReview = (props) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const onInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!document.getElementById("restauranteIn").value)
      return toast.error("You have to type in a restaurant", {
        autoClose: true,
      });
    if (!document.getElementById("ubicacionIn").value)
      return toast.error("You have to type in a location, stop trying us", {
        autoClose: true,
      });
    if (!document.getElementById("reviewIn").value)
      return toast.error("You have to type in a review, jesus, get it right", {
        autoClose: true,
      });
    if (!file)
      return toast.error("Please select a file, there's no escape", {
        autoClose: true,
      });
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("/uploadImg", formData)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    createReview();
  };

  useEffect(() => {
    if (!props.user) {
      navigate("/403");
    }
  }),
    [];

  async function createReview() {
    let restaurante = document
      .getElementById("restauranteIn")
      .value.replace(/'/g, "&#39");
    let usuario = props.user[0][2];
    let rating = parseInt(document.getElementById("ratingIn").value);
    let review = document
      .getElementById("reviewIn")
      .value.replace(/'/g, "&#39");
    let ubicacion = document.getElementById("ubicacionIn").value;
    var todayDate = new Date().toISOString().slice(0, 10);
    let fileName = file.name;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurante: restaurante,
        usuario: usuario,
        rating: rating,
        review: review,
        created: todayDate,
        ubicacion: ubicacion,
        fileName: fileName,
      }),
    };
    const response = await fetch("/crudReviews", requestOptions);
    const data = await response.text();
    toast.success(data, { autoClose: true });

    setTimeout(function () {
      if (data === "Review created!") {
        navigate("/reviews");
      }
    }, 3000);
  }

  const charCounter = () => {
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

  return (
    <>
      <div className="bg-em_white">
        <div className="md:grid md:grid-cols-3 md:gap-6 min-h-screen h-full p-5">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Create Review
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Create a new review for a restaurant.
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
                      <input
                        type="text"
                        name="restauranteIn"
                        id="restauranteIn"
                        className="focus:ring-em_orange focus:border-em_orange flex-1 block w-full rounded-md sm:text-sm border-em_orange"
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
                      <input
                        type="text"
                        name="ubicacionIn"
                        id="ubicacionIn"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-em_orange focus:border-em_orange block w-full shadow-sm sm:text-sm border-em_orange rounded-md"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
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
                        className="mt-1 focus:ring-em_orange focus:border-em_orange block w-full shadow-sm sm:text-sm border-em_orange rounded-md"
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
                  <p className="mt-5 text-sm text-gray-500">
                    Write a review for the restaurant.
                  </p>
                </div>

                <div>
                  <form>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Image
                    </label>
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-em_orange"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          <div className="flex text-sm text-gray-600">
                            {file ? file.name : "Click here to upload"}
                            <input
                              onChange={onInputChange}
                              type="file"
                              accept="image/*"
                              id="file-upload"
                              hidden
                            />
                          </div>
                        </div>
                      </div>
                    </label>
                  </form>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  onClick={onFormSubmit}
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-em_brown hover:bg-em_brown_hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-em_brown"
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
