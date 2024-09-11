/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from 'react';

// INSTANTIATE A CONTEXT API
const AuthContext = createContext();

// REDUCER IMPLEMENTATION
// INITIAL STATE SETUP
const initialState = {
  user: null,
  isAuthenticated: false,
};

// REDUCER FUNCTION SETUP
function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'logout':
      return initialState;
    default:
      throw new Error('Invalid action type ' + action.type);
  }
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

// CREATE A CUSTOM CONTEXT PROVIDER TO WRAP AROUND CHILD COMPONENTS AND SERVE PERTINENT STATE/EVENTHANDLERS
function AuthProvider({ children }) {
  // CONSUME USEREDUCER
  const [currState, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = currState;

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'login', payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  // WRAPPER JSX FORM
  return <AuthContext.Provider value={(user, isAuthenticated, login, logout)}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  //GUARD CLAUSE
  if (context === undefined) throw new Error('AuthContext was used outside the scope of AuthProvider');
  return context;
}

export { AuthProvider, useAuth };
