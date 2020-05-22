import React from 'react';

class TodoListTitle extends React.Component {

    state = {
        title: this.props.title,
        editMode: false,
    };

    activateEditMode = () => {
        this.setState({ editMode: true });
    }
    deactivateEditMode = () => {
        this.setState({ editMode: false });
        this.props.changeTodolistTitle(this.state.title);
    }

    onTitleChanged = (e) => {
        this.setState({ title: e.currentTarget.value })
    }

    render = () => {
        return (
            <>
                {this.state.editMode
                    ? <input type="text" onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} value={this.state.title} autoFocus />
                    : <h3 className="todoList-header__title" onClick={this.activateEditMode}> {this.state.title}</h3>}
                <button onClick={this.props.onDelete}>X</button>
            </>
        );
    }
}

export default TodoListTitle;



