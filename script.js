const express = require("express");
const exphbs = require("express-handlebars");
const favicon = require("express-favicon");
const path = require("path");
const scraping_module = require("./scraping_module");

var app = express();

var hbs = exphbs.create({});

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(favicon(__dirname + "/favicon.png"));

hbs.handlebars.registerHelper("escape", function(variable) {
  return variable.replace(/(['"])/g, "\\$1");
});

app.get("/", function(req, res) {
  scraping_module
    .scrape("https://www.worldometers.info/coronavirus/")
    .then(result => {
      res.render("home", {
        bar_data: result
      });
    });
});
app.listen(3000);
