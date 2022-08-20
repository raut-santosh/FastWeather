// core modules import
const path = require("path");
// npm modules import
const express = require("express");
// loading hbs to configure partials which will allow us to load header and footer on every page
// we only need to load hbs for patioals
const hbs = require("hbs");
const request = require("request");
const axios = require("axios").default;

const app = express();

// console.log(__dirname);
// console.log(__filename);
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setting hbs templating engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// it will serve static folder no dynamic changes
app.use(express.static(publicDir));

// ip city logic
const ipUrl = "https://ipapi.co/json/";

// after using hbs
app.get("", (req, res) => {
  // let address = "jintur";
  let address = req.query.location;
  if (!address) {
    address = "jintur";
  }

  // axios
  //   .get(ipUrl)
  //   .then((result) => {
  //     let address = result.data.city;
  //     // getCity(result.data.city);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // async function getCity() {
  //   try {
  //     const response = await axios.get(ipUrl);
  //     console.log(response.data.city);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // getCity();

  // const getCity = (city) => (address = city);
  // logic start

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    encodeURIComponent(address) +
    "&appid=d70b68152c79ac87b7e33d63ec09b403&units=metric";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      // console.log(error)
      return (msg = "Unable to connect to weather services!");
    } else if (response.body.message) {
      return (msg = "Unable to get location please enter correct name. ");
    } else {
      // callback(
      //   undefined,
      //   "Current weather is : " + response.body.main.temp + " C"
      // );
      // res.send({
      //   msg: response.body.main.temp,
      // });
      const d = new Date();

      res.render("index", {
        location: response.body.name,
        temp: Math.trunc(response.body.main.temp),
        main: response.body.weather[0].main,
        humidity: response.body.main.humidity,
        wind: Math.trunc(response.body.wind.speed * 3.6),
        cloudy: response.body.clouds.all,
        description: response.body.weather[0].description,
        hour: d.getHours() % 12 || 12,
        min: ("0" + d.getMinutes()).slice(-2),
        day: d.toLocaleString("default", { weekday: "long" }),
        date: d.getDate(),
        month: d.toLocaleString("default", { month: "short" }),
        year: d.getFullYear(),
      });
    }
  });

  // logic end

  // res.render("index", {
  //   location: address,
  //   temp: msg,
  // });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "santosh",
    age: 21,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    help: "help you want",
  });
});

// defalut route for /
// app.get("", (req, res) => {
//   res.send("<h1> Hello world </h1>");
// });

// app.get("/about", (req, res) => {
//   res.send("<h2>about page</h2>");
// });

// app.get("/help", (req, res) => {
//   res.send("help page");
// });

// app.get("/weather", (req, res) => {
//   const location = req.query.location;
//   if (!location) {
//     return res.send({
//       error: "you must provide an address.",
//     });
//   }

//   const url =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     location +
//     "&appid=d70b68152c79ac87b7e33d63ec09b403&units=metric";

//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       // console.log(error)
//       callback("Unable to connect to weather services!", undefined);
//     } else if (response.body.message) {
//       callback("Unable to get location please enter correct name. ");
//     } else {
//       // callback(
//       //   undefined,
//       //   "Current weather is : " + response.body.main.temp + " C"
//       // );
//       res.send({
//         msg: response.body.main.temp,
//       });
//     }
//   });

// geocode(req.query.location, (error, { lattitude, longitude, location }) => {
//   if (error) {
//     return res.send({ error });
//   }
//   forcast(lattitude, longitude, (error, forecastData) => {
//     if (error) {
//       return res.send({ error });
//     }
//     res.send({
//       forcast: forecastData,
//       location,
//       address: req.query.location,
//     });
//   });
// });

// res.send({
//   city: "jintur",
//   weather: "cold",
//   celcius: 43,
// });
// });

app.get("*", (req, res) => {
  res.render("404", {
    msg: "Opps page not found",
  });
});

app.listen(3000, () => {
  console.log("server is started on port ", 3000);
});
