import React, { Component } from 'react';
import { connect } from 'react-redux';

class Filter extends Component {
  render() {
    const { todos } = this.props;
    return (
      todos.length > 0 && (
        <div className='filter'>
          <div>
            <input type='text' placeholder='Enter keyword...' />
            <button className='button'>Find</button>
          </div>
          <select name='' id=''>
            <option value=''>All</option>
            <option value=''>Name: Z-{'>'}A</option>
            <option value=''>Name: A-{'>'}Z</option>
            <option value=''>Status: New</option>
            <option value=''>Status: Active</option>
            <option value=''>Status: Done</option>
          </select>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.items,
    filteredTodos: state.todos.filteredItems,
  };
};

export default connect(mapStateToProps)(Filter);
