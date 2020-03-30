function scrape(url) {
  return new Promise((resolve, reject) => {
    const request = require("request");
    const cheerio = require("cheerio");

    heads = [
      "Country",
      "Total_Cases",
      "New Cases",
      "Total_Deaths",
      "New Deaths",
      "Total_Recovered",
      "Active_Cases",
      "Critical",
      "Tot Cases/1M pop",
      "death/1Mpop",
      "init date"
    ];

    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        var fin = [];
        const $ = cheerio.load(html);

        $("tbody", "#main_table_countries_today")
          .children()
          .each((i, row) => {
            var arr = [];
            row.children.forEach(col => {
              if (col.name === "td") {
                arr.push(
                  $(col)
                    .text()
                    .replace(/,/, "")
                    .replace(/\n/, "")
                );
              }
            });
            fin.push(arr);
          });
        fin.sort(function(a, b) {
          return b[1] - a[1];
        });
        fin.shift();

        console.log("Scraping Done...");
        var main = {};
        for (let [key, value] of Object.entries(fin)) {
          value.forEach((elem, i) => {
            if (!parseInt(key)) {
              main[heads[i]] = new Array(
                elem.replace("  ", " ").replace(/\s\s+/g, " ")
              );
            } else {
              if (elem === "") {
                main[heads[i]].push("0");
              } else {
                main[heads[i]].push(
                  elem.replace(":", "").replace(/\s\s+/g, " ")
                );
              }
            }
          });
        }
        console.log("data built");
        resolve(main);
      }
    });
  });
}

// function make_data(array_of_arrays) {
//   console.log("array_of_arrays ", array_of_arrays);
//   var main = [];
//   for (let [key, value] of Object.entries(array_of_arrays)) {
//     var temp = value.split(",");
//     temp.forEach((elem, i) => {
//       if (!key) {
//         main.push(new Array(elem));
//       } else {
//         main[i].push(elem);
//       }
//     });
//   }
//   console.log("data built");
//   return main;
// }

module.exports.scrape = scrape;
