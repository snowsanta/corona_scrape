function make_data(array_of_arrays) {
  console.log("array_of_arrays ", array_of_arrays);
  var main = [];
  for (let [key, value] of Object.entries(array_of_arrays)) {
    var temp = value.split(",");
    temp.forEach((elem, i) => {
      if (!key) {
        main.push(new Array(elem));
      } else {
        main[i].push(elem);
      }
    });
  }
  console.log("data built");
  return main;
}

module.exports.make_data = make_data;
