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
//wait for all DOM to load before page loads
document.addEventListener("DOMContentLoaded", function() {
    let submitButton = document.getElementById("submit");
    let resultContainer = document.getElementById("result-container");
    let apiUrl = 'https://dog-api.kinduff.com/api/facts';
    let apiUrl2 = 'https://dog.ceo/api/breeds/image/random';
    let question = document.querySelector('h2');

    // Initialize chart data
    let votes = {
        'Love It': 0,
        'Evil Human': 0
    };

    // Flag to track whether buttons have been added
    let buttonsAndImagesAdded = false;

    // Create chart for voting
    const data = {
        labels: Object.keys(votes),
        datasets: [{
            text: 'Must Love Dogs',
            fontSize: 18,
            data: Object.values(votes),
            backgroundColor: [
                'rgb(74, 88, 166)',
                'rgb(245, 222, 179)',
            ],
            hoverOffset: 4
        }]
    };

    // Add vote buttons to the voteButtons div
    let loveItButton = document.createElement("button");
    loveItButton.textContent = 'Love it! Would click again!';
    loveItButton.addEventListener('click', function () {
        vote('Love It');
    });

    let loveItImage = document.createElement("img");
    loveItImage.src = 'https://i.pinimg.com/474x/da/33/bf/da33bf3804ffc85de1bb9e3ed2aa0843.jpg'

    let evilHumanButton = document.createElement("button");
    evilHumanButton.textContent = "Not interested, boring, or evil human that doesn't like dogs.";
    evilHumanButton.addEventListener('click', function () {
        vote('Evil Human');
    });

    let evilHumanImage = document.createElement("img");
    evilHumanImage.src = 'https://media.istockphoto.com/id/148421550/vector/bored-emoticon.jpg?s=612x612&w=0&k=20&c=uo5KBTqdJZbBQb_Xldhzuovx5t08fHfGR7dw7TCk90I='

    document.querySelector('.voteButtons').appendChild(loveItButton);
    document.querySelector('.voteButtons').appendChild(loveItImage);
    document.querySelector('.voteButtons').appendChild(evilHumanButton);
    document.querySelector('.voteButtons').appendChild(evilHumanImage);

    function displayResults(fact, img) {
        // Clear previous results
        resultContainer.innerHTML = "";

        // Display result in new div
        let factDiv = document.createElement("div");
        factDiv.textContent = fact;
        factDiv.classList.add('random-dog-fact'); 
        resultContainer.appendChild(factDiv);

        let dogImg = document.createElement("img");
        dogImg.setAttribute("src", img);
        resultContainer.appendChild(dogImg);

        // Show the vote buttons after displaying results for the first time
        if (!buttonsAndImagesAdded) {
            question.style.display = 'block';
            document.querySelector('.voteButtons').style.display = 'block';
            buttonsAndImagesAdded = true;
        }

        updatePieChart();
    }

    function updatePieChart() {
        const canvas = document.getElementById('voteChart');
        const ctx = canvas.getContext('2d');
        data.datasets[0].data = Object.values(votes);

        // Check if the chart instance already exists and destroy it
        if (window.myPieChart) {
            window.myPieChart.destroy();
        }

        // Create a new pie chart
        window.myPieChart = new Chart(ctx, {
            type: 'pie',
            data: data,
        });

        canvas.style.display = 'block';
    }

    function vote(choice) {
        votes[choice]++;
        updatePieChart();
    }

    submitButton.addEventListener("click", function(e) {
        e.preventDefault();
        // Fetch data from both APIs
        $.get(apiUrl, (data) => {
            $.get(apiUrl2, (img) => {
                // Display the results
                displayResults(data.facts[0], img.message);
            });
        });
    });
});
