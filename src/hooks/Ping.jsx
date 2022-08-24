import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

const Ping = (props) => {
  const [pingIndex, setPingIndex] = useState(0);

  useEffect(() => {
    setPingIndex(0);
  }, []);

  const pingStringArr = {
    0: {
      0: "Click Me!",
      1: "Ping API",
      2: "Ping!",
      3: "I'm Tired",
      4: "I want Empanadas!",
      5: "Wanna hear a joke?",
      6: "I'm hungry!",
      7: "I'm thirsty!",
      8: "I'm bored!",
      9: "Touch me!",
    },
    1: {
      0: "Clicked!",
      1: "API Pinged!",
      2: "Pong!",
      3: "Take a break!",
      4: "Have one!",
      5: "I don't know jokes :c",
      6: "Eat a Empanada!",
      7: "Drink a Empanada!",
      8: "Play with Empanadas!",
      9: "Kinky!",
    },
  };

  async function ping() {
    let start = new Date().getTime();
    const response = await fetch("/ping");
    const data = await response.text();
    let diff = new Date().getTime() - start;
    setPingIndicator(diff);
  }

  const setPingIndicator = (time) => {
    const index=Math.floor(Math.random() * 10);
    toast.success(pingStringArr[1][pingIndex]+" "+time+" ms", { autoClose: 1000 });
    setTimeout(() => {
      setPingIndex(index);
      document.getElementsByClassName("pingButton")[0].innerHTML =
        pingStringArr[0][pingIndex];
    }, 2000);
  };


  return (
    <>
      <button
        type="button"
        className="pingButton inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-em_brown hover:bg-em_brown_hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-em_brown_hover mt-5"
        onClick={ping}
      >
        {pingStringArr[0][pingIndex]}
      </button>
    </>
  );
};

export default Ping;
