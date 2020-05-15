import React from 'react';
import ButtonFooter from './ButtonFooter/ButtonFooter';

class TodoListFooter extends React.Component {

    state = {
        isHidden: false
    }

    onAllFilterClick = () => { this.props.changeFilter("All"); }
    onCompletedFilterClick = () => { this.props.changeFilter("Completed"); }
    onActiveFilterClick = () => { this.props.changeFilter("Active"); }
    onShowFiltersClick = () => { this.setState({ isHidden: true }) }
    onHideFiltersClick = () => { this.setState({ isHidden: false }) }

    render = (props) => {

        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";

        return (
            <div className="todoList-footer">
                {!this.state.isHidden && <div>
                    <button onClick={this.onAllFilterClick} className={classForAll}>All</button>
                    <button onClick={this.onCompletedFilterClick} className={classForCompleted}>Completed</button>
                    <button onClick={this.onActiveFilterClick} className={classForActive}>Active</button>
                </div>
                }
                {!this.state.isHidden && <span onClick={this.onShowFiltersClick}>hide</span>}
                {this.state.isHidden && <span onClick={this.onHideFiltersClick}>show</span>}
            </div>
        );
    }
}

export default TodoListFooter;

