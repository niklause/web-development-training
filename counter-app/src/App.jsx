import "./App.css";
import React from "react";
import CustomButton from "./components/CustomButton";
import Todo from "./components/Todo";

function App() {
  const [count, setCount] = React.useState(0);
  const todosData = [
    {
      title: "Gym",
      description: "go to gym from 7 to 8",
      completed: false,
    },
    {
      title: "Study",
      description: "Study from 7 to 8",
      completed: false,
    },
    {
      title: "Meditate",
      description: "Meditate from 7 to 8",
      completed: false,
    },
  ];
  const [todos, setTodos] = React.useState([
    ...todosData,
    {
      title: "test",
      description: "td",
      completed: false,
    },
  ]);

  const renderTodos = () => {
    return todos.map((todo) => {
      return <Todo title={todo.title} description={todo.description} />;
    });
  };

  // const renderTodos = () => {
  //   return todos.map((todo) => {
  //     return (
  //       <div>
  //         <h1>{todo.title}</h1>
  //         <h2>{todo.description}</h2>
  //       </div>
  //     );
  //   });
  // };

  const getCounter = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div>
        <CustomButton count={count} onClick={getCounter} />
        {renderTodos()}
      </div>
    </>
  );
}

export default App;
