import React, { Component } from 'react';

export default class Filter extends Component {
  render() {
    return (
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
    );
  }
}
