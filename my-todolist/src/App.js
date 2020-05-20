import React from 'react';
import './App.css';
import AddNewItemForm from './Header/AddNewItemForm';
import { connect } from 'react-redux';
import { addTodolistAC, setTodolistsAC } from './store/reducer';
import ConnectedTodolist from './TodoList';
import api from './api';



class App extends React.Component {

    nextTodoListId = 0;

    state = {
        todolists: []
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


    saveState = () => {
        // переводим объект в строку
        let stateAsString = JSON.stringify(this.state);
        // сохраняем нашу строку в localStorage под ключом "our-state"
        localStorage.setItem("todolists-state", stateAsString);
    }

    _restoreState = () => {
        // объявляем наш стейт стартовый
        let state = this.state;
        // считываем сохранённую ранее строку из localStorage
        let stateAsString = localStorage.getItem("todolists-state");
        // а вдруг ещё не было ни одного сохранения?? тогда будет null.
        // если не null, тогда превращаем строку в объект
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        // устанавливаем стейт (либо пустой, либо восстановленный) в стейт
        this.setState(state, () => {
            this.state.todolists.forEach(t => {
                if (t.id >= this.nextTodoListId) {
                    this.nextTodoListId = t.id + 1;
                }
            })
        });
    }

    render = () => {
        const todolists = this.props
            .todolists
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