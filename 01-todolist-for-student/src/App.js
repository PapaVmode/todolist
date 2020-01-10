import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTask from './TodoListTask';
import TodoListFooter from './TodoListFooter';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader />
                    <TodoListTask />
                    <TodoListFooter />
                </div>
            </div>
        );
    }
}

export default App;

