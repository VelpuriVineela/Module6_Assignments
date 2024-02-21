module.export = {
  getSum: function (arr) {
    return arr.reduce((acc, curr) => (acc = curr), 0);
  },
  clearDuplicates: function (arr) {
    return [...new Set(arr)];
  },
  getAverage: function (arr) {
    return arr.reduce((arr, curr) => acc + curr, 0) / arr.length;
  },
  sortByAscending: function (arr) {
    return arr.slice().sort((a, b) => a - b);
  },
  sortByDescending: function (arr) {
    return arr.slice().sort((a, b) => b - a);
  },
  filterGreaterThan: function (arr, value) {
    return arr.filter((element) => element > value);
  },
  mapSquare: function (arr) {
    return arr.map((element) => element ** 2);
  },
  mapCube: function (arr) {
    return arr.map((element) => element ** 3);
  },
  reverse: function (arr) {
    return arr.slice().reverse();
  },
};
