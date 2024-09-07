import data from "./assets/data.json";
import { useMediaQuery } from "react-responsive";

const Card = () => {
  const desktop = useMediaQuery({ minWidth: 768 });
  return (
    <>
      <main>
        <h1>{data.h1}</h1>
        <img src={desktop ? data.desktop : data.mobile} />
      </main>
    </>
  );
};

export default Card;
