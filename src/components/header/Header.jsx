import React, { useState } from "react";
import Formfield from "../Formfields/Formfield";
import Loading from "../Loading/Loading"
import "./Header.css";
const filePath = "localhost/todoData.json";

const Header = ({ mySky, LoggedIn, setLoggedIn, todos, setTodoCount }) => {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(false);

  const hanleFormSubmit = async (e) => {
    e.preventDefault();
    if (todo) {
      const item = [todo, ...todos];
      const jsonData = {
        data: item,
      };

      try {
        setLoading(true);
        await mySky.setJSON(filePath, jsonData);
        setTodoCount(item.length)
      } catch (error) {
        setLoading(false);
        console.error(error.message);
      }
    }
    setTodo("");
    setLoading(false);
  };

  const handleInput = (e) => {
    setTodo(e.target.value);
  };

  const handleLogin = async () => {
    const status = await mySky.requestLoginAccess();
    setLoggedIn(status);
    if (status) {
      localStorage.setItem("userID", await mySky.userID());
    }
  };

  const handleLogout = async () => {
    await mySky.logout();
    setLoggedIn(false);
    localStorage.removeItem("userID");
  };

  return (
    <div className="todo_header">
      <form onSubmit={hanleFormSubmit}>
        <h1>Simple Todo list Skapp</h1>
        {LoggedIn ? (
          <Formfield
            type="button"
            bg="green"
            text="Logout"
            width="200"
            action={handleLogout}
          />
        ) : (
          <Formfield
            type="button"
            bg="green"
            text="Login / Sign up "
            width="200"
            action={handleLogin}
          />
        )}
        <div className="todo_screen">
          {loading ? (
            <Loading />
          ) : (
            <>
              <Formfield
                type="text"
                width="300"
                placeholder={
                  LoggedIn ? "Enter todo" : "Please Login to Add a new Item"
                }
                text={todo}
                action={handleInput}
                disabled={!LoggedIn}
              />
              <Formfield
                type="submit"
                width="100"
                text="Add Todo"
                bg="green"
                disabled={!LoggedIn}
              />
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Header;
