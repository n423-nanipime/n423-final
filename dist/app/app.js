import * as MODEL from "./model.js";

function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");

  if (pageID == "") {
    MODEL.changePage("home");
  } else {
    MODEL.changePage(pageID);
  }
}

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
