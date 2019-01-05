function formatResultAccordingToLimit(demographicDataType, result, limit) {
  const additionalLines = extractAdditionalLines(result, limit);
  const groupedLine = createGroupedLine(demographicDataType, additionalLines);
  const resultFormatted = replaceAdditionalLinesByALine(
    result,
    limit - 1,
    groupedLine
  );

  return resultFormatted;
}

function additionalLinesShouldBeGroupedTogether(arrayLength, limit) {
  return arrayLength > limit;
}

function extractAdditionalLines(array, limit) {
  return array.slice(limit, array.length);
}

function createGroupedLine(demographicDataType, additionalLines) {
  const avgAge = getAvgAgeOfAdditionalLines(additionalLines);
  const count = getSumOfCountOfAdditionalLines(additionalLines);

  return { demographicDataType: "Others", count: count, avgAge: avgAge };
}

function getAvgAgeOfAdditionalLines(array) {
  return getTotalOfAnArrayProperty(array, "avgAge") / array.length;
}

function getSumOfCountOfAdditionalLines(array) {
  return getTotalOfAnArrayProperty(array, "count");
}

function getTotalOfAnArrayProperty(array, property) {
  let sum = 0;

  for (let index = 0; index < array.length; index++) {
    sum += array[index][property];
  }

  return sum;
}

function replaceAdditionalLinesByALine(array, index, line) {
  return [...array.slice(0, index), line];
}

module.exports = {
  formatResultAccordingToLimit,
  additionalLinesShouldBeGroupedTogether,
  extractAdditionalLines,
  getAvgAgeOfAdditionalLines,
  getSumOfCountOfAdditionalLines,
  replaceAdditionalLinesByALine
};
