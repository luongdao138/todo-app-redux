import { CLOSE_TODO_FORM, OPEN_TODO_FORM } from '../type';

const initState = {
  items: localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [],
  filteredItems: localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [],
  sort: '',
  searchTerm: '',
  todoForm: {
    isShow: false,
    type: '',
    todo: null,
  },
};

export const todoReducers = (state = initState, action) => {
  switch (action.type) {
    case OPEN_TODO_FORM:
      const { type, todo } = action.payload;
      console.log(action);
      if (type === 'ADD') {
        return {
          ...state,
          todoForm: { ...state.todoForm, type, isShow: true, todo: null },
        };
      } else {
        return {
          ...state,
          todoForm: { ...state.todoForm, type, isShow: true, todo },
        };
      }
    case CLOSE_TODO_FORM:
      return {
        ...state,
        todoForm: { ...state.todoForm, isShow: false, type: '', todo: null },
      };

    default:
      return state;
  }
};
