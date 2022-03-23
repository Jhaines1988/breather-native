import { GET_USER_DATA, POST_USER_DATA } from '../actions/UserData';
import ExerciseData from '../../models/User';
const initialState = {
  exerciseData: [
    {
      date: null,
      exercise: null,
      id: null,
      previousRounds: null,
      rounds: null,
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return { exerciseData: action.data };

    case POST_USER_DATA:
      const newExerciseSession = new ExerciseData(
        action.data.id,
        action.data.exercise,
        action.data.rounds,
        action.data.date,
        action.data.previousRounds
      );

      return {
        ...state,
        exerciseData: state.exerciseData.concat(newExerciseSession),
      };
  }
  return state;
};
// const postUserDataReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case POST_USER_DATA:

//     default:
//       return state;
//   }
// };
