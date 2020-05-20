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

    componentDidMount() {
        this.restoreState();
    }

    // saveState = () => {
    //     // переводим объект в строку
    //     let stateAsString = JSON.stringify(this.state);
    //     // сохраняем нашу строку в localStorage под ключом "our-state"
    //     localStorage.setItem("our-state-" + this.props.id, stateAsString);
    // }
    restoreState = () => {
        api.restoreStateTasks(this.props.id).then(response => {
            let allTasks = response.data.items;
            this.props.setTasks(allTasks, this.props.id);
        })
    }

    // _restoreState = () => {
    //     // объявляем наш стейт стартовый
    //     let state = this.state;
    //     // считываем сохранённую ранее строку из localStorage
    //     let stateAsString = localStorage.getItem("our-state-" + this.props.id);
    //     // а вдруг ещё не было ни одного сохранения?? тогда будет null.
    //     // если не null, тогда превращаем строку в объект
    //     if (stateAsString != null) {
    //         state = JSON.parse(stateAsString);
    //     }
    //     // устанавливаем стейт (либо пустой, либо восстановленный) в стейт
    //     this.setState(state, () => {
    //         this.state.tasks.forEach(t => {
    //             if (t.id >= this.nextTaskId) {
    //                 this.nextTaskId = t.id + 1;
    //             }
    //         })
    //     });
    // }

    state = {
        filterValue: "All"
    };

    addTask = (newText) => {
        api.createTodolist(newText, this.props.id).then(response => {
            this.props.addTask(response.data.data.item, response.data.data.item.todoListId);
        })
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
        // }, () => { this.saveState(); });
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
        debugger
        api.changeTask(b[0], this.props.id, taskId)
            .then(response => {
                debugger
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

    render = () => {
        let { tasks = [] } = this.props;
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <TodoListTitle title={this.props.title} onDelete={this.deleteTodolist} />
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

