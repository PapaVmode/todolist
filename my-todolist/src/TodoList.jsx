import React from 'react';
import './App.css';
import TodoListTasks from "./Main/TodoListTasks";
import TodoListFooter from "./Footer/TodoListFooter";
import TodoListTitle from "./Header/TodoListTitle";
import { connect } from "react-redux";
import AddNewItemForm from './Header/AddNewItemForm';
import { addTaskAC, updateTaskAC, deleteTaskAC, deleteTodolistAC, setTasksAC } from './store/reducer';
import api from './api';

class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        filterValue: "All",
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        api.restoreStateTasks(this.props.id).then(response => {
            let allTasks = response.data.items;
            this.props.setTasks(allTasks, this.props.id);
        })
    }

    addTask = (newText) => {
        api.createTodolist(newText, this.props.id).then(response => {
            this.props.addTask(response.data.data.item, response.data.data.item.todoListId);
        })
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }

    changeTask = (taskId, value, obj) => {
        let updateTaskModel = () => {
            switch (obj.type) {
                case 'UPDATE_TASK_STATUS_CODE':
                    return {
                        ...this.props.tasks.map(t => {
                            if (t.id !== taskId) {
                                return t
                            } else {
                                return {
                                    ...t, ...value
                                }
                            }
                        })
                    }
                case 'UPDATE_TASK_TITILE':
                    return {
                        ...this.props.tasks.map(t => {
                            if (t.id !== taskId) {
                                return t
                            } else {
                                if (value.title !== '') {
                                    return {
                                        ...t, ...value
                                    }
                                } else
                                    return {
                                        ...t, ...value
                                    }
                            }
                        })
                    }
            }
        }
        let b = updateTaskModel();
        api.changeTask(b[0], this.props.id, taskId)
            .then(response => {
                this.props.updateTask(response.data.data.item.id, response.data.data.item, this.props.id);
            })
    }

    changeStatus = (taskId, statusCode) => {
        this.changeTask(taskId, { status: statusCode }, { type: 'UPDATE_TASK_STATUS_CODE' });
    }

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, { title: title }, { type: 'UPDATE_TASK_TITILE' });
    }

    deleteTodolist = () => {
        api.deleteTodolist(this.props.id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.deleteTodolist(this.props.id);
                }
            })
    }

    deleteTask = (taskId) => {
        api.deleteTask(this.props.id, taskId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.deleteTask(taskId, this.props.id);
                }
            })
    }

    changeTodolistTitle = (title) => {
        api.changeTodolist(title, this.props.id);
    }

    render = () => {
        let { tasks = [] } = this.props;
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <TodoListTitle
                        title={this.props.title}
                        onDelete={this.deleteTodolist}
                        changeTodolistTitle={this.changeTodolistTitle}
                    />
                    <AddNewItemForm addItem={this.addTask} />

                </div>

                <TodoListTasks changeStatus={this.changeStatus}
                    changeTitle={this.changeTitle}
                    deleteTask={this.deleteTask}
                    tasks={tasks.filter(t => {
                        if (this.state.filterValue === "All") {
                            return true;
                        }
                        if (this.state.filterValue === "Active") {
                            return t.status === 0;
                        }
                        if (this.state.filterValue === "Completed") {
                            return t.status === 2;
                        }
                    })} />
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask(newTask, todolistId) {
            dispatch(addTaskAC(newTask, todolistId));
        },
        updateTask(taskId, value, todolistId) {
            dispatch(updateTaskAC(taskId, value, todolistId));
        },
        deleteTodolist: (todolistId) => {
            dispatch(deleteTodolistAC(todolistId))
        },
        deleteTask: (taskId, todolistId) => {
            dispatch(deleteTaskAC(taskId, todolistId))
        },
        setTasks: (allTasks, todoListId) => {
            dispatch(setTasksAC(allTasks, todoListId))
        }
    }
}

const ConnectedTodolist = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default ConnectedTodolist;

