import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

import { db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
// barb@barb.com
//barbiegirl
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
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

/*

      // const docRef = doc(db, 'users', `${user.uid}`);

      // const docSnap = await getDoc(docRef);

      // if (docSnap.exists()) {
      //   console.log('DOC DATA', docSnap.data());
      // } else {
      //   console.log('no such doc');
      // }
      // let userName = docSnap.data().username;


// if (password === verifypassword) {
//   return async (dispatch) => {
//     const response = await fetch(
//       `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${TOKEN}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//           username: username,
//           returnSecureToken: true,
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorResData = await response.json();
//       console.log(errorResData);
//       const errorId = errorResData.error.message;
//       let message = 'Something went wrong!';
//       if (errorId === 'EMAIL_EXISTS') {
//         message = 'This email exists already!';
//       }
//       throw new Error(message);
//     }

//     const resData = await response.json();
//     console.log(resData, '<=============');
//     dispatch(
//       authenticate(
//         resData.localId,
//         resData.idToken,
//         parseInt(resData.expiresIn) * 1000
//       )
//     );
//     const expirationDate = new Date(
//       new Date().getTime() + parseInt(resData.expiresIn) * 1000
//     );
//     saveDataToStorage(resData.idToken, resData.localId, expirationDate);
//   };
// }

// export const signup = (email, password, verifypassword, username) => {
//   if (password === verifypassword) {
//     return async (dispatch) => {
//       const response = await fetch(
//         `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${TOKEN}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email: email,
//             password: password,
//             username: username,
//             returnSecureToken: true,
//           }),
//         }
//       );

//       if (!response.ok) {
//         const errorResData = await response.json();
//         console.log(errorResData);
//         const errorId = errorResData.error.message;
//         let message = 'Something went wrong!';
//         if (errorId === 'EMAIL_EXISTS') {
//           message = 'This email exists already!';
//         }
//         throw new Error(message);
//       }

//       const resData = await response.json();
//       console.log(resData, '<=============');
//       dispatch(
//         authenticate(
//           resData.localId,
//           resData.idToken,
//           parseInt(resData.expiresIn) * 1000
//         )
//       );
//       const expirationDate = new Date(
//         new Date().getTime() + parseInt(resData.expiresIn) * 1000
//       );
//       saveDataToStorage(resData.idToken, resData.localId, expirationDate);
//     };
//   }
// };

// export const login = (email, password) => {
//   return async (dispatch) => {
//     const response = await fetch(
//       `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${TOKEN}`,
//       {
//         method: 'POST',

//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//           returnSecureToken: true,
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorResData = await response.json();
//       console.log(errorResData);
//       const errorId = errorResData.error.message;
//       let message = 'Something went wrong!';
//       if (errorId === 'EMAIL_NOT_FOUND') {
//         message = 'This email could not be found!';
//       } else if (errorId === 'INVALID_PASSWORD') {
//         message = 'This password is not valid!';
//       }
//       throw new Error(message);
//     }

//     const resData = await response.json();
//     console.log(resData, '<=============');
//     dispatch(
//       authenticate(
//         resData.localId,
//         resData.idToken,
//         parseInt(resData.expiresIn) * 10000
//       )
//     );
//     const expirationDate = new Date(
//       new Date().getTime() + parseInt(resData.expiresIn) * 1000
//     );
//     saveDataToStorage(resData.idToken, resData.localId, expirationDate);
//   };
// };





 */
