import React, { useState } from "react";
import Template from "./components/Template";
import TodoList from "./components/TodoList";
import { MdAddCircle } from "react-icons/md";
import "./App.css";
import TodoInsert from "./components/TodoInsert";

let nextId = 4;

const App = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "todo1",
      checked: true,
    },
    {
      id: 2,
      text: "todo2",
      checked: false,
    },
    {
      id: 3,
      text: "todo3",
      checked: true,
    },
  ]);

  const onInsertToggle = () => {
    if (selectedTodo) {
      setSelectedTodo(null);
    }
    setInsertToggle((prev) => !prev);
  };

  const onInsertTodo = (text) => {
    if (text === "") {
      return alert("할 일을 입력하세요");
    } else {
      const todo = {
        id: nextId,
        text,
        checked: false,
      };
      setTodos((todos) => todos.concat(todo));
      nextId++;
    }
  };

  const onCheckToggle = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  };

  // 삭제
  const onRemove = (id) => {
    onInsertToggle();
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  // 수정
  const onUpdate = (id, text) => {
    onInsertToggle();
    // map이라 스프레드...써야하는디
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  return (
    <>
      <Template todoLength={todos.length}>
        <TodoList
          todos={todos}
          onCheckToggle={onCheckToggle}
          onInsertToggle={onInsertToggle}
          onChangeSelectedTodo={onChangeSelectedTodo}
        />
        <div className="add-todo-button" onClick={onInsertToggle}>
          <MdAddCircle />
        </div>
        {insertToggle && (
          <TodoInsert
            selectedTodo={selectedTodo}
            onInsertToggle={onInsertToggle}
            onInsertTodo={onInsertTodo}
            onRemove={onRemove}
            onUpdate={onUpdate}
          />
        )}
      </Template>
    </>
  );
};

export default App;
