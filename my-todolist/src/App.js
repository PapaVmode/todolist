import React from 'react';
import './App.css';
import AddNewItemForm from './Header/AddNewItemForm';
import { connect } from 'react-redux';
import { addTodolistAC, setTodolistsAC } from './store/reducer';
import ConnectedTodolist from './TodoList';
import api from './api';



class App extends React.Component {

    state = {
        todolists: [],
    }

    addTodoList = (title) => {

        api.createTask(title)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.addTodolist(response.data.data.item);
                }
            })
    }

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        api.restoreStateTodolist()
            .then(res => {
                this.props.setTodolist(res.data);
            });
    }

    render = () => {
        const todolists = this.props.todolists
            .map(tl => <ConnectedTodolist id={tl.id} title={tl.title} tasks={tl.tasks} />)
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList} />
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
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
        addTodolist: (newTodolist) => {
            dispatch(addTodolistAC(newTodolist))
        },
        setTodolist: (todolist) => {
            dispatch(setTodolistsAC(todolist))
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;