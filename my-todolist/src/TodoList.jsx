import React from 'react';
import './App.css';
import TodoListTasks from "./Main/TodoListTasks";
import TodoListFooter from "./Footer/TodoListFooter";
import TodoListTitle from "./Header/TodoListTitle";
import { connect } from "react-redux";
import AddNewItemForm from './Header/AddNewItemForm';
import { addTaskAC, updateTaskAC, deleteTaskAC, deleteTodolistAC, setTasksAC } from './store/reducer';
import axios from 'axios';

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();

    }

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        // переводим объект в строку
        let stateAsString = JSON.stringify(this.state);
        // сохраняем нашу строку в localStorage под ключом "our-state"
        localStorage.setItem("our-state-" + this.props.id, stateAsString);
    }
    restoreState = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {
                withCredentials: true,
                headers: { "API-KEY": "5c290fd1-469a-4d48-b513-f9d989779d32" }
            }
        )
            .then(response => {
                let allTasks = response.data.items;
                this.props.setTasks(allTasks, this.props.id);
            })
        // this.setState(state, () => {
        //     this.state.tasks.forEach(t => {
        //         if (t.id >= this.nextTaskId) {
        //             this.nextTaskId = t.id + 1;
        //         }
        //     })
        // });
    }

    _restoreState = () => {
        // объявляем наш стейт стартовый
        let state = this.state;
        // считываем сохранённую ранее строку из localStorage
        let stateAsString = localStorage.getItem("our-state-" + this.props.id);
        // а вдруг ещё не было ни одного сохранения?? тогда будет null.
        // если не null, тогда превращаем строку в объект
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        // устанавливаем стейт (либо пустой, либо восстановленный) в стейт
        this.setState(state, () => {
            this.state.tasks.forEach(t => {
                if (t.id >= this.nextTaskId) {
                    this.nextTaskId = t.id + 1;
                }
            })
        });
    }

    nextTaskId = 0;

    state = {
        tasks: [],
        filterValue: "All"
    };

    addTask = (newText) => {
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            { title: newText },
            {
                withCredentials: true,
                headers: { "API-KEY": "5c290fd1-469a-4d48-b513-f9d989779d32" }
            }
        )
            .then(response => {
                this.props.addTask(response.data.data.item, this.props.id);
            })

        // let newTask = {
        //     id: this.props.tasks.length,
        //     titleTask: newText,
        //     isDone: false,
        //     priority: "low"
        // };
        // инкрементим (увеличим) id следующей таски, чтобы при следюущем добавлении, он был на 1 больше

        // this.nextTaskId++;

        /* let newTasks = [...this.state.tasks, newTask];
         this.setState( {
             tasks: newTasks
         }, () => { this.saveState(); });*/
        // this.props.addTask(newTask, this.props.id);

    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => { this.saveState(); });
    }

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id != taskId) {
                return t;
            }
            else {
                return { ...t, ...obj };
            }
        });

        this.props.updateTask(taskId, obj, this.props.id);

        // this.setState({
        //     tasks: newTasks
        // }, () => { this.saveState(); });
    }

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, { isDone: isDone });
    }

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, { title: title });
    }

    deleteTodolist = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
            {
                withCredentials: true,
                headers: { "API-KEY": "5c290fd1-469a-4d48-b513-f9d989779d32" }
            }
        )
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.deleteTodolist(this.props.id);
                }
            })
    }

    deleteTask = (taskId) => {
        debugger
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: { "API-KEY": "5c290fd1-469a-4d48-b513-f9d989779d32" }
            }
        )
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
                    tasks={tasks.filter(t => {   //Поправить что бы таски заполнялись своими значениями 
                        if (this.state.filterValue === "All") {
                            return true;
                        }
                        if (this.state.filterValue === "Active") {
                            return t.isDone === false;
                        }
                        if (this.state.filterValue === "Completed") {
                            return t.isDone === true;
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
        updateTask(taskId, obj, todolistId) {
            dispatch(updateTaskAC(taskId, obj, todolistId));
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
