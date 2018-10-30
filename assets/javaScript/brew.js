$(document).ready(function () {
  var config = {
      apiKey: "AIzaSyAUo4yqSzNjCfAdx9tGPN3HtgnAmb4zDbk",
      authDomain: "brewfinder-da560.firebaseapp.com",
      databaseURL: "https://brewfinder-da560.firebaseio.com",
      projectId: "brewfinder-da560",
      storageBucket: "brewfinder-da560.appspot.com",
      messagingSenderId: "839326870516"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

  var zip = []
  var zipcode = 0

    var zip= $("#zipCode").val().trim()


  $("#submit-button").click(function (event) {
    event.preventDefault()
    zip = $("#zipCode").val().trim();

    // console.log(zip) 

    database.ref().push({
    zip: zip
  })

})
});
// end firebase

// linking the zip when it's entered
$('#submit-button').on('click', function () {
  // console.log("#submit-button");
  var input = $('#zipCode').val().trim();
  // console.log(input);
  var Zip = $('#zipCode').val().trim();
  // console.log(Zip);

  //  Weather API
  var weatherAPI = "7f2360e2ae279def0b500b9f28054641";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + Zip + "&units=imperial&appid=" + weatherAPI;


  // AJAX call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // console.log(queryURL);
    // console.log(response);

    $(".city").html("<h2>" + response.name + " Temperature</h2>");
    $(".temp").text(response.main.temp + " ˚F");
    // console.log("Temperature (F):" + response.main.temp);

  })
});

$("#submit-button").on("click", function () {
  getLatLngByZipcode();
  callback();
});

function getLatLngByZipcode(zipcode) {
  var geocoder = new google.maps.Geocoder();
  var input = $("#zipCode");
  var Zip = input[0].value;
  geocoder.geocode({ 'address': Zip }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      // alert("Latitude: " + latitude + "\nLongitude: " + longitude);
      var city = { lat: latitude, lng: longitude };
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude },
        zoom: 11
      });
      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: { lat: latitude, lng: longitude },
        radius: 20000,
        keyword: ["brewery"],
        // type: ['bar']
      },
        callback
      );
    };
  });
};

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createFlag(results[i]);
    }

    function createFlag(place) {
      // var place= { lat: $(latitude), lng: $(longitude) };
      var placeLocation = place.geometry.location;
      // console.log(placeLocation);
      // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
      // var image= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW1zLV_j4x6DxYE3Syk7k022zZF-V_iCjpQM2uoT-YTKzskYBFtQ"
      var image = "https://png.icons8.com/ios/50/000000/beer.png"; var flag = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: image
      });

      google.maps.event.addListener(flag, 'click', function () {
        placeName = place.name;
        placeAddy = place.vicinity;
        placeRating = place.rating;
        // open=place.opening_hours.open_now;
        allInfo = "Name: " + placeName + '<br>' + "Address: " + placeAddy + '<br>' + "Rating: " + placeRating + "/5";
        // console.log(allInfo);
        infowindow.setContent(allInfo);
        infowindow.open(map, this);
      });
    }
  }
}
