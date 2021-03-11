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

const filterOrSort = (todos, searchTerm, sort) => {
  let newTodos = todos.filter((item) => {
    return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
  });

  switch (sort) {
    case 'title_A_Z':
      newTodos = newTodos.sort((a, b) => {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      });
      break;
    case 'title_Z_A':
      newTodos = newTodos.sort((a, b) => {
        return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
      });
      break;
    case 'new':
      newTodos = newTodos.filter((item) => item.status === 'new');
      break;
    case 'active':
      newTodos = newTodos.filter((item) => item.status === 'active');
      break;
    case 'done':
      newTodos = newTodos.filter((item) => item.status === 'done');
      break;
    default:
      break;
  }

  return newTodos;
};

export const todoReducers = (state = initState, action) => {
  switch (action.type) {
    case OPEN_TODO_FORM:
      const { type, todo } = action.payload;
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
    case ADD_TODO:
      const { sort, searchTerm } = state;
      const todoItem = action.payload.todo;
      let newFiltereItems = [...state.items, todoItem];
      newFiltereItems = filterOrSort(newFiltereItems, searchTerm, sort);

      localStorage.setItem('todos', JSON.stringify([...state.items, todoItem]));
      return {
        ...state,
        items: [...state.items, todoItem],
        filteredItems: newFiltereItems,
        todoForm: { ...state.todoForm, isShow: false, type: '', todo: null },
      };
    case UPDATE_TODO:
      // console.log(action.payload.todo);
      // console.log(state.items);
      const { id, title, status } = action.payload.todo;
      let newFiltereItems_ = state.filteredItems.map((item) => {
        if (item.id === id) {
          return { ...item, status, title };
        } else {
          return item;
        }
      });
      newFiltereItems_ = filterOrSort(
        newFiltereItems_,
        state.searchTerm,
        state.sort
      );

      let newItems = state.items.map((item) => {
        if (item.id === id) {
          return { ...item, status, title };
        } else {
          return item;
        }
      });
      // console.log(newItems);
      localStorage.setItem('todos', JSON.stringify(newItems));
      return {
        ...state,
        items: newItems,
        filteredItems: newFiltereItems_,
        todoForm: { ...state.todoForm, isShow: false, type: '', todo: null },
      };
    // return state;
    case REMOVE_TODO:
      let dFilteredItems = state.filteredItems.filter((item) => {
        return item.id !== action.payload.todo.id;
      });
      let dItems = state.items.filter((item) => {
        return item.id !== action.payload.todo.id;
      });

      localStorage.setItem('todos', JSON.stringify(dItems));
      return {
        ...state,
        items: dItems,
        filteredItems: dFilteredItems,
      };
    case FILTER_TODO:
      let filterTodos = state.items;
      filterTodos = filterOrSort(
        filterTodos,
        state.searchTerm,
        action.payload.filter
      );
      return {
        ...state,
        sort: action.payload.filter,
        filteredItems: filterTodos,
      };

    case SEARCH_TODO:
      let searchTodos = state.items;
      searchTodos = filterOrSort(
        searchTodos,
        action.payload.searchTerm,
        state.sort
      );
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
        filteredItems: searchTodos,
      };

    case CHANGE_STATUS:
      let csTodos = state.items.map((item) => {
        if (item.id === action.payload.todo.id) {
          return { ...item, status: action.payload.status };
        } else {
          return item;
        }
      });
      localStorage.setItem('todos', JSON.stringify(csTodos));
      csTodos = filterOrSort(csTodos, state.searchTerm, state.sort);
      return {
        ...state,
        items: JSON.parse(localStorage.getItem('todos')),
        filteredItems: csTodos,
      };

    default:
      return state;
  }
};
