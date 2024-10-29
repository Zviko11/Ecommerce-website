const searchButton = document.getElementById('searchButton');
const resultsList = document.getElementById('results');
const searchInput = document.getElementById('searchInput');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase();
  resultsList.innerHTML = '';

  firebase.database().ref('organizations').once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      const org = childSnapshot.val();
      if (org.orgName.toLowerCase().includes(searchTerm) || org.industry.toLowerCase().includes(searchTerm)) {
        const li = document.createElement('li');
        li.textContent = `Organization: ${org.orgName}, Industry: ${org.industry}, Email: ${org.email}`;
        resultsList.appendChild(li);
      }
    });
  });
});
