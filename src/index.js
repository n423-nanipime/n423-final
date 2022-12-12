//can also be called app.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  queryEqual,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyBD7PgAxx-lxDFxSwpoXxf9jaS5WKLXuCE",
  authDomain: "n423-npg.firebaseapp.com",
  projectId: "n423-npg",
  storageBucket: "n423-npg.appspot.com",
  messagingSenderId: "1059714302983",
  appId: "1:1059714302983:web:b5b9f34703c166c96f56a2",
  measurementId: "G-9MLWMY0BM4",
});

const auth = getAuth(firebaseConfig);
const db = getFirestore(firebaseConfig);

var currentEditUser;
var logInBtn = document.getElementById("login");
var logOutBtn = document.getElementById("logout");
var addUserBtn = document.getElementById("addUser");
var getAllDataBtn = document.getElementById("getAllData");
var getAllDataTwoBtn = document.getElementById("getAllDataTwo");
var queryBtn = document.getElementById("searchBtn");
var googleBtn = document.getElementById("googleBtn");

// // add a document
// const docRef = await addDoc(collection(db, "comments"), {
//   name: "Comment One",
//   message: "Hello. Interesting.",
// });
// console.log("Document written with ID: ", docRef.id);

// // update document
// const comment2Ref = doc(db, "comments", "Comment Two");

// await updateDoc(comment2Ref, {
//   message: true,
// });

// // delete document
// await deleteDoc(doc(db, "comments", "Comment Two"));

function signInWithGoogle() {
  const auth = getAuth();
  const gProvider = new GoogleAuthProvider();
  signInWithPopup(auth, gProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.log("error ", error);
    });
}

function login() {
  signInAnonymously(auth)
    .then(() => {
      console.log("signed in");
    })
    .catch((error) => {
      console.log(error.code);
    });
}

function logout() {
  signOut(auth).then(() => {
    console.log("signed out");
  });
}

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("logged in");
    //addData();
  } else {
    console.log("no user");
  }
});

function addUserToDB() {
  console.log("add user");
  let fName = document.getElementById("fName").value.toLowerCase();
  let lName = document.getElementById("lName").value.toLowerCase();
  let em = document.getElementById("email").value;
  let pass = document.getElementById("password").value;
  let person = {
    firstName: fName,
    lastName: lName,
    email: em,
    password: pass,
  };
  addData(person);
}

async function addData(person) {
  try {
    const docRef = await addDoc(collection(db, "People"), person);
    // {
    //       first: "Nathalie",
    //       last: "Pimentel-Gil",
    //       grade: "A",
    //     }
    console.log("Doc id: ", docRef.id);
  } catch (e) {
    console.log(e);
  }
}

async function addEditSaveListener() {
  $("#edit").on("click", (e) => {
    console.log("edit");
    $("#data input").prop("disabled", false);
  });
  $("#save").on("click", (e) => {
    // console.log("save");
    updateUser();
  });
  $("#delete").on("click", (e) => {
    // console.log("save");
    deleteUser();
  });
}

async function deleteUser() {
  await deleteDoc(doc(db, "People", currentEditUser));
  $("#data").html("");
  getAllData();
}

async function updateUser() {
  const userRef = doc(db, "People", currentEditUser);
  let fn = document.getElementById("userFN").value.toLowerCase();
  let ln = document.getElementById("userLN").value.toLowerCase();
  let em = document.getElementById("email").value;

  await updateDoc(userRef, {
    firstName: fn,
    lastName: ln,
    email: em,
  });
  getUser(currentEditUser);
}

async function getUser(userId) {
  const docRef = doc(db, "People", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    currentEditUser = userId;
    console.log("doc", docSnap.data());
    let user = docSnap.data();
    $("#data").html(
      `<input class="name" type="text" id="userFN" value="${user.firstName}" disabled /> <input class="name" type="text" id="userLN" value="${user.lastName}" disabled /> <input type="text" id="email" value="${user.email}" disabled />
      <button id="edit">Edit</button>
      <button id="save">Save</button>
      <button id="delete">Delete</button>`
    );

    addEditSaveListener();
    getAllData();
  } else {
    console.log("no document");
  }
}

function addUserEditBtnListener() {
  $("#allData button").on("click", (e) => {
    console.log(e.currentTarget.id);
    getUser(e.currentTarget.id);
  });
}

async function getAllDataAlso() {
  const unsub = onSnapshot(doc(db, "People", "FkMFR2YeteQoTyJWjzAj"), (doc) => {
    console.log("User ", doc.data());
    let user = doc.data();
    $("#singleUserData #data").html(`
    <p class="name">${user.firstName}</p>`);
  });
}

async function getAllData() {
  $("#allData").html("");
  const querySnapshot = await getDocs(collection(db, "People"));
  querySnapshot.forEach((doc) => {
    $("#allData").append(`<div>
      <p class="name">${doc.data().firstName}</p>
      <p class="name">${doc.data().lastName}</p>
      <p>${doc.data().email}</p>
      <button id="${doc.id}">Get User</button>
      </div>`);
    // console.log(doc.id + " ", doc.data());
  });

  addUserEditBtnListener();
}

async function queryData() {
  const searchLetter = $("#sLetter").val();
  if (searchLetter != "") {
    console.log("search ", searchLetter);
    const q = query(
      collection(db, "People"),
      where("firstName", ">=", searchLetter),
      where("firstName", "<=", searchLetter + "\uf8ff")
    );
    console.log(q);
    const querySnapshot = await getDocs(q);
    $("#queryData").html("");
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      $("#queryData").append(
        `<p class="name">${doc.data().firstName} <span class="name">${
          doc.data().lastName
        }</span></p>`
      );
    });
  } else {
    alert("You need to put a letter in the search box!");
  }

  // const subscribe = onSnapshot(q, (snapShot) => {
  //   snapShot.docChanges().forEach((change) => {});
  // });
}
