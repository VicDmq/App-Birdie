import assert from "assert";
import {
  additionalLinesShouldBeGroupedTogether,
  extractAdditionalLines,
  getAvgAgeOfAdditionalLines,
  getSumOfCountOfAdditionalLines,
  replaceAdditionalLinesByALine
} from "../src/server/resultFormatting";
import {
  roundAverageAgeOfEachRow,
  transformToArrayOfArrays,
  addIndexWithinEachArray
} from "../src/client/resultFormatting";

describe("Result formatting on server side", function() {
  describe("#additionalLinesShouldBeGroupedTogether", function() {
    it("should return false because this is not neccesary", function() {
      const bool = additionalLinesShouldBeGroupedTogether(
        new Array(10).length,
        15
      );

      assert.deepEqual(bool, false);
    });

    it("should return false because the maximum limit is included", function() {
      const length = 10;
      const bool = additionalLinesShouldBeGroupedTogether(
        new Array(length).length,
        length
      );

      assert.deepEqual(bool, false);
    });

    it("should return true because this is neccesary", function() {
      const bool = additionalLinesShouldBeGroupedTogether(
        new Array(10).length,
        9
      );

      assert.deepEqual(bool, true);
    });
  });

  describe("#extractAdditionalLines", function() {
    it("should return the additional lines in a new array", function() {
      const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const returnedArray = extractAdditionalLines(array, 1);
      const expectedArray = [{ id: 2 }, { id: 3 }];

      assert.deepEqual(returnedArray, expectedArray);
    });
  });

  describe("#getAvgAgeOfAdditionalLines", function() {
    it("should return the average age of the additional lines", function() {
      const array = [
        { avgAge: 30, id: 1, color: "yellow" },
        { avgAge: 13, id: 2, color: "blue" },
        { avgAge: 55, id: 3, color: "red" },
        { avgAge: 25, id: 4, color: "red" }
      ];
      const avgAge = getAvgAgeOfAdditionalLines(array);
      const expectedAvgAge = 30.75;

      assert.deepEqual(avgAge, expectedAvgAge);
    });
  });

  describe("#getSumOfCountOfAdditionalLines", function() {
    it("should return the sum of each property count in the additional lines", function() {
      const array = [
        { count: 30, id: 1, color: "yellow" },
        { count: 13, id: 2, color: "blue" },
        { count: 55, id: 3, color: "red" },
        { count: 25, id: 4, color: "red" }
      ];
      const sum = getSumOfCountOfAdditionalLines(array);
      const expectedSum = 123;

      assert.deepEqual(sum, expectedSum);
    });
  });

  describe("#replaceAdditionalLinesByALine", function() {
    it("should return an array with only one line instead of the additional lines", function() {
      const array = [1, 2, 3, 4, 5];
      const arrayWithAdditionalLinesReplaces = replaceAdditionalLinesByALine(
        array,
        3,
        9
      );
      const expectedArrayWithAdditionalLinesReplaces = [1, 2, 3, 9];

      assert.deepEqual(
        arrayWithAdditionalLinesReplaces,
        expectedArrayWithAdditionalLinesReplaces
      );
    });
  });
});

describe("Result formatting on client side", function() {
  describe("#roundAverageAgeOfEachRow()", function() {
    it("should return the same array but the average ages should be rounded", function() {
      const arrayOfKeyArrays = [
        { id: 1, avgAge: 36.256 },
        { id: 2, avgAge: 36.56 }
      ];
      const arrayWithAvgAgesRounded = roundAverageAgeOfEachRow(
        arrayOfKeyArrays
      );
      const expectedArrayWithAvgAgesRounded = [
        { id: 1, avgAge: 36 },
        { id: 2, avgAge: 37 }
      ];

      assert.deepEqual(
        arrayWithAvgAgesRounded,
        expectedArrayWithAvgAgesRounded
      );
    });
  });

  describe("#transformToArrayOfArrays()", function() {
    it("should return an array of arrays when it gets an array of key arrays", function() {
      const arrayOfKeyArrays = [
        { id: 1, color: "red" },
        { id: 2, color: "blue" },
        { id: 3, color: "yellow" }
      ];
      const arrayOfArrays = transformToArrayOfArrays(arrayOfKeyArrays);
      const expectedArrayOfArrays = [[1, "red"], [2, "blue"], [3, "yellow"]];

      assert.deepEqual(arrayOfArrays, expectedArrayOfArrays);
    });
  });

  describe("#addIndexWithinEachArray", function() {
    it("should add an index to each array of an array", function() {
      const arrayOfArraysWithoutIndex = [["red"], ["blue"], ["yellow"]];
      const arrayOfArrayWithIndex = addIndexWithinEachArray(
        arrayOfArraysWithoutIndex
      );
      const expectedArrayOfArraysWithIndex = [
        [1, "red"],
        [2, "blue"],
        [3, "yellow"]
      ];

      assert.deepEqual(arrayOfArrayWithIndex, expectedArrayOfArraysWithIndex);
    });
  });
});
