function formatResultBeforeStoring(result) {
  const resultWithAverageAgesRounded = roundAverageAgeOfEachRow(result);
  const resultInArrayOfArrays = transformToArrayOfArrays(
    resultWithAverageAgesRounded
  );
  const resultFormatted = addIndexWithinEachArray(resultInArrayOfArrays);

  return resultFormatted;
}

function roundAverageAgeOfEachRow(result) {
  for (let index = 0; index < result.length; index++) {
    result[index].avgAge = Math.round(result[index].avgAge);
  }

  return result;
}

function transformToArrayOfArrays(arrayOfKeyArrays) {
  for (let index = 0; index < arrayOfKeyArrays.length; index++) {
    const array = Object.values(arrayOfKeyArrays[index]);
    arrayOfKeyArrays[index] = array;
  }

  return arrayOfKeyArrays;
}

function addIndexWithinEachArray(arrayOfArrays) {
  for (let index = 0; index < arrayOfArrays.length; index++) {
    arrayOfArrays[index] = [index + 1, ...arrayOfArrays[index]];
  }

  return arrayOfArrays;
}

module.exports = {
  formatResultBeforeStoring,
  roundAverageAgeOfEachRow,
  transformToArrayOfArrays,
  addIndexWithinEachArray
};
