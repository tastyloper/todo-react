import React, { useState, useCallback } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoNav from './TodoNav';
import TodoFooter from './TodoFooter';

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ]);
  const [value, setValue] = useState('');
  const [navState, setNavState] = useState('All');

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
        <div className="ver">Hooks 2.0</div>
        <TodoForm value={value} valueChange={valueChange} addTodo={addTodo} />
        <TodoNav navState={navState} changeNav={changeNav} />
        <TodoList todos={todos} navState={navState} changeCheck={changeCheck} removeTodo={removeTodo} />
        <TodoFooter toggleCompletedAll={toggleCompletedAll} clearAllDel={clearAllDel} todos={todos} />
      </div>
    </>
  );
};

export default App;