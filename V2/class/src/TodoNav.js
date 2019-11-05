import React, { Component } from 'react';
import TodoNavItem from './TodoNavItem';
import './TodoNav.css';

class TodoNav extends Component {
  render() {
    const { navState, changeNav } = this.props;
    const navItems = ['All', 'Active', 'Completed'];
    return (
      <ul className="nav">
        {navItems.map(item => (
          <TodoNavItem key={item} item={item} navState={navState} changeNav={changeNav} />
        ))}
      </ul>
    );
  }
}

export default TodoNav;