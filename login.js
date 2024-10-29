import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

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
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

// Add event listener to the form
loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form from submitting the default way

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Basic validation (Optional but recommended)
  if (!validateEmail(email)) {
    errorMessage.textContent = "Please enter a valid email address.";
    return;
  }

  if (password.length < 6) {
    errorMessage.textContent = "Password should be at least 6 characters.";
    return;
  }

  // Sign in user with Firebase Authentication
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in successfully
      alert("Logged in successfully!");

      // Check if the user is an admin
      if (email === "admin@gmail.com") {
        window.location.href = "admin-dashboard.html"; // Redirect to admin dashboard
      } else {
        window.location.href = "pricing.html"; // Redirect for normal users
      }
    })
    .catch((error) => {
      // Handle errors here
      const errorCode = error.code;
      let errorMessageText = "An error occurred. Please try again.";

      // Custom error messages for specific error codes
      switch (errorCode) {
        case 'auth/wrong-password':
          errorMessageText = "Incorrect password. Please try again.";
          break;
        case 'auth/user-not-found':
          errorMessageText = "No user found with this email.";
          break;
        case 'auth/invalid-email':
          errorMessageText = "Invalid email format.";
          break;
        default:
          errorMessageText = error.message;
      }

      // Display the error message in the HTML
      errorMessage.textContent = `Error: ${errorMessageText}`;
    });
});

// Helper function to validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
