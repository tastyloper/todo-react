import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ]);
  const [value, setValue] = useState('');
  const [navState, setNavState] = useState('All');
  const navItems = ['All', 'Active', 'Completed'];

  const valueChange = useCallback((e) => {
    console.log('valueChange');
    setValue(e.target.value)
  }, []);

  const generateId = useCallback(() => {
    console.log('generateId');
    return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }, [todos]);

  const addTodo = useCallback((e) => {
    console.log('addTodo');
    const content = value.trim();
    if (content === '' || e.keyCode !== 13) return;

    setTodos(prevTodos => [...prevTodos, { id: generateId(), content, completed: false }]);
    setValue('');
  }, [generateId, value]);

  const removeTodo = useCallback((itemId) => {
    console.log('removeTodo');
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== itemId));
  }, []);

  const changeCheck = useCallback((itemId) => {
    console.log('changeCheck');
    setTodos(prevTodos => prevTodos.map(todo => (todo.id === itemId ? { ...todo, completed: !todo.completed } : todo)));
  }, []);

  const toggleCompletedAll = useCallback((e) => {
    console.log('toggleCompletedAll');
    const completed = e.target.checked;
    setTodos(prevTodos => prevTodos.map(todo => ({ ...todo, completed })));
  }, []);

  const clearAllDel = useCallback(() => {
    console.log('clearAllDel');
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }, []);

  const changeNav = useCallback((navState) => {
    console.log('changeNav');
    setNavState(navState);
  }, []);

  console.log('render');
  
  return (
    <>
      <div className="container">
        <h1 className="title">Todos</h1>
        <div className="ver">Hooks 1.0</div>

        <input className="input-todo" placeholder="What needs to be done?" autoFocus value={value} onChange={valueChange} onKeyUp={addTodo} />
        <ul className="nav">
          {navItems.map(item => (
            <li id={item} key={item} className={cn({ active: navState === item })} onClick={() => (changeNav(item))}>{item}</li>
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
                <input className="custom-checkbox" type="checkbox" id={`ck-${todo.id}`} checked={todo.completed} onChange={() => {changeCheck(todo.id)}} />
                <label htmlFor={`ck-${todo.id}`}>{todo.content}</label>
                <i className="remove-todo far fa-times-circle" onClick={() => {removeTodo(todo.id)}}></i>
              </li>
            );
          })}
        </ul>
        <div className="footer">
          <div className="complete-all">
            <input className="custom-checkbox" type="checkbox" id="ck-complete-all" onChange={toggleCompletedAll} />
            <label htmlFor="ck-complete-all">Mark all as complete</label>
          </div>
          <div className="clear-completed">
            <button className="btn" onClick={clearAllDel}>Clear completed 
              (<span className="completed-todos">{todos.filter(v => v.completed).length}</span>)
            </button>
            <strong className="active-todos">{todos.filter(v => !v.completed).length}</strong> items left
          </div>
        </div>
      </div>
    </>
  );
};

export default App;