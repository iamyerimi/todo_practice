import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { TiPencil, TiTrash } from "react-icons/ti";
import "./TodoInsert.css";

const TodoInsert = ({
  onInsertToggle,
  onInsertTodo,
  selectedTodo,
  onRemove,
  onUpdate,
}) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onInsertTodo(value);
    setValue("");
    onInsertToggle();
    console.log(value);
  };

  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.text);
    }
  }, [selectedTodo]);

  return (
    <div className="wrap">
      <div className="background" onClick={onInsertToggle}></div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="please type..."
          value={value}
          onChange={onChange}
        />
        {selectedTodo ? (
          <div className="rewrite">
            <TiPencil
              onClick={() => {
                onUpdate(selectedTodo.id, value);
              }}
            />
            <TiTrash
              onClick={() => {
                onRemove(selectedTodo.id);
              }}
            />
          </div>
        ) : (
          <button type="submit">
            <MdAddCircle />
          </button>
        )}
      </form>
    </div>
  );
};

export default TodoInsert;
