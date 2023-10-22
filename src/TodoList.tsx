import React, { useState, ChangeEvent, useEffect } from "react";

interface item {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  // Load saved todos from local storage or initialize with default values
  const storedTodos = localStorage.getItem("todos");
  const initialTodos: item[] = storedTodos
    ? JSON.parse(storedTodos)
    : [
        { id: 1, text: "Learn Typescript", completed: false },
        { id: 2, text: "use vite", completed: false },
      ];

  const [todos, setTodos] = useState<item[]>(initialTodos);
  const [addToDo, setAddToDo] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  // Save todos to local storage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Function to toggle the completion status of a todo
  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  // Function to add a new todo item
  const handleSubmit = () => {
    if (addToDo.trim().length === 0) {
      setIsValid(false);
      return;
    }

    const newTodo: item = { id: Date.now(), text: addToDo, completed: false };
    setTodos([...todos, newTodo]);
    // Clear the input field
    setAddToDo("");
  };

  // Function to handle input changes and validation
  const inputToDo = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setAddToDo(e.target.value);
    
  };

  // Function to clear all todos
  const handleReset = () => {
    setTodos([]);
  };
  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="todo__container">
        <div className="reset" onClick={handleReset}></div>
        <ul>
          {todos.map((todo) => (
            <li
              className=""
              key={todo.id}
              onClick={() => handleToggle(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </li>
          ))}
        </ul>
        <div className="input__container">
          <input
            className={`${isValid ? "valid" : "invalid"}`}
            type="text"
            placeholder="Add new todo "
            onChange={inputToDo}
            value={addToDo}
          />
          <button className="add__button" onClick={handleSubmit}>
            add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
