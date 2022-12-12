import * as MODEL from "./model.js";

function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  let pageIDArray = pageID.split("/");
  pageID = pageIDArray[0];
  let subPageID = pageIDArray[1];

  if (pageID == "") {
    MODEL.changePage("home");
  } else {
    if (pageID == subPageID) {
      MODEL.changePage(pageID);
    } else {
      MODEL.changePage(pageID, subPageID);
    }
  }
}

// function getDate() {
//   return document.getElementById("dateSearch").ariaValueMax;
// }

// async function call() {
//   let request = "";
//   fetch("../secrets.json")
//     .then((response) => {
//       return response.json();
//     })
//     .then(async function (myJSON) {
//       request =
//         `https://api.nasa.gov/planetary/apod?date=` +
//         getDate() +
//         `&api_key=` +
//         myJSON.api_key;
//       await fetch(request)
//         .then(function (response) {
//           return response.json();
//         })
//         .then(function (myJSON) {
//           // descrip
//           let p = document.getElementById("description");
//           p.innerHTML = myJSON.explanation;

//           // img
//           let img = document.getElementById("spacePic");
//           img.src = myJSON.url;
//         });
//     });
// }

function initListeners() {
  //MODEL.getAllNames();

  $("#gw").click((e) => {
    const location = $("#gwInput").val();
    if (location != "") {
      getWeather(location);
    } else {
      alert("You need to put a location in first!");
    }
  });
}

function initApp() {
  $(window).on("hashchange", route);
  loopData();
}

function loopData() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");

  var pages = document.getElementById("app");

  $(pages).html(MODEL.changePage(pageID));
}

function getWeather(location) {
  console.log("weather " + location);
  MODEL.getCurrentWeather(location);
  $("#gwInput").val("");
}

$(document).ready(function () {
  initListeners();
  initApp();
});

$(window).on("load", function () {
  MODEL.changePage("home");
});
