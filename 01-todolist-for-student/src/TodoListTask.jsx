import React from 'react';

class TodoListTask extends React.Component {
  render() {
    return (
      <div className="todoList-tasks">
          <div className="todoList-task">
              <input type="checkbox" checked={true}/>
              <span>CSS</span>
          </div>
          <div className="todoList-task">
              <input type="checkbox" checked={false}/>
              <span>JS</span>
          </div>
          <div className="todoList-task">
              <input type="checkbox" checked={false}/>
              <span>ReactJS</span>
          </div>
          <div className="todoList-task">
              <input type="checkbox" checked={true}/>
              <span>Patterns</span>
          </div>
      </div>                    
    );
  }
}

export default TodoListTask;