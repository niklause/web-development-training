import { useState, useEffect } from "react";
import {
  registerUser,
  signInUser,
} from "./services/todo-user-manager.endpoints";

import {
  addTodo,
  fetchTodo,
  updateTask,
  deleteTask,
} from "./services/todo-todos-manager.endpoints";

import GreenCheck from "./assets/success-green-check-mark-icon.svg";
import DataTable from "react-data-table-component";

function App() {
  const [signupForm, showSignupForm] = useState(false);
  const [signupSuccess, isSignupSuccess] = useState("");

  const [signinSuccess, isSigninSuccess] = useState("");
  const [signinForm, showSigninForm] = useState(false);

  const [showDashboard, setShowDashboard] = useState(false);

  const [addTaskForm, showAddTaskForm] = useState(false);
  const [addTaskSuccess, isAddTaskSuccess] = useState("");

  const [showTodos, setShowTodos] = useState(false);
  const [todos, setTodos] = useState([]);

  const [updateSuccess, setUpdateSuccess] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

  const columns = [
    {
      name: "Sr.no.",
      selector: (row) => row._id,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Completed",
      width: "150px",
      cell: (row) =>
        row.completed ? (
          <p>Completed</p>
        ) : (
          <button
            type="button"
            onClick={() => {
              console.log(row.title);
              isAddTaskSuccess("");
              setUpdateSuccess("");
              setDeleteSuccess("");
              handleUpdateTodoCall(row.title, true);
            }}
          >
            Mark As Done
          </button>
        ),
    },
    {
      name: "Clear Tasks",
      width: "150px",
      cell: (row) => (
        <button
          type="button"
          onClick={() => {
            setUpdateSuccess("");
            handleDeleteTodoCall(row.title);
            setDeleteSuccess("");
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleDeleteTodoCall = async (title) => {
    setDeleteSuccess("");
    try {
      const regRes = await deleteTask(title);
      const { status } = regRes.data;
      if (status.toLowerCase() === "success") {
        setDeleteSuccess("success");
        handleFetchTodos();
      }
    } catch (error) {
      console.error("handleUpdateTodoCall is failed with ", error);
      setDeleteSuccess("error");
    }
  };

  const handleDeleteTodoStatus = () => {
    if (!deleteSuccess) {
      return <></>;
    }
    if (deleteSuccess === "success") {
      return <h3>Task has been deleted successfully</h3>;
    }

    if (deleteSuccess === "error") {
      return <h3>Task deletion Failed</h3>;
    }
    setDeleteSuccess("");
  };

  const handleUpdateTodoCall = async (title, completed) => {
    setUpdateSuccess("");
    try {
      const regRes = await updateTask(title, completed);
      const { status } = regRes.data;
      if (status.toLowerCase() === "success") {
        setUpdateSuccess("success");
      }
      handleFetchTodos();
    } catch (error) {
      console.error("handleUpdateTodoCall is failed with ", error);
      setUpdateSuccess("error");
    }
  };

  const handleUpdateTodoStatus = () => {
    if (!updateSuccess) {
      return <></>;
    }
    if (updateSuccess === "success") {
      return <h3>Task has been updated successfully</h3>;
    }

    if (updateSuccess === "error") {
      return <h3>Task updation Failed</h3>;
    }
    setUpdateSuccess("");
  };

  const renderIntroduction = () => {
    return (
      <>
        <h1>Welcome to Todo App</h1>
      </>
    );
  };

  const renderButtonSet = () => {
    return (
      <>
        <div
          style={{ display: "flex", flexDirection: "column", paddingLeft: 64 }}
        >
          <button
            onClick={() => {
              showSigninForm(false);
              showSignupForm(true);
            }}
          >
            Sign Up
          </button>

          <button
            style={{ marginTop: 64 }}
            onClick={() => {
              showSignupForm(false);
              showSigninForm(true);
            }}
          >
            Sign In
          </button>
        </div>
      </>
    );
  };

  const handleRegistrationCall = async () => {
    isSignupSuccess("");
    const username = document.getElementById("username-reg").value;
    const password = document.getElementById("password-reg").value;
    if (!username || !password) {
      isSignupSuccess("error");
    }
    try {
      const regRes = await registerUser(username, password);
      if (regRes) {
        const { status } = regRes.data;

        if (status.toLowerCase() === "success") {
          isSignupSuccess("success");
        }
      }
    } catch (error) {
      console.error("Registration failed with ", error);
      isSignupSuccess("error");
    }
  };

  const handleSignupStatus = () => {
    if (!signupSuccess) {
      return <></>;
    }
    if (signupSuccess === "success") {
      return <h3>You have been registered successfully</h3>;
    }

    if (signupSuccess === "error") {
      return <h3>Registration Failed</h3>;
    }
  };

  const handleLoginCall = async () => {
    isSignupSuccess("");
    const username = document.getElementById("username-login").value;
    const password = document.getElementById("password-login").value;
    if (!username || !password) {
      isSigninSuccess("error");
    }
    try {
      const regRes = await signInUser(username, password);
      if (regRes) {
        const { status, token } = regRes.data;

        if (status.toLowerCase() === "success") {
          isSigninSuccess("success");
          localStorage.setItem("token", token);
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
          handleFetchTodos();
          setShowDashboard(true);
        }
      }
    } catch (error) {
      console.error("SignIn failed with ", error);
      isSigninSuccess("error");
      setShowDashboard(false);
    }
  };

  const handleSigninStatus = () => {
    if (!signinSuccess) {
      return <></>;
    }
    if (signinSuccess === "success" && !addTaskForm) {
      return <h3>You have been logged in successfully</h3>;
    }

    if (signinSuccess === "error") {
      return <h3>Login Failed</h3>;
    }
  };

  const renderSignupForm = () => {
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>Register Yourself Here</h1>
          <span>
            Username:&nbsp;&nbsp;
            <input type="text" id="username-reg" placeholder="username"></input>
          </span>
          <br />
          <br />
          <span>
            Password:&nbsp;&nbsp;
            <input type="text" id="password-reg" placeholder="password"></input>
          </span>
          <br />
          <br />
          <button
            type="button"
            id="button-reg"
            onClick={handleRegistrationCall}
          >
            Sign up
          </button>
          <br />
          <br />
          {handleSignupStatus()}
        </div>
      </>
    );
  };

  const renderSignInForm = () => {
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>Log In Here</h1>
          <span>
            Username:&nbsp;&nbsp;
            <input
              type="text"
              id="username-login"
              placeholder="username"
            ></input>
          </span>
          <br />
          <br />
          <span>
            Password:&nbsp;&nbsp;
            <input
              type="text"
              id="password-login"
              placeholder="password"
            ></input>
          </span>
          <br />
          <br />
          <button type="button" id="button-login" onClick={handleLoginCall}>
            Sign In
          </button>
          {handleSigninStatus()}
        </div>
      </>
    );
  };

  const renderAddTodoForm = () => {
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>Add your task Here</h1>
          <span>
            Title:&nbsp;&nbsp;
            <input
              type="text"
              id="title-todo-add"
              placeholder="Task Title"
            ></input>
          </span>
          <br />
          <br />
          <span>
            Description:&nbsp;&nbsp;
            <input
              type="text"
              id="description-todo-desc"
              placeholder="Task Details"
            ></input>
          </span>
          <br />
          <br />
          <button
            type="button"
            id="button-add-todo"
            onClick={() => {
              handleAddTodoCall();
            }}
          >
            Add Task
          </button>
          {addTaskSuccess ? handleAddTodoStatus() : <></>}
        </div>
      </>
    );
  };

  const handleAddTodoCall = async () => {
    const title = document.getElementById("title-todo-add").value;
    const description = document.getElementById("description-todo-desc").value;
    if (!title || !description) {
      isAddTaskSuccess("error");
    }
    try {
      const data = {
        title,
        description,
        completed: false,
      };
      const regRes = await addTodo(data);
      if (regRes) {
        const { status } = regRes.data;

        if (status.toLowerCase() === "success") {
          isAddTaskSuccess("success");
          handleFetchTodos();
        }
      }
    } catch (error) {
      console.error("SignIn failed with ", error);
      isAddTaskSuccess("error");
    }
  };

  const handleAddTodoStatus = () => {
    console.log(addTaskSuccess, 393);
    if (!addTaskSuccess) {
      return <></>;
    }
    if (addTaskSuccess === "success") {
      return <h3>Task has been added successfully</h3>;
    }

    if (addTaskSuccess === "error") {
      return <h3>Task add failed</h3>;
    }
  };

  const renderDashboardLeft = () => {
    return (
      <>
        <h1>Logged In User,</h1>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "row" }}>
          <h3>{localStorage.getItem("username")}</h3>
          <img src={GreenCheck} height={24} width={24} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button
            onClick={() => {
              showSigninForm(false);
              showSignupForm(false);
              showAddTaskForm(true);
              setShowTodos(false);
              isAddTaskSuccess("");
            }}
          >
            Add a Task
          </button>
          <br />
          <button
            onClick={() => {
              showAddTaskForm(false);
              showSigninForm(false);
              showSignupForm(false);
              setShowTodos(true);
              setDeleteSuccess("");
              setUpdateSuccess("");
              handleFetchTodos();
            }}
          >
            Show tasks
          </button>
          <br />
          <button type="button" onClick={handleSignoutCall}>
            Sign Out
          </button>
        </div>
      </>
    );
  };

  const renderDashboardRight = () => {
    return <h1>You have been Successfully Logged In!</h1>;
  };

  const handleSignoutCall = () => {
    localStorage.clear();
    showSignupForm(false);
    isSignupSuccess("");
    isSigninSuccess("");
    showSigninForm(false);
    setShowDashboard(false);
    showAddTaskForm(false);
    setShowTodos(false);
    setUpdateSuccess("");
    setTodos([]);
  };

  const handleFetchTodos = async () => {
    try {
      const regRes = await fetchTodo();
      const { status, todos } = regRes.data;
      if (status.toLowerCase() === "success") {
        setTodos(todos);
      }
    } catch (error) {
      console.error("handleFetchTodos failed with ", error);
    }
  };

  const renderTodos = () => {
    return (
      <>
        <DataTable columns={columns} data={todos} />
        {updateSuccess ? handleUpdateTodoStatus() : <></>}
        {deleteSuccess ? handleDeleteTodoStatus() : <></>}
      </>
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          position: "fixed",
          width: "80%",
          height: "100%",
        }}
      >
        <div>{showDashboard ? renderDashboardLeft() : renderButtonSet()}</div>
        {showDashboard && !addTaskForm && !showTodos ? (
          renderDashboardRight()
        ) : (
          <div>
            {renderIntroduction()}
            {signupForm ? renderSignupForm() : <></>}
            {signinForm ? renderSignInForm() : <></>}
            {addTaskForm ? renderAddTodoForm() : <></>}
            {showTodos ? renderTodos() : <></>}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
