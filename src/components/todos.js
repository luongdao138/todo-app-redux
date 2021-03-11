import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {
  openTodoForm,
  closeTodoForm,
  removeTodo,
  searchTodo,
  filterTodo,
  changeStatus,
} from '../actions/todoActions';
import TodoForm from './todoForm';
import Zoom from 'react-reveal/Zoom';

class Todos extends Component {
  closeModal = () => {};

  render() {
    const {
      openTodoForm,
      todoForm,
      closeModal,
      sort,
      filteredTodos,
      todos,
      removeTodo_,
      filterTodo_,
      searchTodo_,
      changeStatus_,
    } = this.props;
    const { isShow } = todoForm;

    const handleFilter = (e) => {
      filterTodo_(e.target.value);
    };

    const handleChangeStatus = (status, todo) => {
      if (todo.status !== status) {
        changeStatus_(status, todo);
      }
    };

    // console.log(this.props);
    return todos.length > 0 ? (
      <div className='todos'>
        <table>
          <thead>
            <tr>
              <td>Index</td>
              <td>Title</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type='text'
                  placeholder='Enter...'
                  onChange={(e) => {
                    searchTodo_(e.target.value);
                  }}
                />
              </td>
              <td>
                <select
                  name=''
                  id=''
                  value={
                    sort !== 'title_A_Z' && sort !== 'title_Z_A' ? sort : ''
                  }
                  onChange={handleFilter}
                >
                  <option value=''>All</option>
                  <option value='new'>New</option>
                  <option value='active'>Active</option>
                  <option value='done'>Done</option>
                </select>
              </td>
              <td></td>
            </tr>
            {filteredTodos.length !== 0 &&
              filteredTodos.map((todo, index) => {
                const { id, title, status } = todo;
                return (
                  <tr key={id}>
                    <td style={{ width: '10%' }}>{index + 1}</td>
                    <td>{title}</td>
                    <td className='action' style={{ width: '25%' }}>
                      <button
                        className={
                          status === 'new' ? `button new` : `button inactive`
                        }
                        onClick={() => {
                          handleChangeStatus('new', todo);
                        }}
                      >
                        New
                      </button>
                      <button
                        className={
                          status === 'active'
                            ? `button active`
                            : `button inactive`
                        }
                        onClick={() => {
                          handleChangeStatus('active', todo);
                        }}
                      >
                        Active
                      </button>
                      <button
                        className={
                          status === 'done' ? `button done` : `button inactive`
                        }
                        onClick={() => {
                          handleChangeStatus('done', todo);
                        }}
                      >
                        Done
                      </button>
                    </td>
                    <td className='action'>
                      <button
                        className='button update'
                        onClick={() => {
                          openTodoForm('UPDATE', todo);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className='button remove'
                        onClick={() => {
                          removeTodo_(todo);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className='add-btn'>
          <button
            className='button'
            onClick={() => {
              openTodoForm('ADD');
            }}
          >
            Add Todo
          </button>
        </div>
        {isShow && (
          <Modal isOpen={true} ariaHideApp={false} onRequestClose={closeModal}>
            {' '}
            <Zoom>
              <TodoForm />
            </Zoom>{' '}
          </Modal>
        )}
      </div>
    ) : (
      <div>
        <h2 className='text-center'>Your todos is empty!</h2>
        <div className='add-btn'>
          <button
            style={{
              display: 'block',
              margin: 'auto',
              marginTop: '2rem',
            }}
            className='button'
            onClick={() => {
              openTodoForm('ADD');
            }}
          >
            Add Todo
          </button>
        </div>
        {isShow && (
          <Modal isOpen={true} ariaHideApp={false} onRequestClose={closeModal}>
            {' '}
            <Zoom>
              <TodoForm />
            </Zoom>{' '}
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.items,
    sort: state.todos.sort,
    filteredTodos: state.todos.filteredItems,
    todoForm: state.todos.todoForm,
  };
};

const mapDisPatchToProps = (dispatch, props) => {
  return {
    openTodoForm: (type, todo) => {
      dispatch(openTodoForm({ type, todo }));
    },
    closeModal: () => {
      dispatch(closeTodoForm());
    },
    removeTodo_: (todo) => {
      dispatch(removeTodo(todo));
    },
    filterTodo_: (filter) => {
      dispatch(filterTodo(filter));
    },
    searchTodo_: (searchTerm) => {
      dispatch(searchTodo(searchTerm));
    },
    changeStatus_: (status, todo) => {
      dispatch(changeStatus(status, todo));
    },
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(Todos);
