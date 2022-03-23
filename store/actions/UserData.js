import AsyncStorage from '@react-native-async-storage/async-storage';

export const GET_USER_DATA = 'GET_USER_DATA';

import ExerciseData from '../../models/User';
export const POST_USER_DATA = 'POST_USER_DATA';
import { BASEURL } from '../../token';
// export const getUserData = (userId, token) => {
//   return { type: GET_USER_DATA, userData: id };
// };

export const fetchUserData = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `${BASEURL}/userExerciseData/${userId}.json?auth=${token}`
      );

      if (!response.ok) {
        throw new Error('Something Went Wrong!');
      }

      const resData = await response.json();
      console.log(resData, ' IN FETCH ');
      const userData = [];
      for (const key in resData) {
        userData.push(
          new ExerciseData(
            key,
            resData[key].id,
            resData[key].exercise,
            resData[key].rounds,
            resData[key].date,
            resData[key].previousRounds
          )
        );
      }
      dispatch({
        type: GET_USER_DATA,
        data: userData,
      });
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const postUserData = (exercise, rounds) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    try {
      //   const date = new Date().toISOString();
      const date = 'todays date';
      const response = await fetch(
        `${BASEURL}/userExerciseData/${userId}/.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: userId,
            exercise: exercise,
            rounds: rounds,
            date: date,
            previousRounds: 0,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();

      console.log(resData, ' DATA FROM POST');
      dispatch({
        type: POST_USER_DATA,
        data: {
          id: userId,
          exercise: exercise,
          rounds: rounds,
          date: date,
          previousRounds: 0,
        },
      });
    } catch (error) {
      console.log('ERROR POSTING EXERCISE', error);
    }
  };
};
// // return async (dispatch, getState) => {

// // };

// const responseData = await response.json();
// console.log(responseData);
// const response = await fetch(
//   `${BASEURL}/userExerciseData/${id}/${exercise}.json?auth=${token}`
// );

// const resdata = await response.json();

// console.log('RESPONSE DATA', resdata);
