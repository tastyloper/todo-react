import React, { memo } from 'react';

const TodoForm = memo(({ value, valueChange, addTodo }) => {
  return (
    <>
      <input className="input-todo" placeholder="What needs to be done?" autoFocus value={value} onChange={valueChange} onKeyUp={addTodo} />
    </>
  );
});

export default TodoForm;