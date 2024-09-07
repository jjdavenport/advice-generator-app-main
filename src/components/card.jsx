import { useState, useEffect } from "react";
import json from "./assets/data.json";
import { useMediaQuery } from "react-responsive";

const Card = () => {
  const desktop = useMediaQuery({ minWidth: 768 });
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.adviceslip.com/advice");
        const result = await response.json();
        setData(result.slip);
        console.log("fetch", data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <main>
        <h1 className="flex gap-1">
          {json.h1}
          <span>{data.id}</span>
        </h1>
        <p>{data.advice}</p>
        <img src={desktop ? json.desktop : json.mobile} alt="divider" />
        <button>
          <img src={json.buttonIcon} />
        </button>
      </main>
    </>
  );
};

export default Card;
