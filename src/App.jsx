import { /*useEffect,*/ useState } from "react";

const App = () => {
  const [siteName, setSiteName] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const addPassword = async (event) => {
    event.preventDefault();
    setResponseMsg("");
    if (siteName !== "" && password !== "") {
      try {
        const passwordDetails = {
          siteName: siteName.trim(),
          password: password.trim(),
        };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Add this header
          },
          body: JSON.stringify(passwordDetails),
        };

        const response = await fetch(
          "http://localhost:3000/add-password",
          options
        );
        const data = await response.json();
        setResponseMsg(data);

        setSiteName("");
        setPassword("");
      } catch (e) {
        setIsError(true);
        setResponseMsg(e);
      }
    }
  };

  return (
    <div className="h-screen flex flex-row justify-center items-center font-mono">
      <div className="leading-loose shadow-xl p-4 w-1/3 flex flex-col items-center">
        <h1 className="font-bold text-2xl">Password Management</h1>
        <form
          onSubmit={addPassword}
          className="w-full flex flex-col items-start leading-loose mt-4"
        >
          <label className="text-xs mt-3 text-gray-500" htmlFor="siteName">
            SITENAME
          </label>
          <input
            id="siteName"
            value={siteName}
            type="text"
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full border-2 rounded-md p-1 outline-none"
          />
          <label className="text-xs mt-3 text-gray-500" htmlFor="password">
            PASSWORD
          </label>
          <input
            value={password}
            className="w-full border-2 rounded-md px-2 outline-none"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="text"
          />
          <button
            className="w-full bg-blue-500 text-white px-8 py-1 rounded-full mt-4"
            type="submit"
          >
            add password
          </button>
          <p className={isError ? "text-red-700" : "text-green-500"}>
            *{responseMsg}
          </p>
        </form>
      </div>
    </div>
  );
};

export default App;
