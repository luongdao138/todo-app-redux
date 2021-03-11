import React, { Component } from 'react';
import { todos } from '../data';

export default class Todos extends Component {
  render() {
    console.log(todos);
    return (
      <div className='todos'>
        {/* <h1>Todo List</h1> */}
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
            {todos.map((todo, index) => {
              const { id, title, status } = todo;
              return (
                <tr key={id}>
                  <td style={{ width: '10%' }}>{index}</td>
                  <td>{title}</td>
                  <td className='action' style={{ width: '25%' }}>
                    <button
                      className={status == 0 ? `button new` : `button inactive`}
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
                    <button className='button update'>Update</button>
                    <button className='button remove'>Remove</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className='add-btn'>
          <button className='button'>Add Todo</button>
        </div>
      </div>
    );
  }
}
