document.addEventListener('DOMContentLoaded', (event) => {
    console.log("Script loaded.");
    let csvData; // Declare csvData globally


const map = L.map('map').setView([27.6648, -81.5158], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Load CSV Data
function loadCSV(file, callback) {
    Papa.parse(file, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: callback
    });
}

// Load GeoJSON Data
function loadGeoJSON(file) {
    fetch(file)
        .then(response => response.json())
        .then(data => {
            // Load CSV Data
            loadCSV('../resources/filtered_data2.csv', function(result) {
                csvData = result.data;
                const circleLegend = L.control({ position: 'bottomleft' });

                circleLegend.onAdd = function(map) {
                    const div = L.DomUtil.create('div', 'info circle-legend');

                    // Create the legend box first to contain all elements
                    const legendBox = L.DomUtil.create('div', 'legend-box', div);
                    legendBox.style.backgroundColor = '#f0f0f0'; // Set background color

                    // Add legend title within the box
                    legendBox.innerHTML += '<h4>Total Arrests 2020 </h4>';

                    // Add circles and labels within the box
                    const colors = ['#00FF00', '#0000FF', '#FF0000'];
                    const labels = ['0 - 10,000', '10,000 - 20,000', 'more than 20,000 '];

                    for (let i = 0; i < colors.length; i++) {
                        legendBox.innerHTML +=
                            '<svg height="20" width="20"><circle cx="10" cy="10" r="8" stroke="black" stroke-width="1" fill="' + colors[i] + '" /></svg>' +
                            ' ' + labels[i] + '<br>';
                    }

                    return div;
                };

                circleLegend.addTo(map);

                L.geoJSON(data, {
                    style: function(feature) {
                        // Find corresponding data in CSV file based on county name
                        const countyData = csvData.find(item => item.County === feature.properties.name);

                        // Determine color based on total arrests
                        if (countyData) {
                            const totalArrests = countyData['Total Arrests'];
                            if (totalArrests > 20000) {
                                return { color: 'red' }; // High total arrests (red)
                            } else if (totalArrests > 10000) {
                                return { color: 'blue' }; // Medium total arrests (blue)
                            } else {
                                return { color: 'green' }; // Low total arrests (green)
                            }
                        }

                        return { color: 'gray' }; // Default color for counties with no data
                    },
                    onEachFeature: function(feature, layer) {
                        // Find corresponding data in CSV file based on county name
                        const countyData = csvData.find(item => item.County === feature.properties.name);

                        // Create pop-up content with CSV data
                        let popupContent = '<b>' + feature.properties.name + '</b>';
                        if (countyData) {
                            popupContent += '<br>Total Arrests: ' + countyData['Total Arrests'];
                            popupContent += '<br>Rape: ' + countyData.Rape;
                            popupContent += '<br>Kidnap and Abduction: ' + countyData['Kidnap and Abduction'];
                            popupContent += '<br>Drug Arrest: ' + countyData['Drug Arrest'];
                            popupContent += '<br>Aggravated Assault: ' + countyData['Aggravated Assault'];
                            popupContent += '<br>Theft: ' + countyData.Theft;

                            // Add gun icon if there is 1 or more murders
                            if (countyData.Murder >= 1) {
                                const gunIcon = new L.DivIcon({
                                    className: 'skull-icon',
                                    html: '<span style="font-size: 18px;">💀</span>'
                                });
                                L.marker(layer.getBounds().getCenter(), { icon: gunIcon }).addTo(map)
                                    .on('click', function() {
                                        // Display a popup with the number of murders
                                        const murderPopup = L.popup()
                                            .setLatLng(layer.getBounds().getCenter())
                                            .setContent('Number of Murders: ' + countyData.Murder)
                                            .openOn(map);
                                    });
                            }
                        }

                        layer.bindPopup(popupContent);
                        layer.bindTooltip(countyData ? countyData.County : 'No Data', { sticky: true });

                    }
                }).addTo(map);

                // Create and display charts on the bottom
                createChart('theftChart', 'Total Theft', csvData.map(item => item.County), 'Total Theft', csvData.map(item => item.Theft));
            });
        })
        .catch(error => console.error('Error loading GeoJSON:', error));
}



// Load GeoJSON file
loadGeoJSON('../resources/florida-with-county-boundaries_1091 (1).geojson');

console.log("Script loaded.");

function createChart(chartId, chartTitle, labels, datasetLabel, data) {
    const existingChart = document.getElementById(chartId);
    
    if (existingChart) {
        // If the chart already exists, remove it before creating a new one
        existingChart.parentNode.removeChild(existingChart);
    }

    const chartContainer = document.createElement('div');
    chartContainer.id = chartId;
    chartContainer.style.width = '1100px';
    chartContainer.style.height = '500px';
    chartContainer.style.margin = '50px';
    chartContainer.style.display = 'inline-block';

    const chartCanvas = document.createElement('canvas');
    chartCanvas.width = '1100';
    chartCanvas.height = '400';

    chartContainer.appendChild(chartCanvas);
    document.body.appendChild(chartContainer);

    const ctx = chartCanvas.getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: datasetLabel,
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        autoSkip: false, 
                        maxRotation: 90, 
                        minRotation: 0 
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



function createCombinedChart(chartId, chartTitle, labels, data) {
    const existingChart = document.getElementById(chartId);
    
   

    const chartContainer = document.createElement('div');
    chartContainer.id = chartId;
    chartContainer.style.width = '500px';
    chartContainer.style.height = '300px';
    chartContainer.style.margin = '30px';
    chartContainer.style.display = 'inline-block';

    const chartCanvas = document.createElement('canvas');
    chartCanvas.width = '500';
    chartCanvas.height = '300';

    chartContainer.appendChild(chartCanvas);
    document.body.appendChild(chartContainer);

   
}

const showJuvenileButton = document.createElement('button');
showJuvenileButton.innerText = 'Show Total Juvenile Arrests';
showJuvenileButton.style.position = 'absolute';
showJuvenileButton.style.top = '10px';
showJuvenileButton.style.right = '300px';
document.body.appendChild(showJuvenileButton);

const juvenileBox = document.createElement('div');
juvenileBox.style.position = 'absolute';
juvenileBox.style.top = '50px';
juvenileBox.style.right = '250px'; // Adjust this value as needed
juvenileBox.style.backgroundColor = 'lightgrey';
juvenileBox.style.padding = '10px';
juvenileBox.style.border = '10px solid #ccc';
juvenileBox.style.display = 'none';
juvenileBox.style.height = '200px';
juvenileBox.style.width = '200px';
juvenileBox.style.overflow = 'auto';
document.body.appendChild(juvenileBox);

// Step 3: Add an event listener to the button
showJuvenileButton.addEventListener('click', () => {
    // Step 4: Populate the box with information
    juvenileBox.innerHTML = '<h3>Total Juvenile Arrests by County</h3>';

    // Loop through your data and add information for each county
    csvData.forEach(item => {
        juvenileBox.innerHTML += `<p>${item.County}: ${item['Total Juvenile Arrests']}</p>`;
    });

    // Add search input and button
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search for a county';
    juvenileBox.appendChild(searchInput);

    const searchButton = document.createElement('button');
    searchButton.innerText = 'Search';
    juvenileBox.appendChild(searchButton);

    // Display the box
    juvenileBox.style.display = 'block';

    // Step 5: Add event listener to the search button
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase(); // Convert to lowercase for case-insensitive search

        // Filter the data based on the search term
        const filteredData = csvData.filter(item => item.County.toLowerCase().includes(searchTerm));

        // Update the box content with the filtered data
        juvenileBox.innerHTML = '<h3>Total Juvenile Arrests by County</h3>';

        // Loop through the filtered data and add information for each county
        filteredData.forEach(item => {
            juvenileBox.innerHTML += `<p>${item.County}: ${item['Total Juvenile Arrests']}</p>`;
        });
    });

    juvenileBox.insertBefore(searchButton, juvenileBox.firstChild);
juvenileBox.insertBefore(searchInput, juvenileBox.firstChild);
});








// adult arrests box and search

const showAdultButton = document.createElement('button');
showAdultButton.innerText = 'Show Total Adult Arrests';
showAdultButton.style.position = 'absolute';
showAdultButton.style.top = '10px';
showAdultButton.style.right = '50px';
document.body.appendChild(showAdultButton);

const AdultButton = document.createElement('div');
AdultButton.style.position = 'absolute';
AdultButton.style.top = '50px';
AdultButton.style.right = '10px'; // Adjust this value as needed
AdultButton.style.backgroundColor = 'lightgrey';
AdultButton.style.padding = '10px';
AdultButton.style.border = '10px solid #ccc';
AdultButton.style.display = 'none';
AdultButton.style.height = '200px';
AdultButton.style.width = '180px';
AdultButton.style.overflow = 'auto';
document.body.appendChild(AdultButton);

// Step 3: Add an event listener to the button
showAdultButton.addEventListener('click', () => {
    // Step 4: Populate the box with information
    AdultButton.innerHTML = '<h3>Total Adult Arrests by County</h3>';

    // Loop through your data and add information for each county
    csvData.forEach(item => {
        AdultButton.innerHTML += `<p>${item.County}: ${item['Total Adult Arrests']}</p>`;
    });

    // Add search input and button
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search for a county';
    AdultButton.appendChild(searchInput);

    const searchButton = document.createElement('button');
    searchButton.innerText = 'Search';
    AdultButton.appendChild(searchButton);

    // Display the box
    AdultButton.style.display = 'block';

    // Step 5: Add event listener to the search button
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase(); // Convert to lowercase for case-insensitive search

        // Filter the data based on the search term
        const filteredData = csvData.filter(item => item.County.toLowerCase().includes(searchTerm));

        // Update the box content with the filtered data
        AdultButton.innerHTML = '<h3>Total Adult Arrests by County</h3>';

        // Loop through the filtered data and add information for each county
        filteredData.forEach(item => {
            AdultButton.innerHTML += `<p>${item.County}: ${item['Total Adult Arrests']}</p>`;
        });
    });

    AdultButton.insertBefore(searchButton, AdultButton.firstChild);
    AdultButton.insertBefore(searchInput, AdultButton.firstChild);
});



console.log("Script loaded.");
});


/// TOMORROW TRY TO ADD ALL GENERAL INFO AND SPECIFIC INFO IN TWO DERODOWN MENUE AFTER TO SHOW EXACT WANTED CONTENT
// https://github.com/danielcs88/fl_geo_json/blob/master/fl-state.json
// change map size
// remove buttons make charts on the left side of the map,
// hover to see county
/// ask keith if search is a library
// let useres be able to filter certain data.. like show only green,......
// change my resource from
/// add another page with key findings