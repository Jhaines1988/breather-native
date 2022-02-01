import React, { useState, useEffect, useRef } from 'react';

import './home.styles.css';

const Home = (props) => {
  const exerciseSelector = props.exerciseSelector;
  const rounds = useRef();

  const [selectedExercise, setSelectedExercise] = useState('box');
  const changeSelectorHandler = function (event) {
    console.log('ex', event.target.value);
    setSelectedExercise(event.target.value);
    console.log(rounds.current.value);
  };
  const handleSubmit = function (e) {
    let selectedRounds = rounds.current.value;
    exerciseSelector(e, selectedExercise, selectedRounds);
  };
  return (
    <div className='form_container'>
      <h1 className='main_heading'> Take a Breather </h1>
      <p className='home_info'>
        Choose the style of breathing exercise and number of rounds you want to
        do. Breather will provide visual cues throughout your exercise and let
        you know when you're done.
      </p>
      <form>
        <label>Choose Your Exercise</label>
        <select value={selectedExercise} onChange={changeSelectorHandler}>
          <option value='box'>Box Breathing 4x4</option>
          <option value='5X5'>Circular Breathing 5X5</option>
        </select>
        <label> Number of Rounds </label>
        <select ref={rounds}>
          <option>4</option>
          <option>6</option>
          <option>8 </option>
          <option>10 </option>
        </select>

        <button className='start_exercise' onClick={handleSubmit} type='button'>
          Start
        </button>
      </form>
    </div>
  );
};

export default Home;
