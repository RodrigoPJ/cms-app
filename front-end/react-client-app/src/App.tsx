import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl text-center font-bold underline">
        Content Manager
      </h1>
      <div className="text-center">
        <button
          className="btn btn-secondary"
          onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
