import React, { Component } from 'react';
import TodoListItem from './TodoListItem';

class TodoList extends Component {
  render() {
    const { todos, navState, changeCheck, removeTodo } = this.props;
    return (
      <ul className="todos">
        {todos.filter(todo => {
          if (navState === 'Active') { return !todo.completed; }
          if (navState === 'Completed') { return todo.completed; }
          return true;
        }).map((todo, i) => {
          return (
            <TodoListItem key={i} todo={todo} changeCheck={changeCheck} removeTodo={removeTodo} />
          );
        })}
      </ul>
    );
  }
}

export default TodoList;