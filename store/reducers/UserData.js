import {
  GET_USER_DATA,
  POST_USER_DATA,
  POPULATE_ALL_USER_DATA,
} from '../actions/UserData';
import ExerciseData from '../../models/User';
const initialState = {
  exerciseData: [],
  totalRounds: 0,
};

export default (state = initialState, action) => {
  // console.log('ACTION', action);
  switch (action.type) {
    case POPULATE_ALL_USER_DATA:
      return { exerciseData: action.data, totalRounds: action.totalRounds };

    case GET_USER_DATA:
      const total = state.exerciseData.reduce((acc, data) => {
        acc += data.rounds;
        return acc;
      }, 0);

      // console.log(total, 'TOTAL ROUNDS ');
      return { exerciseData: action.data, totalRounds: state.totalRounds };

    case POST_USER_DATA:
      const newExerciseSession = new ExerciseData(
        action.data.userId,
        action.data.exercise,
        action.data.rounds,
        action.data.date,
        action.data.totalRounds
      );

      return {
        ...state,
        exerciseData: state.exerciseData.concat([newExerciseSession]),
        totalRounds: action.newTotal,
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
