var key = "53599ec288054906a0a203018222908";
var baseURL = "https://api.weatherapi.com/v1/";

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  // getMonth returns integer from 0(January)
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const fullDate = `${year}-${month}-${day}`;
  console.log(fullDate);
  return fullDate;
}

function getCurrentWeather(location) {
  const currentDate = getCurrentDate();

  // // THIS is for getting and looping through the local data.json
  // $.getJSON("data/data.json", (data) => {
  //     for (let i = 0; i < data.length; i++) {
  //         const element = data[i];
  //         console.log(element.name);
  //         $("#app").append(`<p>${element.name}</p>`);
  //     }

  // }).fail(function(e) {
  //     alert("Sorry, your data cannot be loaded at this time.");
  // });

  // THIS is for retreiving api

  // &days=10&aqi=no&alerts=no
  $.get(
    `${baseURL}forecast.json?key=${key}&q=${location}&dt=${currentDate}&aqi=no&alerts=no`,
    (data) => {
      console.log(data);
      $("#app-results").html(
        `<h2>Current Weather</h2>` +
          `<p>Location: </p>` +
          data.location.name +
          `<p>Region: </p>` +
          data.location.region +
          "<br>" +
          `<p>Current Local Date: </p>` +
          data.location.localtime +
          "<br>" +
          `<p>Weather Condition: </p>` +
          data.current.condition.text +
          "<br>" +
          `<p>Current Temperature: </p>` +
          data.current.temp_f +
          `<p>Max. Temperature: </p>` +
          data.forecast.forecastday[0].day.maxtemp_f +
          `<p>Min. Temperature: </p>` +
          data.forecast.forecastday[0].day.mintemp_f +
          "°F" +
          "<br>" +
          `<p>Sunrise: </p>` +
          data.forecast.forecastday[0].astro.sunrise +
          `<p>Sunset: </p>` +
          data.forecast.forecastday[0].astro.sunset
      );
      // $("#app-results").html(
      //   "Forecast: " +
      //     JSON.stringify(data.forecast.forecastday(0).astro.sunrise)
      // );

      //$("#app").show();
    }
  ).fail(function (e) {
    alert("Sorry, your data cannot be loaded at this time.");
  });
}

export function changePage(pageID) {
  $.get(`pages/${pageID}.html`, function (data) {
    $("#app").html(data);
  }).fail((error) => {
    if (error.status == "404") {
    }
    console.log("error", error.status);
  });
}

export { getCurrentWeather };
