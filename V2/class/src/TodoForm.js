import React, { Component } from 'react';
import './TodoForm.css';

class TodoForm extends Component {
  render() {
    const { value, valueChange, addTodo } = this.props;
    return (
      <>
        <input className="input-todo" placeholder="What needs to be done?" autoFocus
              value={value} onChange={valueChange} onKeyUp={addTodo} />
      </>
    );
  }
}

export default TodoForm;