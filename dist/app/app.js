import * as MODEL from "./model.js";

var obj = {
  Comments: [
    {
      name: "User One",
      comment: "Lorem ipsum.",
    },
  ],
};

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

function edit(inputID) {
  $("#app #comments #list #" + inputID).prop("disabled", false);
}

function updateCommentData(inputID) {
  //get value
  console.log(inputID);

  //change value of object in that array
  let commentsValue = $("#app #comments #list #" + inputID).val();

  // this is the array we will update obj.Students
  //find object in array
  let commentObj = obj.Comments[inputID];
  console.log("before name", commentObj);
  commentObj.name = commentsValue;
  console.log("after name", commentObj);

  //display new name in input

  $("#app #comments #list #" + inputID).prop("disabled", true);
}

function deleteCommentData(commentID) {
  // checks if right object
  let commentObj = obj.Comments[commentID];
  console.log(commentObj);

  // to remove something .splice() or .pop()
  obj.Comments.splice(commentID, 1);
  console.log(obj.Comments);
  loopData();
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
  addListeners();
}

function loopData() {
  $("#app #comments #list").html(``);
  $.each(obj.Comments, (idx, comment) => {
    $("#app #comments #list").append(
      `<input type="text" id="${idx}" value="${comment.name}" disabled="true"/><button onclick="edit(${idx})">Edit</button><button onclick="updateCommentData(${idx})">Save</button><button onclick="deleteCommentData(${idx})">Delete</button>`
    );
  });
}

function addListeners() {
  $("#app #addCommentSubmit").click((e) => {
    e.preventDefault();
    // below done in jquery
    let un = $("#userName").val();
    let cm = $("#comment").val();

    // or could write it within the push()
    let newCommentObj = {
      name: un,
      comment: cm,
    };

    obj.Comments.push(newCommentsObj);
    loopData();
  });
}

function getWeather(location) {
  console.log("weather " + location);
  MODEL.getCurrentWeather(location);
  $("#gwInput").val("");
}

$(document).ready(function () {
  initListeners();
  //addListeners();
  initApp();
  console.log("my obj", obj["Comments"]);
});

$(window).on("load", function () {
  MODEL.changePage("home");
});
