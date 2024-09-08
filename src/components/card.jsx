import { useState, useEffect } from "react";
import json from "./assets/data.json";
import { useMediaQuery } from "react-responsive";

const Card = () => {
  const desktop = useMediaQuery({ minWidth: 768 });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [wait, setWait] = useState(0);
  const [waiting, setWaiting] = useState(false);

  const fetchData = async () => {
    const waitTime = (ms) => new Promise((i) => setTimeout(i, ms));
    const time = new Date().getTime();
    const fetchTime = time - wait;
    if (fetchTime < 2000) {
      setWaiting(true);
      await waitTime(2000 - fetchTime);
      setWaiting(false);
    }
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const result = await response.json();
      setData(result.slip);
      setWait(new Date().getTime());
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main className="flex h-fit w-full flex-col items-center gap-10 rounded-3xl bg-darkGrayishBlue px-10 py-12 text-center font-extrabold md:w-fit">
        <div className="flex flex-col items-center gap-4 md:w-[480px]">
          <h1 className="text-sm tracking-customTracking flex gap-1 uppercase text-neonGreen">
            {waiting ? (
              "Waiting for Data"
            ) : loading ? (
              "Loading..."
            ) : error ? (
              "Error"
            ) : (
              <>
                {json.h1} <span>{data.id}</span>
              </>
            )}
          </h1>
          <q className="text-customSize text-lightCyan">
            {waiting
              ? "Waiting for Data"
              : loading
                ? "Loading..."
                : error
                  ? "Error"
                  : data.advice}
          </q>
        </div>
        <img src={desktop ? json.desktop : json.mobile} alt="divider" />
        <button
          onClick={fetchData}
          className="hover:shadow-customShadow -mb-customMargin w-fit rounded-full bg-neonGreen p-4 transition duration-1000 ease-in-out hover:shadow-neonGreen"
        >
          <img src={json.buttonIcon} />
        </button>
      </main>
    </>
  );
};

export default Card;
