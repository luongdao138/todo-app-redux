import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeTodoForm } from '../actions/todoActions';

class TodoForm extends Component {
  onAddTodo = (e) => {
    e.preventDefault();
  };

  render() {
    const {
      todoForm: { isShow, type, todo },
      closeModal,
    } = this.props;

    return type === 'ADD' ? (
      <div className='form'>
        <h1 className='form-title'>Add Todo Form</h1>
        <form onSubmit={this.onAddTodo}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input type='text' placeholder='Title' name='title' autoFocus />
          </div>

          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <select name='status' id='status'>
              <option value='new'>New</option>
              <option value='active'>Active</option>
              <option value='done'>Done</option>
            </select>
          </div>
          <div className='form-btn'>
            <button type='button' className='button' onClick={closeModal}>
              Cancel
            </button>
            <button type='submit' className='button'>
              Save
            </button>
          </div>
        </form>
      </div>
    ) : (
      <div className='form'>
        <h1 className='form-title'>Update Todo Form</h1>
        <form>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              placeholder='Title'
              name='title'
              autoFocus
              value={todo.title}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <select name='status' id='status' value={todo.status}>
              <option value='0'>New</option>
              <option value='1'>Active</option>
              <option value='2'>Done</option>
            </select>
          </div>
          <div className='form-btn'>
            <button type='button' className='button' onClick={closeModal}>
              Cancel
            </button>
            <button type='submit' className='button'>
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todoForm: state.todos.todoForm,
  };
};

const mapDisPatchToProps = (dispatch, props) => {
  return {
    closeModal: () => {
      dispatch(closeTodoForm());
    },
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(TodoForm);
