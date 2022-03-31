class ExerciseData {
  constructor(id, userId, exercise, rounds, date, previousRounds = 0) {
    this.id = id;
    this.userId = userId;
    this.exercise = exercise;
    this.rounds = rounds;
    this.date = date;
    this.previousRounds = previousRounds;
  }
}

export default ExerciseData;
