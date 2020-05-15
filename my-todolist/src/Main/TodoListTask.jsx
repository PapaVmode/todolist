import React from 'react';

class TodoListTask extends React.Component {

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked);
    }

    onTitleChanged = (e) => {
        // if(e.key === 'Enter'){
        this.props.changeTitle(this.props.task.id, e.currentTarget.value);
        // }
    }

    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState({ editMode: true });
    }

    deactivateEditMode = () => {
        this.setState({ editMode: false });
    }
    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    }
    render = () => {
        let containerCssClass = this.props.task.isDone ? "todoList-task done" : "todoList-task";
        return (
            <div className={containerCssClass}>
                <input type="checkbox" checked={this.props.task.isDone}
                    onChange={this.onIsDoneChanged} />
                {this.state.editMode
                    ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true} value={this.props.task.title} />
                    : <span onClick={this.activateEditMode}>{this.props.task.id} - {this.props.task.title}</span>
                }, priority: {this.props.task.priority} <button onClick={this.onDeleteTask}>X</button>
            </div>
        );
    }
}

export default TodoListTask;

