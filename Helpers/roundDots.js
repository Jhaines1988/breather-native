const roundDots = function (numberOfRounds) {
  let dotArr = [];
  for (var i = 0; i < numberOfRounds; i++) {
    dotArr.push(i + 1);
  }
  return dotArr;
};

export default roundDots;
