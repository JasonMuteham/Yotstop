
var MAP_DATA = window.MAP_DATA;
var infoWindow;
var map;
var markers = [];
var markerCluster;
var features;
var iconBase = 'icons/';
var icons = {
  moor: {
    icon: iconBase + 'marina.png'
  },
  moorEnhanced: {
    icon: iconBase + 'marina-en.png'
  },
  anchor: {
    icon: iconBase + 'anchor.png'
  },
  anchorEnhanced: {
    icon: iconBase + 'anchor-en.png'
  },
  info: {
    icon: iconBase + 'info.png'
  },
  infoEnhanced: {
    icon: iconBase + 'info-en.png'
  },
  sailing: {
    icon: iconBase + 'sailing.png'
  },
  sailingEnhanced: {
    icon: iconBase + 'sailing-en.png'
  }
};


firebase.initializeApp({
  apiKey: "AIzaSyArhLbX05ll-bTM_WrvrPgpnsQtFWLPZlg",
  authDomain: "yotstop-1512497608857.firebaseapp.com",
  databaseURL: "https://yotstop-1512497608857.firebaseio.com",
  projectId: "yotstop-1512497608857",
  storageBucket: "yotstop-1512497608857.appspot.com",
});





// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

var data = {
  sender: null,
  timestamp: null,

  position: null,
  type: null,
  title: null,
  position: null,
  description: null
};

function MainTitle(titleDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');

  controlUI.style.cursor = 'pointer';
  controlUI.style.marginTop = '10px';
  controlUI.style.textAlign = 'center';

  titleDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var titleText = document.createElement('div');
  titleText.style.color = 'white';
  titleText.style.textShadow = '2px 3px 3px rgba(0,0,0,0.2)';
  titleText.style.fontFamily = 'Zilla Slab';
  titleText.style.fontSize = '2.5em';
  titleText.style.letterSpacing = '.1em';
  titleText.style.lineHeight = '38px';
  titleText.style.paddingLeft = '5px';
  titleText.style.paddingRight = '5px';
  titleText.innerHTML = ` <span class="valign-wrapper noselect text-shadow">
  <img id="nav-logo-img" class = "circle-shadow" src="/icons/res/mipmap-hdpi/ic_launcher_yotstop.png">OTSTOP
</span>`;
  controlUI.appendChild(titleText);

  controlUI.addEventListener('click', function () {
    window.location.href = "index.html";
  });

}

function FABControl(FABDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginRight = '10px';
  controlUI.style.marginTop = '10px';

  FABDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var FABText = document.createElement('div');
  FABText.style.color = 'white';

  FABText.innerHTML = `<div class="fixed-action-btn click-to-toggle ">
    <a class="btn-floating btn-large light-blue waves-effect waves-dark  lighten-2 z-depth-4">
      <i class="material-icons">menu</i>
    </a>
    <ul>
      <li><a id= "gps-icon" class="btn-floating red z-depth-4" onClick="getLocation()"><i class="material-icons tiny">gps_not_fixed</i></a></li>
      <li><a class="btn-floating light-blue lighten-2 z-depth-4" ><i class="material-icons tiny">search</i></a></li>
      <li><a class="btn-floating red z-depth-4 "><i class="material-icons tiny">add</i></a></li>
      <li><a id = "login-icon" class="btn-floating red z-depth-4 pulse" onClick="login()"><i class="material-icons tiny">person_outline</i></a></li>
    </ul>
  </div>`;


  controlUI.appendChild(FABText);

}

function login() {
  var loginIcon = document.getElementById("login-icon");
  loginIcon.classList.remove("red");
  loginIcon.classList.add("light-blue");
  loginIcon.classList.add("lighten-2");
  loginIcon.classList.toggle("pulse");
}

function initMap() {

  // Create the map
  map = new google.maps.Map(document.getElementsByClassName('map')[0], {
    zoom: MAP_DATA.settings.zoom,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    mapTypeId: "hybrid",
    streetViewControl: false,
    center: MAP_DATA.settings.mapCenter,
    mapTypeControl: false,
    gestureHandling: "greedy",
    fullscreenControl: false,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    disableDoubleClickZoom: true,
    styles: [
      {
        "featureType": "administrative",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "landscape",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.government",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.place_of_worship",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.school",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.sports_complex",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "water",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      }
    ]

  });

  // Create the DIV to hold the control and call the mainTitle()
  // constructor passing in this DIV.
  var titleDiv = document.createElement('div');
  var mainTitle = new MainTitle(titleDiv, map);

  titleDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(titleDiv);

  var FABDiv = document.createElement('div');
  var FABCtrl = new FABControl(FABDiv, map);

  FABDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(FABDiv);

  map.addListener("mousemove", function () {
    infoWindow.close(map);
  });

  if (MAP_DATA.settings.debugger) {
    map.addListener('click', function (e) {
      var lat = e.latLng.lat();
      var lng = e.latLng.lng();
      var pos = {
        lat: lat,
        lng: lng
      }
      data.position = pos;

      var content = `"position": { lat: ` + lat + `, lng: ` + lng + ` }`;
      console.log(content);
      console.log(data);



      marker = new google.maps.Marker({
        position: pos,
        map: map
      });

      markers.push(marker);
      google.maps.event.addListener(marker, 'click', function () {
        dataModalOn();
      });


    });

  }




  features = MAP_DATA.features;

  infoWindow = new google.maps.InfoWindow();
  markerCluster = new MarkerClusterer(map, markers,
    { imagePath: 'icons/m' });

  loadMarkers();


  //  markerCluster = new MarkerClusterer(map, markers,
  //   { imagePath: 'icons/m' });

}
var vrModal = document.getElementById('vr-modal');
var dataEntryModal = document.getElementById('data-entry-modal');

