import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initalState = {
  users: [],
};

function updateRecord(state, itemId, changeActive) {
  const newUsers = state.users.map((rec) => {
    if (rec.id === itemId) {
      return { ...rec, active: changeActive };
    }
    return rec;
  });
  return { ...state, users: newUsers };
}

function employees(state = initalState, action) {
  switch (action.type) {
    case 'ADD_USERS':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'UPDATE_USERS':
      return updateRecord(state, action.payload.id, action.payload.active);

    default:
      return state;
  }
}

function useLocalState(localItem) {
  const jsonUsers = JSON.stringify(localItem);
  localStorage.setItem('redux-users', jsonUsers);
}

const store = createStore(
  employees,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // localStorage['redux-store']
  //   ? JSON.parse(localStorage['redux-store'])
  //   : console.log('localStorage is empty!')
);

store.subscribe(() => {
  console.log(store.getState());
  if (window.location.reload) {
    return !useLocalState(store.getState());
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
