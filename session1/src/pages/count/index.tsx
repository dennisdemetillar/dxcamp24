import { useEffect, useState } from "react";

const Count = () => {
  const [count, setCount] = useState(2);
  const [isClicked, setIsClicked] = useState(false);
  const [show, setShow] = useState(false);

  const increment = () => {
    setCount(count + 1);
    console.log("COUNT", count);
    console.log("IS CLICKED", isClicked);
  };

  const multiply = () => {
    setCount(count * 2);
    console.log("COUNT MULTIPLIED", count);
    console.log("IS CLICKED", isClicked);
  };

  useEffect(() => {
    if (isClicked) {
      multiply();
    }
  }, [isClicked]);

  return (
    <div>
      <div>This is count {count}</div>
      <button
        className="border bg-yellow-300 p-2 rounded-full"
        onClick={() => {
          increment();
          setIsClicked(true);
        }}
      >
        Click
      </button>
      <button
        className="border bg-red-300 p-2 rounded-full"
        onClick={() => {
          increment();
          setIsClicked(false);
        }}
      >
        False
      </button>
      <button
        onClick={() => setShow(!show)}
        className="border bg-red-300 p-2 rounded-full"
      >
        show switch
      </button>
      <div className="text-2xl font-bold">{show ? count : ""}</div>
    </div>
  );
};

export default Count;
