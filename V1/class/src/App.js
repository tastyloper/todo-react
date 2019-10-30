import React, { Component } from 'react';
import cn from 'classnames';
import './App.css';

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

  shouldComponentUpdate(nextProps, nextState) {
    const valueStateChange = this.state.value !== nextState.value;    
    return valueStateChange;
  }

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
    const navItems = ['All', 'Active', 'Completed'];
    console.log("render");
    return (
      <>
        <div className="container">
          <h1 className="title">Todos</h1>
          <div className="ver">Class 1.0</div>

          <input className="input-todo" placeholder="What needs to be done?" autoFocus value={value} onChange={this.valueChange} onKeyUp={this.addTodo} />
          <ul className="nav">
            {navItems.map(item => (
              <li id={item} key={item} className={cn({ active: navState === item })} onClick={() => (this.changeNav(item))}>{item}</li>
            ))}
          </ul>

          <ul className="todos">
            {todos.filter(todo => {
              if (navState === 'Active') { return !todo.completed; }
              if (navState === 'Completed') { return todo.completed; }
              return true;
            }).map(todo => {
              return (
                <li key={todo.id} id={todo.id} className="todo-item">
                  <input className="custom-checkbox" type="checkbox" id={`ck-${todo.id}`} checked={todo.completed} onChange={() => {this.changeCheck(todo.id)}} />
                  <label htmlFor={`ck-${todo.id}`}>{todo.content}</label>
                  <i className="remove-todo far fa-times-circle" onClick={() => {this.removeTodo(todo.id)}}></i>
                </li>
              );
            })}
          </ul>
          <div className="footer">
            <div className="complete-all">
              <input className="custom-checkbox" type="checkbox" id="ck-complete-all" onChange={this.toggleCompletedAll} />
              <label htmlFor="ck-complete-all">Mark all as complete</label>
            </div>
            <div className="clear-completed">
              <button className="btn" onClick={this.clearAllDel}>Clear completed 
                (<span className="completed-todos">{todos.filter(v => v.completed).length}</span>)
              </button>
              <strong className="active-todos">{todos.filter(v => !v.completed).length}</strong> items left
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
