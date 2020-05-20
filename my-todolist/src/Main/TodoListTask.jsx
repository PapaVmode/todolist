import React from 'react';

class TodoListTask extends React.Component {

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task.id, status);
    }

    onTitleChanged = (e) => {
        this.setState({
            title: e.currentTarget.value
        })
    }

    state = {
        editMode: false,
        title: this.props.task.title,
    }
    _priorityName = () => {
        switch (this.props.task.priority) {
            case 0:
                return 'Low';
            case 1:
                return 'Middle';
            case 2:
                return 'Hi';
            case 3:
                return 'Urgently';
            case 4:
                return 'Later';
        }
    }

    activateEditMode = () => {
        this.setState({ editMode: true });
    }

    deactivateEditMode = () => {
        this.props.changeTitle(this.props.task.id, this.state.title);
        this.setState({ editMode: false });
    }
    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    }
    render = () => {
        let containerCssClass = this.props.task.status ? "todoList-task done" : "todoList-task";
        {
        }
        return (
            <div className={containerCssClass}>
                <input type="checkbox" checked={this.props.task.status}
                    onChange={this.onIsDoneChanged} />
                {this.state.editMode
                    ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true} value={this.state.title} />
                    : <span onClick={this.activateEditMode}>{this.props.task.id} - {this.state.title}</span>
                }, priority: {this._priorityName()} <button onClick={this.onDeleteTask}>X</button>
            </div>
        );
    }
}

export default TodoListTask;

