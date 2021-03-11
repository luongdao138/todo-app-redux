import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterTodo, searchTodo } from '../actions/todoActions';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  render() {
    const { todos, filterTodo_, sort, searchTodo_ } = this.props;

    const handleFilter = (e) => {
      filterTodo_(e.target.value);
    };

    return (
      todos.length > 0 && (
        <div className='filter'>
          <div>
            <input
              type='text'
              placeholder='Enter keyword...'
              // value={this.state.value}
              onChange={(e) => {
                this.setState((state) => {
                  return { value: e.target.value };
                });
              }}
            />
            <button
              className='button'
              onClick={(e) => {
                searchTodo_(this.state.value);
              }}
            >
              Find
            </button>
          </div>
          <select name='' id='' value={sort} onChange={handleFilter}>
            <option value=''>All</option>
            <option value='title_A_Z'>Name: A-{'>'}Z</option>
            <option value='title_Z_A'>Name: Z-{'>'}A</option>
            <option value='new'>Status: New</option>
            <option value='active'>Status: Active</option>
            <option value='done'>Status: Done</option>
          </select>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.items,
    sort: state.todos.sort,
    filteredTodos: state.todos.filteredItems,
  };
};

const mapDisPatchToProps = (dispatch) => {
  return {
    filterTodo_: (filter) => {
      dispatch(filterTodo(filter));
    },
    searchTodo_: (searchTerm) => {
      dispatch(searchTodo(searchTerm));
    },
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(Filter);
