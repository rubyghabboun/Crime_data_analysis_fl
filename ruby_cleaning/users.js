document.addEventListener('DOMContentLoaded', function () {
    // Create a search button with the header "Search for County Crime Distribution"
    var searchContainer = document.createElement('div');
    searchContainer.style.position = 'absolute';
    searchContainer.style.top = '45%';
    searchContainer.style.right = '50px';
    searchContainer.style.transform = 'translateY(-50%)';
    searchContainer.style.backgroundColor = '#fff';
    searchContainer.style.padding = '10px';
    searchContainer.style.border = '1px solid #ddd';


    var searchHeader = document.createElement('h2');
    searchHeader.textContent = 'Search for County Crime Distribution';
    searchContainer.appendChild(searchHeader);

    var searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Enter County Name';
    searchContainer.appendChild(searchInput);

    var searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
    searchButton.addEventListener('click', function () {
        var countyName = searchInput.value.trim();
        if (countyName !== '') {
            // Call function to show pie chart for the selected county
            showCrimePieChart(countyName);
        }
    });
    searchContainer.appendChild(searchButton);

    document.body.appendChild(searchContainer);
// Load CSV data using PapaParse
Papa.parse('../resources/filtered_data2.csv', {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function (result) {
        if (result.data && result.data.length > 0) {
            // CSV data loaded successfully
            window.crimeData = result.data;

            // Function to show pie chart for the selected county
            function showCrimePieChart(countyName) {
                // Rest of the code remains the same
                // ...
            }
        } else {
            alert('Error loading CSV data.');
        }
    }
});

    // Function to show pie chart for the selected county
    function showCrimePieChart(countyName) {
        console.log('Searching for county:', countyName);
    
        // Extract data for the selected county
        var lowerCountyName = countyName.toLowerCase();

        var selectedCountyData = crimeData.find(function (row) {
            return row.County.toLowerCase() === lowerCountyName;
        });

        console.log('Selected County Data:', selectedCountyData);
        // Check if data is found for the selected county
        if (selectedCountyData) {
            // Extract crime values for the pie chart
            var crimeValues = [
                selectedCountyData.Murder,
                selectedCountyData.Rape,
                selectedCountyData["Kidnap and Abduction"],
                selectedCountyData["Drug Arrest"],
                selectedCountyData["Aggravated Assault"],
                selectedCountyData.Theft
            ];
    
            // Create a pie chart using Chart.js
            var ctx = document.createElement('canvas').getContext('2d');
            var pieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ["Murder", "Rape", "Kidnap and Abduction", "Drug Arrest", "Aggravated Assault", "Theft"],
                    datasets: [{
                        data: crimeValues,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 159, 64, 0.7)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }
            });
    
            // Display the pie chart in a popup or any other desired way
            var pieChartPopup = document.createElement('div');
            pieChartPopup.appendChild(ctx.canvas);
            pieChartPopup.style.position = 'absolute';
            pieChartPopup.style.top = '52%';
            pieChartPopup.style.right = '100px';
            pieChartPopup.style.backgroundColor = '#fff';
            pieChartPopup.style.padding = '20px';
            pieChartPopup.style.border = '1px solid #ddd';
            pieChartPopup.style.width = '267px';   // Adjust width as needed for better visibility
            pieChartPopup.style.height = '300px';
            var closeButton = document.createElement('button');
            closeButton.textContent = 'Close';
            closeButton.addEventListener('click', function () {
                document.body.removeChild(pieChartPopup);
            });
            pieChartPopup.appendChild(closeButton);
            
            document.body.appendChild(pieChartPopup);
            
            document.body.appendChild(pieChartPopup);
            console.log('Data found. Creating pie chart...');
        } else {
            alert('Data not found for the selected county.');
        }
    }
});


///// findings box