// Get the <span> element that closes the modal
var vrClose = document.getElementById("vrClose");
var dataClose = document.getElementById("dataClose");

// When the user clicks the button, open the modal 
function vrModalOn() {
  vrModal.style.display = "block";
  $('.button-collapse').sideNav('hide');
}

function dataModalOn() {
  dataEntryModal.style.display = "block";

}

// When the user clicks on <span> (x), close the modal
vrClose.onclick = function () {
  vrModal.style.display = "none";
}

dataClose.onclick = function () {
  dataEntryModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == vrModal) {
    vrModal.style.display = "none";
  } else if (event.target == dataEntryModal) {
    dataEntryModal.style.display = "none";
  }
}



function getLocation() {
  //Start of Location code 

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var gpsIcon = document.getElementById("gps-icon");
      gpsIcon.classList.remove("red");
      gpsIcon.classList.add("light-blue");
      gpsIcon.classList.add("lighten-2");
      infoWindow.setPosition(pos);
      infoWindow.setContent('You');
      infoWindow.open(map);
      map.panTo(pos);
      map.setZoom(15);
      // map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function saveData() {
  data.title = document.getElementById("data-title").value;

  data.description = document.getElementById("data-description").value;
  data.type = document.getElementById("data-type").value;
  dataEntryModal.style.display = "none";
  data.timestamp = Date.now();
  console.log(data);
  db.collection("markers").add(data)
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
  deleteMarkers();
  loadMarkers();
}

function loadMarkers() {
  //createMarker(loadDataBase());
  loadDataBase();

  features.forEach(function (feature) {
    createMarker(feature);
  });
}

function createMarker(feature) {
  // features.forEach(function (feature) {

  var tmpType = feature.type;
  if (tmpType == undefined || tmpType == null) {
    tmpType = "info";
  }
  if (!icons.hasOwnProperty(tmpType)) {
    tmpType = "info";
  }
  if (feature.enhanced !== undefined) {
    tmpType += "Enhanced";
  }
  var marker = new google.maps.Marker({
    title: feature.title,
    position: feature.position,
    icon: icons[tmpType].icon,
    map: map
  });

  markers.push(marker);

  marker.addListener('mouseover', function () {
    var content = "<div class = 'center-align'><div><strong>"+feature.title+"</strong></div>";
    var imageClass = "mouseover-img responsive-img";
    if (feature.images !== undefined) {
      var imgPath = MAP_DATA.settings.imagePath + MAP_DATA.settings.preview + feature.images[0];
      image = `<img class = "` + imageClass + `" src = "` + imgPath + '" >';
      content += image;
    }
    content += "</div>";
    infoWindow.setContent(content);
    infoWindow.open(map, marker);
  });

  marker.addListener('click', function () {
    infoWindow.close(map, marker);
    var name = feature.title;
    var description = feature.description;
    var content = "";
    var image = "";
    var imageVR = ""
    var url = "";
    var imageClass = "info-window-img responsive-img z-depth-2";
    var imageVRClass = "info-window-img z-depth-2";
    var closeIcon = `<span class="close" onclick=" $('.button-collapse').sideNav('hide');"> <i class="material-icons white-text">arrow_back</i></span>`;

    content += name;


    if (feature.VRUrl !== undefined) {
      var imgPath = MAP_DATA.settings.imagePath + MAP_DATA.settings.preview + feature.vrPreviewImage;
      imageVR = `<img class = "` + imageVRClass + `" style = "cursor:pointer;" onclick = "vrModalOn()" src = "` + imgPath + '" >';
      var vr = document.getElementById('vr');
      vr.src = feature.VRUrl;
    }


    if (feature.images !== undefined) {
      var imgPath = MAP_DATA.settings.imagePath + MAP_DATA.settings.preview + feature.images[0];
      image = `<img class = "` + imageClass + `" src = "` + imgPath + '" >';
    }



    if (feature.url !== undefined) {
      url = "<div><a href = '" + feature.url + "' target = '_blank'>wikipedia</a></div>";
    }

    var sideNav = document.getElementById("slide-out");

    sideNav.innerHTML = "<div id='nav-close-icon'>" + closeIcon + "</div><li><h5 class='nav-title z-depth-2'>" + content + "</h5></li>";

    if (imageVR !== "") {
      sideNav.innerHTML += "<li>" + imageVR + "</li>";
    }

    sideNav.innerHTML += "<li>" + image + "</li>";

    // sideNav.innerHTML += '<li><div class="divider"></div></li>';

    sideNav.innerHTML += "<li><div class= 'nav-description z-depth-2'>" + description + "</div></li>";

    // sideNav.innerHTML += '<li><div class="divider"></div></li>';



    sideNav.innerHTML += `<li id="nav-icon-bar" class = "white z-depth-2"><span>
 <button class="btn-floating z-depth-2 waves-effect waves-light light-blue lighten-2 icon-li"><i class="material-icons">info_outline</i></button></span><span> 
 <button class="btn-floating z-depth-2 waves-effect waves-light red icon-li"><i class="material-icons ">edit</i></button> 
</span></li>`;



    if (url !== "") {
      sideNav.innerHTML += "<li class = 'z-depth-2 center-align'>" + url + "</li>";
      // sideNav.innerHTML += '<li><div class="divider"></div></li>';
    }

    // infoWindow.setContent(feature.title);
    // infoWindow.open(map, marker);
    $('.button-collapse').sideNav('show');

  });
  //  });
  markerCluster.addMarkers(markers);

}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarks() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarks();

  markerCluster.clearMarkers();
  markers = [];
  //console.log(markers);
}
function loadDataBase() {

  db.collection("markers").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {


      var dbData = doc.data();

      createMarker(dbData);
    });
  });
}

