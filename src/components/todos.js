import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { openTodoForm, closeTodoForm } from '../actions/todoActions';
import TodoForm from './todoForm';
import Zoom from 'react-reveal/Zoom';

class Todos extends Component {
  closeModal = () => {};

  render() {
    const {
      openTodoForm,
      todoForm,
      closeModal,
      filteredTodos,
      todos,
    } = this.props;
    const { isShow } = todoForm;
    console.log(this.props);
    return todos.length > 0 ? (
      filteredTodos.length === 0 ? (
        <h2>No todos are found!</h2>
      ) : (
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
                  <input type='text' placeholder='Enter...' />
                </td>
                <td>
                  <select name='' id=''>
                    <option value=''>All</option>
                    <option value='status_new'>New</option>
                    <option value='status_active'>Active</option>
                    <option value='status_done'>Done</option>
                  </select>
                </td>
                <td></td>
              </tr>
              {filteredTodos.map((todo, index) => {
                const { id, title, status } = todo;
                return (
                  <tr key={id}>
                    <td style={{ width: '10%' }}>{index}</td>
                    <td>{title}</td>
                    <td className='action' style={{ width: '25%' }}>
                      <button
                        className={
                          status == 0 ? `button new` : `button inactive`
                        }
                      >
                        New
                      </button>
                      <button
                        className={
                          status == 1 ? `button active` : `button inactive`
                        }
                      >
                        Active
                      </button>
                      <button
                        className={
                          status == 2 ? `button done` : `button inactive`
                        }
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
                      <button className='button remove'>Remove</button>
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
            <Modal
              isOpen={true}
              ariaHideApp={false}
              onRequestClose={closeModal}
            >
              {' '}
              <Zoom>
                <TodoForm />
              </Zoom>{' '}
            </Modal>
          )}
        </div>
      )
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
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(Todos);
