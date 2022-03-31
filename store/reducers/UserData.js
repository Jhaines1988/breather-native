import {
  GET_USER_DATA,
  POST_USER_DATA,
  POPULATE_ALL_USER_DATA,
} from '../actions/UserData';

const initialState = {
  exerciseData: [],
  'Tummo Style': { exerciseData: [], total: 0, dates: [] },
  'Box Breathing': { exerciseData: [], total: 0, dates: [] },
  'Coherent Breathing': { exerciseData: [], total: 0, dates: [] },
};

export default (state = initialState, action) => {
  // console.log('ACTION', action);
  switch (action.type) {
    case POPULATE_ALL_USER_DATA:
      return {
        ...state,
        'Tummo Style': action.tummo,
        'Box Breathing': action.box,
        'Coherent Breathing': action.coherent,
      };

    case GET_USER_DATA:
      const exerciseKey = action.currentExercise;
      const newExerciseData = action[exerciseKey];
      let stateCopy = { ...state };
      stateCopy[exerciseKey] = newExerciseData;

      return stateCopy;

    // return { ...state, exerciseData: action.data };

    case POST_USER_DATA:
      return {
        ...state,
        exerciseData: [...state.exerciseData, action.data],
        totalRounds: action.newTotal,
      };
  }
  return state;
};
