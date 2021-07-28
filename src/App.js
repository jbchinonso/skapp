import { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Board from "./components/Board/Board";
import { SkynetClient } from "skynet-js";
import "./App.css";

const portal =
  window.location.hostname === "localhost" ? "https://siasky.net" : undefined;
const dataDomain = "localhost/todoData.json";
// Initiate the SkynetClient
const client = new SkynetClient(portal);

function App() {
  const [mySky, setMySky] = useState();
  const [LoggedIn, setLoggedIn] = useState(null);
  const [todos, setTodos] = useState([]);
  const [todoCount, setTodoCount] = useState(todos.length);
  const [fetching, setFetching] = useState(false)

  useEffect(
    () =>
      (async function init() {
        try {
          const Sky = await client.loadMySky(dataDomain);
          const loggedIn = await Sky.checkLogin();
          setMySky(Sky);
          if (loggedIn) {
            setLoggedIn(loggedIn);
            localStorage.setItem("userID", await Sky.userID());
          }

          setFetching(true)
          const { data } = await Sky.getJSON(dataDomain);
          setTodos(data.data);
        } catch (error) {
          setFetching(false)
          console.error(error);
        }
        setFetching(false)
      })(),
    [todoCount]
  );

  const HeaderProps = {
    mySky,
    LoggedIn,
    setLoggedIn,
    todos,
    setTodoCount,
  };

  const BoardProps = {
    mySky,
    todos,
    setTodoCount,
    fetching,
    LoggedIn
  };

  return (
    <div className="App">
      <Header {...HeaderProps} />
      <Board {...BoardProps} />
    </div>
  );
}

export default App;
