//wrap entire code in DOMContentLoaded event listener to run code after DOM is fully loaded
// document.addEventListener("DOMContentLoaded", function() {
//     //declare dog API and key
//     let searchBar = document.getElementById("search");
//     let submitButton = document.querySelector("#submit");
//     let resultContainer = document.getElementById("result-container");
                            
    // submitButton.addEventListener("click", function() {
    //     // Get the value from the search bar
    //     let searchTerm = searchBar.value;

        // Make the API request using the entered search term
        // });
    // })
        // Function to display the API results
        // function displayResults(data) {
        //     // Clear previous results
        //     resultContainer.empty();
        //     e.preventDefault();
        //     // Display each result in a new div
        //     data.forEach(breed => {
        //         var newDiv = document.createElement("div");
        //         newDiv.textContent = breed.name;
        //         resultContainer.appendChild(newDiv);
        //     });
        // }
    // });

//*****START FROM SCRATCH WITH API WITHOUT A KEY. WE LOVE APIs */
document.addEventListener("DOMContentLoaded", function() {
    
    //declare variables for API, button, and result container
    let submitButton = document.getElementById("submit");
    // console.log(submitButton);
    let resultContainer = document.getElementById("result-container");
    let apiUrl = 'https://dog-api.kinduff.com/api/facts';
    let apiUrl2 = 'https://dog.ceo/api/breeds/image/random';
    
    
    //function to display data
    function displayResults(fact, img){
        //clear previous results
        // resultContainer.empty();
        
        //display result in new div
        let factDiv = document.createElement("div");
        factDiv.textContent = fact;
        resultContainer.appendChild(factDiv);
        
        let dogImg = document.createElement("img")
        dogImg.setAttribute("src", img);
        resultContainer.appendChild(dogImg)
    }
    
    // $.get(apiUrl, (data) => {
    //         console.log(data.facts[0]);
    //     })
        
    // $.get(apiUrl2, (img) => {
    //         console.log(img.message);
    //     })
        // Event listener for submit button
        submitButton.addEventListener("click", function() {
            event.preventDefault();
            // Fetch data from both APIs
            $.get(apiUrl, (data) => {

                console.log('data');
                $.get(apiUrl2, (img) => {
                    displayResults(data.facts[0], img.message);
                })
            })
            // Display the results
        });
});