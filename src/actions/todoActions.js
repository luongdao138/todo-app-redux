import { CLOSE_TODO_FORM, OPEN_TODO_FORM } from '../type';

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
