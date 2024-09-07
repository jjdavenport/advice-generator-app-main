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
      <main>
        <h1 className="flex gap-1">
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
        <p>
          {waiting
            ? "Waiting for Data"
            : loading
              ? "Loading..."
              : error
                ? "Error"
                : data.advice}
        </p>
        <img src={desktop ? json.desktop : json.mobile} alt="divider" />
        <button onClick={fetchData}>
          <img src={json.buttonIcon} />
        </button>
      </main>
    </>
  );
};

export default Card;
