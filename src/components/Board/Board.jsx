import React, { useState } from "react";
import "./Board.css";
import DeleteIcon from "../../assets/delete-icon.png";
import MessageBox from "../MessageBox/MessageBox";
const filePath = "localhost/todoData.json";

const Board = ({ mySky, todos, setTodoCount, fetching, LoggedIn }) => {
  const [loading, setLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState();

  const handleDelete = async (index) => {
    const confirm = window.confirm("are you sure you want to delete this todo");
    if (!confirm) return;
    const filteredTotdos = todos.filter(
      (todo, todoIndex) => index !== todoIndex
    );
    const jsonData = {
      data: filteredTotdos,
    };

    try {
      setLoading(true);
      setLoadingIndex(index);
      await mySky.setJSON(filePath, jsonData);
      setTodoCount(filteredTotdos.length);
    } catch (error) {
      setLoading(false);
      console.error(error.message);
    }
    setLoading(false);
  };
  return  !LoggedIn ? (
    <div className="todoBoard">
    <MessageBox variant="danger">Please Login to Access todos</MessageBox>
    </div>
  ) : fetching ? (
    <div className="todoBoard">
    <MessageBox>Loading todos ....</MessageBox>
    </div>
  ) : !todos.length ? (
    <div className="todoBoard">
    <MessageBox>Your Todo List is Empty</MessageBox>
  </div>
  ): (
    <div className="todoBoard">
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <div className="deleteIcon" onClick={() => handleDelete(index)}>
              <img src={DeleteIcon} alt="" />
              {loading && loadingIndex === index ? "Deleting ..." : ""}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
