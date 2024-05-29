$(function() {
    // Global variables
    let city;
    let cityHistoryArray = [];
    const APIKey = 'f4f979a72193d95c0d7953820e958143';

    // jQuery DOM variables
    const cityInput = $('#searchbar');
    const searchForm = $('#search');
    const cityHistoryButtons = $('#history');
    const historyButton = $('#histbtn')
    const clearHistoryBtn = $('.clearhistbtn');
    const currentCityName = $('#cityName');
    const currentDate = $('#date');
    const currentTemp = $('#temp');
    const currentWind = $('#wind');
    const currentHumidity = $('#humid');

    // Function to handle form submission
    function searchSubmitHandler(event) {
        event.preventDefault();
        city = cityInput.val().trim();
        if (!city) {
            alert('Please enter a city');
        } else {
            fetchGeo(city);
        }
    }

    // Function to fetch geographical coordinates
    function fetchGeo(city) {
        const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`;

        // Fetch city's geo data
        fetch(geoURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    throw new Error('City not found');
                }
                const { lat, lon } = data[0];
                fetchWeatherData(lat, lon);
            })
            .catch(error => {
                alert('Error: ' + error.message);
            });
    };

    // Function to fetch current weather data
    function fetchWeatherData(lat, lon) {
        const weatherData = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${APIKey}&units=imperial`;

        // Fetch current weather data
        fetch(weatherData)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Data not found');
                }
                return response.json();
            })
            .then(data => {
                displayCurrentWeather(data);
                displayForecast(data);
                updateCityHistory(city);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }    


    // fetch(weatherData)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Current Weather Data:', data);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching current weather data:', error);
    // });


    // Function to display current weather data
    function displayCurrentWeather(data) {
        currentCityName.text(city);
        currentDate.text(dayjs().format('MM/DD/YYYY'));
        currentTemp.text(data.current.temp);
        currentWind.text(data.current.wind_speed);
        currentHumidity.text(data.current.humidity);
    }

    // Function to display five-day forecast
    function displayForecast(data) {

        // Clear previous forecast data
        $('#forecastContainer').empty();

        // Loop through forecast data for the next five days
        for (let i = 1; i <= 5; i++) {
            const date = new Date(data.daily[i].dt * 1000).toLocaleDateString();
            const temp = data.daily[i].temp.day;
            const windSpeed = data.daily[i].wind_speed;
            const humidity = data.daily[i].humidity;

            // Create HTML elements to display forecast data
            const forecastBlock = `
                <div class="card forecast-block">
                    <h3 class="has-text-dark has-text-weight-bold is-italic">${date}</h3>
                    <p>Temp: ${temp}&nbsp;<span class="has-text-weight-light">°F</span></p>
                    <p>Wind: ${windSpeed}&nbsp;<span class="has-text-weight-light">MPH</span></p>
                    <p>Humidity: ${humidity}&nbsp;<span class="has-text-weight-light">%</span></p>
                </div>
            `;

            // Append forecast item to the forecast container
            $('#forecastContainer').append(forecastBlock);
        }
    }

    // Function to update city search history
    function updateCityHistory(city) {
        if (!cityHistoryArray.includes(city)) {
            cityHistoryArray.unshift(city);
            if (cityHistoryArray.length > 8) {
                cityHistoryArray.pop();
            }
            localStorage.setItem('cityHistory', JSON.stringify(cityHistoryArray));
            displaySearchHistory();
        }
    }

    // Function to display search history
    function displaySearchHistory() {
        cityHistoryButtons.empty();
        cityHistoryArray.forEach(city => {
            cityHistoryButtons.append(`<button class="button is-rounded histbtn">${city}</button>`);
        });
        cityHistoryButtons.append(`<button class="button is-rounded clearhistbtn">Clear History</button>`);
    }

    // Function to clear city search history
    function clearCityHistory() {
        cityHistoryArray = [];
        localStorage.removeItem('cityHistory');
        displaySearchHistory();
    }

    // Event listener for form submission
    searchForm.on('submit', searchSubmitHandler);

    // Event listener for clearing search history
    clearHistoryBtn.on('click', clearCityHistory);
});
