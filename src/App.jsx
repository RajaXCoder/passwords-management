import { useEffect, useState } from "react";

const App = () => {
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    console.log("useEffect triggered");
    const apiCall = async () => {
      const response = await fetch("http://localhost:3000/get-data");
      const data = await response.json();
      console.log("Fetched data:", data[0]);
      setUserDetail(data[0]);
    };
    apiCall();
  }, []);

  console.log("Render triggered");

  const addPassword = async () => {
    const passwordDetails = {
      siteName: "GitHub",
      password: "@RajaX9344676628",
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Add this header
      },
      body: JSON.stringify(passwordDetails),
    };

    const response = await fetch("http://localhost:3000/add-password", options);
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1 className="font-bold underline">
        Hi everyone {userDetail ? userDetail.siteName : "no-value"}
      </h1>

      <button
        onClick={addPassword}
        className="bg-blue-500 text-white px-8 py-1 rounded-full ml-4"
      >
        add password
      </button>
    </div>
  );
};

export default App;
