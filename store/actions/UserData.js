import dayjs from 'dayjs';
import { db } from '../../firebase';
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
import { getAuth } from 'firebase/auth';
import { doc } from 'firebase/firestore';

export const GET_USER_DATA = 'GET_USER_DATA';
export const POST_USER_DATA = 'POST_USER_DATA';
export const POPULATE_ALL_USER_DATA = 'POPULATE_ALL_USER_DATA';

export const populateAllUserData = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    const auth = getAuth();
    const user = auth.currentUser;

    try {
      console.log('SO DOES THI');
      const allExercises = await Promise.all([
        getData(userId, 'Box Breathing'),
        getData(userId, 'Tummo Style'),
        getData(userId, 'Coherent Breathing'),
      ]);

      const [boxData, boxLifetimeTotal, boxDates] = allExercises[0];
      const [tummoData, tummoLifetimeTotal, tummoDates] = allExercises[1];
      const [coherentData, coherentLifetimeTotal, coherentDates] =
        allExercises[2];

      let boxState = {
        exerciseData: boxData,
        total: boxLifetimeTotal,
        dates: boxDates,
      };
      let tummoState = {
        exerciseData: tummoData,
        total: tummoLifetimeTotal,
        dates: tummoDates,
      };
      let coherentState = {
        exerciseData: coherentData,
        total: coherentLifetimeTotal,
        dates: coherentDates,
      };

      dispatch({
        type: POPULATE_ALL_USER_DATA,
        box: boxState,
        tummo: tummoState,
        coherent: coherentState,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
};

export const fetchUserData = (exercise) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {
      const updatedExerciseData = await getData(userId, exercise);
      const [exerciseData, exerciseLifetimeTotal, exerciseDates] =
        updatedExerciseData;
      let exerciseState = {
        exerciseData: exerciseData,
        total: exerciseLifetimeTotal,
        dates: exerciseDates,
      };

      const dispatchObject = { type: GET_USER_DATA };
      dispatchObject[exercise] = exerciseState;
      dispatchObject.currentExercise = exercise;

      dispatch(dispatchObject);
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const postUserData = (exercise, rounds) => {
  return async (dispatch, getState) => {
    let newD1 = dayjs().format('MM.D.YY');
    let d2 = new Date(Date.now()).setHours(0, 0, 0, 0);
    const userId = getState().auth.userId;

    const docRef = doc(db, 'exercises', userId, exercise, newD1);

    const docSnapShot = await getDoc(docRef);
    let newTotal = 0;
    if (docSnapShot.exists()) {
      newTotal += docSnapShot.data().totalRounds;
    }

    // date is neccesary to save because victory graphs needs  a timestamp in ms...
    // and a document name cannot be such a time stamp.
    const postData = await setDoc(
      doc(db, 'exercises', userId, exercise, newD1),
      {
        date: d2,
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
        date: newD1,
        totalToday: newTotal + rounds,
      },
      newTotal: newTotal + rounds,
    });
  };
};

const getData = async function (userId, ex) {
  const datesArray = [];
  const Query = query(collection(db, 'exercises', userId, ex));
  const objResult = [];
  const querySnap = await getDocs(Query);
  let lifeTimeTotal = 0;
  querySnap.forEach((doc) => {
    lifeTimeTotal += doc.data().totalRounds;
    const obj = {};
    obj.date = doc.data().date;
    obj.rounds = doc.data().totalRounds;
    objResult.push(obj);
    const docID = new Date(doc.data().date);
    datesArray.push(doc.data().date);
    console.log(' HEY THIS TOO');
  });

  return [objResult, lifeTimeTotal, datesArray];
};
