import React from 'react';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {
        let tasksElements = this.props.tasks.map(task => <TodoListTask task={task}
            changeStatus={this.props.changeStatus}
            changeTitle={this.props.changeTitle}
            deleteTask={this.props.deleteTask}
        />);

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

