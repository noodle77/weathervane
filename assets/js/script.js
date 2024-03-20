const APIKey = "e18de5ad674d543e1ad47db7fa6946cd";
const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

var date = $("#date"),
    temperature = $("temp"),
    windSpeed = $("wind"),
    humidity = $("humid"),
    history = $("#history");

let updateDate = setInterval(showDate, 1),
    updateTime = setInterval(showTime, 1000);




function showDate() {
    let currentDate = dayjs().format('MM/DD/YYYY');
    date.text(currentDate);
}
              
function showTime() {
    let time = dayjs().format("h:mm A");
    $("#headerTime").text(time);
}
      



/* 

1. ** Search Functionality **
    - Capture the user's input from the search bar when the "Search" button is clicked.
    - Use this input to make a request to a weather API, such as OpenWeatherMap or Weatherstack.
    - Parse the response from the API to get the weather data for the searched location.

2. ** Display Weather Data **
    - Display the weather data in the appropriate elements on your page. For example, you could 
      display the temperature in the element with the id "temp", the wind speed in the element with 
      the id "wind", and so on.

3. ** 5-Day Forecast **
    - Use the API response to display a 5-day forecast. You might need to make a separate API 
      request for this data, depending on the API you're using.
    - Display each day's forecast in the appropriate "day" element (e.g., "dayone", "daytwo", etc.).

4. ** Search History **
    - Store the user's search history in local storage. Each time the user makes a search, add the 
      searched city to the beginning of the history array.
    - Display the search history as buttons. When a history button is clicked, make an API request 
      for that city and display the weather data.

5. ** Clear History **
    - When the "Clear History" button is clicked, clear the search history from local storage and 
      remove the history buttons from the page.

6. ** Styling and User Experience **
    - Add loading indicators while API requests are being made.
    - Handle any errors that might occur during the API requests and display appropriate error 
      messages to the user.
    - Make sure your application is responsive and looks good on all screen sizes.

    */