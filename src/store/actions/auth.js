import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START

  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart())
    const auth = {
      email: 'ojas@ww.com',
      password: 'ojas7160'
    }
    axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key='AIzaSyDIMcE8EyWEIZuZ11sJzeESbOBjyvV5Nek'", auth)
    .then(res => {
      console.log(res)
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeout(res.data.expiresIn))
    })
    .catch(err => {
      dispatch(authFail(err.response.data.error))
    })
  }
}