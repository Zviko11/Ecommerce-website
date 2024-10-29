import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn1vJUh4BBtmf9oA1teCa1VrGbNdvl1NA",
  authDomain: "smartgeekssolution2.firebaseapp.com",
  projectId: "smartgeekssolution2",
  storageBucket: "smartgeekssolution2.appspot.com",
  messagingSenderId: "930577800406",
  appId: "1:930577800406:web:01ff9647e3c826391abd77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get elements from the DOM
const submitButton = document.getElementById('submit');
const emailInput = document.getElementById('email');
const companyInput = document.getElementById('company');
const passwordInput = document.getElementById('password');

// Add event listener to the submit button
submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const company = companyInput.value;
  const password = passwordInput.value;

  // Create user with Firebase Authentication
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Account created successfully!");

      window.location.href = "login.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(`Error: ${errorMessage}`);
    });
});
