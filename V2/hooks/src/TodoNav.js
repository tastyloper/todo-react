import React, { memo } from 'react';
import TodoNavItem from './TodoNavItem';
import './TodoNav.css';

const TodoNav = memo(({ navState, changeNav }) => {
  const navItems = ['All', 'Active', 'Completed'];
  return (
    <ul className="nav">
      {navItems.map(item => (
        <TodoNavItem key={item} item={item} navState={navState} changeNav={changeNav} />
      ))}
    </ul>
  );
});

export default TodoNav;