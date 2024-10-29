document.addEventListener("DOMContentLoaded", () => {
    loadCompanies(); // Load existing companies when the page loads
});

let companies = []; // Store companies

// Save or edit company
function saveCompany(event) {
    event.preventDefault();
    
    const companyName = document.getElementById('companyName').value;
    const companyCategory = document.getElementById('companyCategory').value;
    const companyDescription = document.getElementById('companyDescription').value;
    const companyImage = document.getElementById('companyImage').value || 'default.jpg'; // Default image if none provided

    const newCompany = {
        id: companies.length + 1,
        name: companyName,
        category: companyCategory,
        description: companyDescription,
        imageUrl: companyImage
    };

    companies.push(newCompany); // Add new company to array
    displayCompanies(); // Update the list
    document.getElementById('company-form').reset(); // Reset the form
}

// Display companies
function displayCompanies() {
    const companiesDiv = document.getElementById('companies');
    companiesDiv.innerHTML = ''; // Clear previous entries
    
    companies.forEach(company => {
        const companyCard = document.createElement('div');
        companyCard.classList.add('company-card');
        
        companyCard.innerHTML = `
            <h3>${company.name}</h3>
            <p>Category: ${company.category}</p>
            <p>${company.description}</p>
            <img src="${company.imageUrl}" alt="${company.name}" style="width:100px;">
            <button onclick="editCompany(${company.id})">Edit</button>
            <button onclick="deleteCompany(${company.id})">Delete</button>
        `;
        
        companiesDiv.appendChild(companyCard);
    });
}

// Load companies (from local storage or server if needed)
function loadCompanies() {
    // Fetch existing companies from a backend or local storage here if applicable
    // For now, this will remain empty, and we'll rely on the array in memory
}

// Edit company
function editCompany(id) {
    const company = companies.find(comp => comp.id === id);
    if (company) {
        document.getElementById('companyName').value = company.name;
        document.getElementById('companyCategory').value = company.category;
        document.getElementById('companyDescription').value = company.description;
        document.getElementById('companyImage').value = company.imageUrl;

        // Remove old company and save the edited one
        companies = companies.filter(comp => comp.id !== id);
    }
}

// Delete company
function deleteCompany(id) {
    companies = companies.filter(comp => comp.id !== id);
    displayCompanies(); // Update the list
}


const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const uid = "6RIpaDid5meWlMxKMFAiF5lADau1"; 

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('Custom claims set for user:', uid); 
  })
  .catch((error) => {
    console.error('Error setting custom claims:', error);
  });


  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Get the ID token result which contains the user's custom claims
      user.getIdTokenResult()
        .then((idTokenResult) => {
          // Check if the user has the 'admin' claim
          if (idTokenResult.claims.admin) {
            // Redirect to admin dashboard
            window.location.href = 'admin.html'; 
          } else {
            // Redirect to user homepage or regular dashboard
            window.location.href = 'landingPage.html'; // Replace with your user homepage URL
          }
        })
        .catch((error) => {
          console.error('Error checking custom claims:', error);
        });
    } else {
      // No user is signed in, redirect to login page
      window.location.href = 'landingPage.html'; // Replace with your login page URL
    }
  });
  