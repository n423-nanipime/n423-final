// var key = "53599ec288054906a0a203018222908";
// var baseURL = "https://api.weatherapi.com/v1/";
var key = "0Gdnms7KBxC2oPRK57YHACVBMaowqnEZYzni2b09";
var baseURL = "https://api.nasa.gov/planetary/apod";

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
    }
  ).fail(function (e) {
    alert("Sorry, your data cannot be loaded at this time.");
  });
}

export function changePage(pageID, subPage) {
  if (subPage == undefined) {
    $.get(`pages/${pageID}/${pageID}.html`, function (data) {
      $("#app").html(data);
    }).fail((error) => {
      if (error.status == "404") {
      }
      console.log("error", error.status);
    });
  } else {
    $.get(`pages/${pageID}/${subPage}.html`, function (data) {
      $("#app").html(data);
    }).fail((error) => {
      if (error.status == "404") {
      }
      console.log("error", error.status);
    });
  }
}

export { getCurrentWeather };
