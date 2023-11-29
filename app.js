const apiKey = 'live_ernsSQkla2IjMgahv077u27ytmdElqoYsznq2xwLylnz14pQhiaLbjhWqcd1zhQ1';

function fetchData(breedName) {
    const apiUrl = `https://api.thedogapi.com/v1/breeds/${breedName}`;

    fetch(`${apiUrl}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        // Handle the retrieved data
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Add an input field for the user to enter the breed name
const inputElement = document.createElement('input');
inputElement.type = 'text';
inputElement.placeholder = 'Enter breed name';
document.body.appendChild(inputElement);

// Add a button to trigger the API call
const buttonElement = document.createElement('button');
buttonElement.textContent = 'Get Breed Information';
buttonElement.addEventListener('click', function() {
    const breedName = inputElement.value.trim();
    if (breedName) {
        fetchData(breedName);
    } else {
        console.error('Please enter a valid breed name.');
    }
});
document.body.appendChild(buttonElement);