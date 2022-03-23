class ExerciseData {
  constructor(id, exercise, rounds, date, previousRounds = 0) {
    this.id = id;
    this.exercise = exercise;
    this.rounds = rounds;
    this.date = date;
    this.previousRounds = previousRounds;
  }
}

export default ExerciseData;
