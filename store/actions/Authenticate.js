export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

import { db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { TOKEN } from '../../token';
import { signIn } from '../../firebase';

let timer;
export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    // dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
    });
  };
};

export const signup = (email, password, verifypassword, username) => {
  return async (dispatch) => {
    const auth = getAuth();

    if (password !== verifypassword) {
      throw new Error('Passwords Must Match!');
    }
    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      let user = createdUser.user;
      console.log('USER', user);
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
      });
      let token = user.stsTokenManager.accessToken;
      const expiration = user.stsTokenManager.expirationTime;

      const expirationDate = new Date(new Date().getTime() + expiration * 1000);
      dispatch(authenticate(user.uid, token, expiration));
    } catch (error) {
      let message;

      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        message = 'This Email is Already Registered';

        throw new Error(message);
      } else {
        throw new Error(error);
      }
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const auth = getAuth();
    try {
      let signedIn = await signInWithEmailAndPassword(auth, email, password);
      let user = signedIn.user;
      const expiration = user.stsTokenManager.expirationTime;

      let token = user.stsTokenManager.accessToken;

      dispatch(authenticate(user.uid, token, expiration));

      const expirationDate = new Date(new Date().getTime() + expiration * 1000);
      // saveDataToStorage(token, user.uid, new Date(expiration));
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log('HERE', errorCode, errorMessage);

      let message = 'Something Went Wrong...';
      if (error.code === 'auth/wrong-password') {
        message = 'Wrong password...';
        throw new Error(message);
      } else if (error.code === 'auth/user-not-found') {
        message = 'Please Signup, we dont recognize that email...';
        throw new Error(message);
      } else {
        throw new Error(error);
      }
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    await dispatch({ type: LOGOUT });
    signOut(auth)
      .then(() => {
        console.log('signed out');
      })
      .catch((err) => {
        console.log(err, 'LOGOUT');
      });
  };
};
