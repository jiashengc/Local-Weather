$(document).ready(function() {

  var isCorF = true;
  showlocation();
  var apikey = "48867986f2cadafd730e859acd007898";

  // Shows the client's location
  function showlocation() {
    $.get("http://ipinfo.io", function(response) {
      console.log(response.ip, response.country);

      var citytype = response.city;
      var countrytype = response.country;

      $(".location").append(citytype + ', ');
      $(".location").append(countrytype);
      
      showweather(response.loc);
      
    }, "jsonp");
  }

  // Shows the location's weather - temperature
  function showweather(location) {

    var temp_array = location.split(",");
    var lat = temp_array[0];
    var lon = temp_array[1];
    
    var weatherurl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + apikey;

    console.log(weatherurl);

    $.get(weatherurl, function(data) {

      var current_temp = (data.main.temp - 273.15).toPrecision(4).toString();
      var current_sky = data.weather[0].description;
      var current_wind = data.wind.speed;
      var current_wind_direction = data.wind.deg;

      $(".temperature").append(current_temp);
      $(".skytype").append(current_sky);
      $(".windspeed").append(current_wind + " m/s, " + current_wind_direction + "°");
      
      // Changes the background according to clouds
      if (current_sky == "broken clouds") {
        $('body').css('background-image', 'url(http://i.imgur.com/xlGvZM1.jpg)');
      }
      else if (current_sky == "overcast clouds") {
        $('body').css('background-image', 'url(http://i.imgur.com/c3DuIug.jpg)');
      }
      else if (current_sky == "Sky is Clear") {
        $('body').css('background-image', 'url(http://i.imgur.com/F2H5XIG.jpg)');
      }
      else {
        $('body').css('background-image', 'url(http://i.imgur.com/MFROFJz.jpg)');
      }
      
    }, "jsonp")
  }

  // Changes from °C to °K and vice versa
  $(".temperature").on("click", function() {
    if (isCorF === true) {
      var span_value = parseFloat($(this).text());
      span_value = span_value + 273.15;
      
      $(".temperature").empty();
      $(".CorF").empty();
      $(".CorF").append(document.createTextNode("°K"));
      $(".temperature").append(span_value.toPrecision(5).toString());
      isCorF = false;
    }
    else {
      var span_value = parseFloat($(this).text());
      span_value = span_value - 273.15;
      
      $(".temperature").empty();
      $(".CorF").empty();
      $(".CorF").append(document.createTextNode("°C"));
      $(".temperature").append(span_value.toPrecision(4).toString());
      isCorF = true;
    }
  });
  
});