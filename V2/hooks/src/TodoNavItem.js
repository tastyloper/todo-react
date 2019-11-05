import React, { memo } from 'react';
import cn from 'classnames';
import './TodoNavItem.css';

const TodoNavItem = memo(({ item, navState, changeNav }) => {
  return (
    <>
      <li id={item} key={item} className={cn({ active: navState === item })} onClick={() => (changeNav(item))}>{item}</li>
    </>
  );
});

export default TodoNavItem;