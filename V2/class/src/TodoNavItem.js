import React, { Component } from 'react';
import cn from 'classnames';
import './TodoNavItem.css';

class TodoNavItem extends Component {
  render() {
    const { item, navState, changeNav } = this.props;
    return (
      <>
        <li id={item} key={item} className={cn({ active: navState === item })} onClick={() => (changeNav(item))}>{item}</li>
      </>
    );
  }
}

export default TodoNavItem;