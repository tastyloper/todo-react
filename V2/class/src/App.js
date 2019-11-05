import React, { Component } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoNav from './TodoNav';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';

class App extends Component {
  state = {
    todos: [
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }
    ],
    value: '',
    navState: 'All'
  };

  valueChange = (e) => {
    this.setState({ value: e.target.value });
  }

  generateId = () => {
    return this.state.todos.length ? Math.max(...this.state.todos.map(todo => todo.id)) + 1 : 1;
  }

  addTodo = (e) => {
    const { value } = this.state;
    const content = value.trim();
    if (content === '' || e.keyCode !== 13) return;

    this.setState(prevState => {
      return {
        todos: [...prevState.todos, { id: this.generateId(), content, completed: false }],
        value: '',
      };
    });
  }

  removeTodo = (itemId) => {
    this.setState(prevState => {
      return {
        todos: prevState.todos.filter(todo => todo.id !== itemId),
      };
    });
  }

  changeCheck = (itemId) => {
    this.setState(prevState => {
      return {
        todos: prevState.todos.map(todo => (todo.id === itemId ? { ...todo, completed: !todo.completed } : todo)),
      };
    });
  }

  toggleCompletedAll = (e) => {
    const completed = e.target.checked;
    this.setState(prevState => {
      return {
        todos: prevState.todos.map(todo => ({ ...todo, completed })),
      };
    });
  }

  clearAllDel = () => {
    this.setState(prevState => {
      return {
        todos: prevState.todos.filter(todo => !todo.completed),
      };
    });
  }

  changeNav = (navState) => {
    this.setState({ navState });
  }

  render() {
    const { todos, value, navState } = this.state;
    console.log("render");
    return (
      <>
        <div className="container">
          <h1 className="title">Todos</h1>
          <div className="ver">Class 2.0</div>
          <TodoForm value={value} valueChange={this.valueChange} addTodo={this.addTodo} />
          <TodoNav navState={navState} changeNav={this.changeNav} />
          <TodoList todos={todos} navState={navState} changeCheck={this.changeCheck} removeTodo={this.removeTodo} />
          <TodoFooter toggleCompletedAll={this.toggleCompletedAll} clearAllDel={this.clearAllDel} todos={todos} />
        </div>
      </>
    );
  }
}

export default App;
