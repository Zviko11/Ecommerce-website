// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6ClTZ5QCvi6B6hbpY56AErt-9JGwrhU8",
  authDomain: "smart-geeks-solutions.firebaseapp.com",
  projectId: "smart-geeks-solutions",
  storageBucket: "smart-geeks-solutions.appspot.com",
  messagingSenderId: "284257629346",
  appId: "1:284257629346:web:3cc0e17bf8db949a3793fb",
  measurementId: "G-ZNS2HCGXZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Handle organization registration form
const orgRegisterForm = document.getElementById('orgRegisterForm');
orgRegisterForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const orgName = document.getElementById('orgName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const industry = document.getElementById('industry').value;
  const payment = document.getElementById('payment').value;

  // Save organization data to Firebase
  db.ref('organizations/' + orgName).set({
    orgName: orgName,
    email: email,
    phone: phone,
    industry: industry,
    paymentStatus: payment
  })
  .then(() => {
    alert('Organization registered successfully!');
  })
  .catch((error) => {
    console.error("Error registering organization: ", error);
  });

  function showDetails(name, category, description, contact, imageUrl) {
    document.getElementById('description').textContent = description;
    document.getElementById('contact').textContent = contact;
    
    const imageElement = document.getElementById('company-image');
    imageElement.src = imageUrl;
    imageElement.style.display = 'block';

    document.getElementById('company-details').style.display = 'block';
}

function filterCompanies() {
    const selectedCategory = document.getElementById('category').value.toLowerCase();
    const companies = document.querySelectorAll('.company');

    companies.forEach(company => {
        const companyCategory = company.querySelector('p').textContent.toLowerCase();

        if (selectedCategory === 'all' || companyCategory === selectedCategory) {
            company.style.display = 'block';  // Show the company
        } else {
            company.style.display = 'none';  // Hide the company
        }
    });
}

});