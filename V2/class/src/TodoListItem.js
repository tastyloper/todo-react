import React, { Component } from 'react';
import './TodoListItem.css';

class TodoListItem extends Component {
  render() {
    const { todo, changeCheck, removeTodo } = this.props;
    return (
      <li key={todo.id} id={todo.id} className="todo-item">
        <input className="custom-checkbox" type="checkbox" id={`ck-${todo.id}`} checked={todo.completed} onChange={() => {changeCheck(todo.id)}} />
        <label htmlFor={`ck-${todo.id}`}>{todo.content}</label>
        <i className="remove-todo far fa-times-circle" onClick={() => {removeTodo(todo.id)}}></i>
      </li>
    );
  }
}

export default TodoListItem;