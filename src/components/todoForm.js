import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeTodoForm, addTodo, updateTodo } from '../actions/todoActions';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    if (props.todoForm.todo) {
      this.state = {
        item: {
          title: props.todoForm.todo.title,
          id: props.todoForm.todo.id,
          status: props.todoForm.todo.status,
        },
      };
    } else {
      this.state = {
        item: {
          title: '',
          status: 'new',
        },
      };
    }
    // console.log(props.todoForm);
  }

  render() {
    let {
      todoForm: { isShow, type, todo },
      closeModal,
      addNewTodo,
      updateTodo_,
    } = this.props;
    const onAddTodo = (e) => {
      e.preventDefault();
      const todo = {
        title: this.state.item.title,
        status: this.state.item.status,
        id: new Date().getTime().toLocaleString(),
      };
      addNewTodo(todo);
    };

    const onUpdateTodo = (e) => {
      e.preventDefault();
      const todo = {
        title: this.state.item.title,
        status: this.state.item.status,
        id: this.state.item.id,
      };
      updateTodo_(todo);
    };

    const handleInput = (e) => {
      this.setState((state) => {
        const newItem = { ...state.item, [e.target.name]: e.target.value };
        return { item: newItem };
      });
    };

    return type === 'ADD' ? (
      <div className='form'>
        <h1 className='form-title'>Add Todo Form</h1>
        <form onSubmit={onAddTodo}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              placeholder='Title'
              name='title'
              autoFocus
              onChange={handleInput}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <select name='status' id='status' onChange={handleInput}>
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
        <form onSubmit={onUpdateTodo}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              placeholder='Title'
              name='title'
              autoFocus
              value={this.state.item.title}
              onChange={handleInput}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <select
              name='status'
              id='status'
              value={this.state.item.status}
              onChange={handleInput}
            >
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
    addNewTodo: (todo) => {
      dispatch(addTodo(todo));
    },
    updateTodo_: (todo) => {
      dispatch(updateTodo(todo));
    },
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(TodoForm);
