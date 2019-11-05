import React, { memo } from 'react';
import './TodoFooter.css';

const TodoFooter = memo(({ toggleCompletedAll, clearAllDel, todos }) => {
  return (
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
  );
});

export default TodoFooter;