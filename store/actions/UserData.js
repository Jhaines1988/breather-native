import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, nanoid } from '@reduxjs/toolkit';
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import ExerciseData from '../../models/User';
import { BASEURL } from '../../token';

export const GET_USER_DATA = 'GET_USER_DATA';
export const POST_USER_DATA = 'POST_USER_DATA';
export const POPULATE_ALL_USER_DATA = 'POPULATE_ALL_USER_DATA';

export const populateAllUserData = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `${BASEURL}/userExerciseData/${userId}.json?auth=${token}`
      );

      const resData = await response.json();

      // console.log('START', resData, 'ALL USER exerciseData');
      let test = [];
      let testObj = {};
      const userData = [];
      for (const key in resData) {
        // console.log('RESDATA', resData[key].id);
        // test = test.concat(Object.values(resData[key]));
        testObj[key] = Object.values(resData[key]);
        // userData.push(
        //   new ExerciseData(
        //     key,
        //     resData[key].userId,
        //     resData[key].exercise,
        //     resData[key].rounds,
        //     resData[key].date,
        //     resData[key].previousRounds + resData[key].rounds || 0
        //   )
        // );
      }

      for (const key in testObj) {
        console.log('KEY', key);
        for (const item of testObj[key]) {
          console.log('ITEM', item);
          const { date, exercise, previousRounds, rounds, userId } = item;
          test.push(
            new ExerciseData(
              key,
              userId,
              exercise,
              rounds,
              date,
              previousRounds
            )
          );
        }
      }
      console.log(test, 'USERDATA');
      if (!response.ok) {
        throw new Error('Something Went Wrong!');
      }

      dispatch({
        type: POPULATE_ALL_USER_DATA,
        data: userData,
        total: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchUserData = (exercise) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const totalRounds = getState().userData.totalRounds;

    const exerciseSpecificData = getState().userData.exerciseData.filter(
      (data) => {
        return data.exercise === exercise;
      }
    );

    // console.log(
    //   'EXERCISESPECICIF',
    //   exerciseSpecificData,
    //   getState().userData.exerciseData
    // );

    try {
      const response = await fetch(
        `${BASEURL}/userExerciseData/${userId}/${exercise}.json?auth=${token}`
      );

      if (!response.ok) {
        throw new Error('Something Went Wrong!');
      }

      const resData = await response.json();
      // console.log(resData, ' IN FETCH ');
      const userData = [];
      let newTotal = 0;
      for (const key in resData) {
        // console.log('RESDATA', resData[key].id);
        newTotal += resData[key].rounds;
        userData.push(
          new ExerciseData(
            key,
            resData[key].userId,
            resData[key].exercise,
            resData[key].rounds,
            resData[key].date,
            resData[key].previousRounds + resData[key].rounds || 0
          )
        );
      }

      // console.log(newTotal, '+++');
      // console.log('USERDDATA ARRAY', userData);
      dispatch({
        type: GET_USER_DATA,
        data: userData,
        total: newTotal,
      });
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const postUserData = (exercise, rounds) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    console.log(getState().userData.totalRounds, '+++++++');
    // const docRef = doc(db, 'user s', `${userId}`, exercise);

    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   console.log('DOC DATA', docSnap.data());
    // } else {
    //   console.log('no such doc');
    // }
    const q = query(
      collection(db, 'users', userId, exercise),
      where('exercise', '==', exercise)
    );

    const querySnapshot = await getDocs(q);

    let roundsCount = 0;
    querySnapshot.forEach((doc) => {
      roundsCount += doc.data().rounds;
      console.log(doc.id, ' => ', doc.data());
    });
    const date = new Date().toISOString();
    // const postData = await setDoc(
    //   doc(db, 'users', userId, exercise, 'exerciseData'),
    //   { userId, exercise, rounds, date, previousRounds: 0 }
    // );

    const postData = await addDoc(collection(db, 'users', userId, exercise), {
      userId,
      exercise,
      rounds,
      date,
      totalRounds: roundsCount + rounds,
    });

    dispatch({
      type: POST_USER_DATA,
      data: {
        userId: userId,
        exercise: exercise,
        rounds: rounds,
        date: date,
        totalRounds: roundsCount + rounds,
      },
      newTotal: roundsCount + rounds,
    });
  };
};
const postUserData1 = (exercise, rounds) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;

    // const exerciseSpecificData = getState().userData.exerciseData.filter(
    //   (data) => {
    //     return data.exercise === exercise;
    //   }
    // );

    // console.log('EXERCISESPECICIF', exerciseSpecificData, exercise);
    // const total = getState().userData.exerciseData.reduce((acc, data) => {
    //   acc += data.rounds;
    //   return acc;
    // }, 0);

    // console.log(total, 'PEANUT');
    try {
      //   const date = new Date().toISOString();
      const date = new Date().toISOString();
      const response = await fetch(
        `${BASEURL}/userExerciseData/${userId}/${exercise}.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // id: nanoid(),
            userId: userId,
            exercise: exercise,
            rounds: rounds,
            date: date,
            previousRounds: rounds,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();

      // console.log(resData, ' DATA FROM POST');
      dispatch({
        type: POST_USER_DATA,
        data: {
          id: resData.name,
          userId: userId,
          exercise: exercise,
          rounds: rounds,
          date: date,
          previousRounds: rounds,
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
