import AsyncStorage from '@react-native-async-storage/async-storage';

import { db } from '../../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  collection,
  collectionGroup,
  query,
  orderBy,
  where,
  getDocFromCache,
} from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { getDatabase, ref, onValue, set } from 'firebase/database';

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

/*querying an entire collection
 const q = query(collection(db, 'exercises', userId, exercise));

 const querySnapshot = await getDocs(q);

 let roundsCount = 0;

 querySnapshot.forEach((doc) => {
   console.log('query', doc.data(), doc.id);
   roundsCount += doc.data().totalRounds;
 });
 */

export const fetchUserData = (exercise) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const totalRounds = getState().userData.totalRounds;
    const auth = getAuth();
    const testing = auth.currentUser;
    var currentDate = new Date();
    var date1 = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    const date2 = '3.26.2022';
    const date = month + 1 + '.' + date1 + '.' + year;
    try {
      const exercisesRef = collection(db, 'exercises', userId, exercise);

      const k = query(exercisesRef, orderBy('date', 'desc'));
      const exSnap = await getDocs(k);
      exSnap.forEach((doc) => {
        // console.log('EXSNAM +', doc.data());
      });

      const q = query(
        collection(db, 'exercises', userId, exercise),
        orderBy('date', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const queries = [];
      querySnapshot.forEach((doc) => {
        // console.log('query', doc.data(), doc.id);
        queries.push(doc.data());
      });

      console.log('QUERIES', queries);
      // const q = query(
      //   collection(db, 'users', userId, exercise),
      //   where('exercise', '==', exercise)
      // );
      // const querySnapshot = await getDocs(q);

      // querySnapshot.forEach((doc) => {
      //   console.log('QSNAP =>', doc.data());
      // });
      // const usersCollectionRef = collection(db, 'users', userId);

      // const docRef = doc(usersCollectionRef, exercise);

      // const docSnap = await getDoc(docRef);

      // const user = query(
      //   collection(db, 'users', userId, 'Box Breathing'),
      //   orderBy('date', 'desc')
      // );
      // const docSnap = await getDocs(user);
      // const snap = [];
      // docSnap.forEach((doc) => {
      //   // console.log('DOCSNAP', doc.data());
      //   snap.push(doc.data());
      // });
      // console.log('SNA', snap);
      // const user2 = doc(db, 'users', userId);

      // const docSnap2 = await getDoc(user2);

      // if (docSnap2.exists()) {
      //   console.log('GET DOC TEST', docSnap2.id, docSnap2.data());

      // }

      // let data = await getDoc(
      //   collection(db, 'exercises', 'AKXZH1vUUmEjrFThN3ZA')
      // );

      const userData = [];

      // for (const key in querySnapshot) {
      //   // console.log('RESDATA', resData[key].id);

      //   userData.push(
      //     new ExerciseData(
      //       querySnapshot[key].userId,
      //       querySnapshot[key].exercise,
      //       querySnapshot[key].rounds,
      //       querySnapshot[key].date,
      //       querySnapshot[key].totalRounds
      //     )
      //   );
      // }

      // console.log(userData, 'HERHERHER');
      // dispatch({
      //   type: GET_USER_DATA,
      //   data: userData,
      //   // total: newTotal,
      // });
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const postUserData = (exercise, rounds) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    var currentDate = new Date();
    var date1 = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    const date2 = '3.26.2022';
    const date = month + 1 + '.' + date1 + '.' + year;
    let storageDate = new Date().toISOString();
    const docRef = doc(db, 'exercises', userId, exercise, date);

    const docSnapShot = await getDoc(docRef);
    let newTotal = 0;
    if (docSnapShot.exists()) {
      newTotal += docSnapShot.data().totalRounds;
    }

    // date may not be neccesary to save again, but leaving in for dev purposes now.
    const postData = await setDoc(
      doc(db, 'exercises', userId, exercise, date),
      {
        date: storageDate,
        rounds,
        totalRounds: newTotal + rounds,
      },
      { merge: true }
    );
    // this much redux may not be needed. Refactor after fetching is sorted.
    dispatch({
      type: POST_USER_DATA,
      data: {
        userId: userId,
        exercise: exercise,
        rounds: rounds,
        date: date,
        totalRounds: newTotal + rounds,
      },
      newTotal: newTotal + rounds,
    });
  };
};
