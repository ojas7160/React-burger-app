import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START

  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  }
}

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart())
    const auth = {
      email: 'ojas@ww.com',
      password: 'ojas7160'
    }
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]', auth)
    .then(res => {
      console.log(res)
      dispatch(authSuccess(res.data))
    })
    .catch(err => {
      dispatch(authFail(err))
    })
  }
}