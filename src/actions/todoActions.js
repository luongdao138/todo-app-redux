import {
  ADD_TODO,
  CHANGE_STATUS,
  CLOSE_TODO_FORM,
  FILTER_TODO,
  OPEN_TODO_FORM,
  REMOVE_TODO,
  SEARCH_TODO,
  UPDATE_TODO,
} from '../type';

export const openTodoForm = ({ type, todo }) => {
  return {
    type: OPEN_TODO_FORM,
    payload: { type, todo },
  };
};

export const closeTodoForm = () => {
  return {
    type: CLOSE_TODO_FORM,
  };
};

export const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    payload: {
      todo,
    },
  };
};

export const updateTodo = (todo) => {
  return {
    type: UPDATE_TODO,
    payload: {
      todo,
    },
  };
};

export const removeTodo = (todo) => {
  return {
    type: REMOVE_TODO,
    payload: {
      todo,
    },
  };
};

export const filterTodo = (filter) => {
  return {
    type: FILTER_TODO,
    payload: {
      filter,
    },
  };
};

export const searchTodo = (searchTerm) => {
  return {
    type: SEARCH_TODO,
    payload: {
      searchTerm,
    },
  };
};

export const changeStatus = (status, todo) => {
  return {
    type: CHANGE_STATUS,
    payload: {
      status,
      todo,
    },
  };
};
