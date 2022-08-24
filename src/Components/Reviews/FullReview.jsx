import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "./reviews.css";

export const FullReview = (props) => {
  let navigate = useNavigate();
  
  const [idReview, setIdReview] = useState();
  const [owner, setOwner] = useState();
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    getReview();
    if (props.user) {
      if (props.user[0][2] === owner) {
        setEditable(true);
      }
    }
  }, [owner]);

  
  async function deleteReview() {
    var id = idReview;
    var fileName = document.getElementById("image").src.split("/").pop();
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        fileName: fileName,
      }),
    };
    

    const response = await fetch("/loneReview", requestOptions);
    const data = await response.text();
    toast.success(data, { autoClose: true });
    setTimeout(function () {
      navigate("/reviews");
    }, 3000);
  }

  async function getReview() {
    var given_URL = window.location.pathname.split("/");
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `/loneReview?id=${given_URL[2]}`,
      requestOptions
    );
    const data = await response.json();
    setIdReview(data[0][0]);
    document.getElementById("restaurante").innerHTML = data[0][1];
    document.getElementById("usuario").innerHTML = data[0][2];
    setOwner(data[0][2]);
    document.getElementById("rating").innerHTML = data[0][3] + " / 5" + " ⭐";
    document.getElementById("ubicacion").innerHTML = data[0][7];
    document.getElementById("created").innerHTML = data[0][5].slice(0, 10);
    document.getElementById("review").innerHTML = data[0][4];
    document.getElementById("image").src =
      import.meta.env.VITE_IMG_URL + data[0][8];
    if (data[0][6] !== null) {
      document.getElementById("edited").hidden = false;
    }
  }
  return (
    <div className="bg-em_white overflow-hidden h-full min-h-screen">
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 pb-4">
        <div className="hidden lg:block bg-em_white absolute top-0 bottom-0 left-3/4 w-screen" />
        <p id="idRev" hidden></p>
        <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
          <div>
            <h2
              className="text-lg text-em_brown font-semibold"
              id="usuario"
            ></h2>
            <h3
              className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight"
              id="restaurante"
            ></h3>

            <h3
              className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight"
              id="rating"
            ></h3>
          </div>
        </div>
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative lg:row-start-1 lg:col-start-2">
            <svg
              className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
              />
            </svg>
            <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
              <figure>
                <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                  <img
                    className="rounded-lg shadow-lg object-cover object-center"
                    id="image"
                    width={1184}
                    height={1376}
                  />
                </div>
              </figure>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="text-base max-w-prose mx-auto lg:max-w-none">
              <p className="text-lg text-gray-500" id="review"></p>
              <p className="text-lg text-gray-500 mt-5" id="ubicacion"></p>
              <p className="text-lg text-gray-500" id="created"></p>
              <p id="edited" hidden>
                (edited)
              </p>
            </div>
          </div>
        </div>
      </div>
      {editable ? (
        <div className="text-center my-3 flex justify-around" hidden>
          <button
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
            id="deleteButton"
            onClick={deleteReview}
          >
            Delete
          </button>
          <Link
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-yellow-600 hover:bg-em_yellow_hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-em_yellow"
            id="editButton"
            to={"/editReview/" + idReview}
          >
            Update
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
