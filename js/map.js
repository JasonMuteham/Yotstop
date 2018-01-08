var MAP_DATA = window.MAP_DATA;
var infoWindow;
var map;
var markers = [];
var markerCluster;
var features;
var userAuth = false;
var uid;

var vrModal = document.getElementById("vr-modal");
var noEditModal = document.getElementById("noEditModal");
var dataEntryModal = document.getElementById("data-entry-modal");
var vrClose = document.getElementById("vrClose");
var dataClose = document.getElementById("dataClose");

var icons = window.MAP_DATA.icons;

function setupEventListeners() {
  document.querySelector("#edit").addEventListener("click", function() {
    // console.log("edit button clicked ", feature.id);
    $(".button-collapse").sideNav("hide");
    dataModalOn();
  });
}

firebase.initializeApp({
  apiKey: "AIzaSyArhLbX05ll-bTM_WrvrPgpnsQtFWLPZlg",
  authDomain: "yotstop-1512497608857.firebaseapp.com",
  databaseURL: "https://yotstop-1512497608857.firebaseio.com",
  projectId: "yotstop-1512497608857",
  storageBucket: "yotstop-1512497608857.appspot.com"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

var data = {
  userId: uid,
  timestamp: null,
  position: null,
  type: null,
  title: null,
  position: null,
  description: null
};

function areWeLoggedin() {
  firebase.auth().onAuthStateChanged(
    function(user) {
      if (user) {
        // User is signed in.
        userAuth = true;
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        uid = user.uid;
        // data.userId = uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;
        var loginIcon = document.querySelector("#map-login-icon");
        loginIcon.setAttribute("data-tooltip", "Logout");
        $(".tooltipped").tooltip({ delay: 350 });
        loginIcon.classList.remove("red");
        loginIcon.classList.add("light-blue");
        loginIcon.classList.add("lighten-2");
        loginIcon.classList.remove("pulse");
        // document.querySelector("#burger-fab").classList.remove("pulse");
        console.log(displayName);
        console.log(photoURL);

        // user.getIdToken().then(function(accessToken) {
        //   document.getElementById('sign-in-status').textContent = 'Signed in';
        //   document.getElementById('sign-in').textContent = 'Sign out';
        //   document.getElementById('account-details').textContent = JSON.stringify({
        //     displayName: displayName,
        //     email: email,
        //     emailVerified: emailVerified,
        //     phoneNumber: phoneNumber,
        //     photoURL: photoURL,
        //     uid: uid,
        //     accessToken: accessToken,
        //     providerData: providerData
        //   }, null, '  ');
        // });
      } else {
        // User is signed out.
        userAuth = false;
        // data.userId = "";
        // var loginIcon = document.getElementById("login-icon");
        var loginIcon = document.querySelector("#map-login-icon");
        loginIcon.classList.add("red");
        loginIcon.classList.remove("light-blue");
        loginIcon.classList.remove("lighten-2");
        loginIcon.classList.add("pulse");
        loginIcon.setAttribute("data-tooltip", "Login");
        $(".tooltipped").tooltip({ delay: 350 });
        // document.getElementById('sign-in-status').textContent = 'Signed out';
        // document.getElementById('sign-in').textContent = 'Sign in';
        // document.getElementById('account-details').textContent = 'null';
      }
    },
    function(error) {
      console.log(error);
    }
  );
}

function login() {
  var loginIcon = document.getElementById("map-login-icon");
  if (!loginIcon.classList.contains("red")) {
    firebase.auth().signOut();
  } else {
    var widgetURL = "login.html";
    window.open(
      widgetURL,
      "Sign In",
      "width=500,height=500,left=300,top=100,dialog=yes,minimizable=no"
    );
  }
}

function MainTitle(titleDiv, map) {
  // Set CSS for the control border.
  var controlUI = document.createElement("div");
  controlUI.style.cursor = "pointer";
  controlUI.style.marginTop = "10px";
  controlUI.style.textAlign = "center";
  titleDiv.appendChild(controlUI);
  var titleText = document.querySelector("#main-title").cloneNode(true);
  titleText.id = "map-main-title";
  controlUI.appendChild(titleText);
  controlUI.addEventListener("click", function() {
    map.panTo(MAP_DATA.settings.mapCenter);
    map.setZoom(MAP_DATA.settings.zoom);
  });
}

function getVersion(versionDiv, map) {
  var controlUI = document.createElement("div");
  controlUI.style.cursor = "pointer";
  controlUI.style.color = "grey";
  versionDiv.appendChild(controlUI);
  var versionText = document.querySelector("#version").cloneNode(true);
  versionText.id = "map-version";
  controlUI.appendChild(versionText);
}

function FABControl(FABDiv, map) {
  var controlUI = document.createElement("div");
  controlUI.style.cursor = "pointer";
  controlUI.style.marginRight = "10px";
  controlUI.style.marginTop = "10px";
  FABDiv.appendChild(controlUI);
  var FABText = document.querySelector("#fab-main").cloneNode(true);
  FABText.id = "map-fab-main";
  FABText.querySelector("#login-icon").id = "map-login-icon";
  FABText.classList.toggle("hide");
  controlUI.appendChild(FABText);
}

function initMap() {
  // Create the map
  map = new google.maps.Map(document.getElementsByClassName("map")[0], {
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
    styles: MAP_DATA.map.styles
  });

  // Create the DIV to hold the control and call the mainTitle()
  // constructor passing in this DIV.
  var titleDiv = document.createElement("div");
  var mainTitle = new MainTitle(titleDiv, map);

  titleDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(titleDiv);

  var FABDiv = document.createElement("div");
  var FABCtrl = new FABControl(FABDiv, map);

  FABDiv.index = 1;
  map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(FABDiv);

  var versionDiv = document.createElement("div");
  var versionText = new getVersion(versionDiv, map);

  versionDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(versionDiv);

  map.addListener("mousemove", function() {
    infoWindow.close(map);
  });

  if (MAP_DATA.settings.debugger) {
    map.addListener("dblclick", function(e) {
      if (
        document.getElementById("data-entry-modal").style.display == "block"
      ) {
        // no more markers if data entry in progress
        return;
      }

      data.position = setLatLng(e);

      var content =
        `"position": { lat: ` +
        data.position.lat +
        `, lng: ` +
        data.position.lng +
        ` }`;

      marker = new google.maps.Marker({
        position: data.position,
        draggable: true,
        animation: google.maps.Animation.DROP,
        map: map,
        id: null
      });

      markers.push(marker);

      google.maps.event.addListener(marker, "click", function(e) {
        if (userAuth) {
          data.position = setLatLng(e);
          var lat = parseFloat(e.latLng.lat()).toFixed([5]);
          var lng = parseFloat(e.latLng.lng()).toFixed([5]);

          document.getElementById("data-entry-pos-lat").textContent = lat;
          document.getElementById("data-entry-pos-lng").textContent = lng;

          google.maps.event.addListener(marker, "dragend", function() {
            lat = parseFloat(marker.position.lat()).toFixed([5]);
            lng = parseFloat(marker.position.lng()).toFixed([5]);

            document.getElementById("data-entry-pos-lat").textContent = lat;
            document.getElementById("data-entry-pos-lng").textContent = lng;
          });
          data.title = "";
          data.description = "";
          data.type = "";
          loadEditData(data);
          dataModalOn();
        } else {
          $("#noEditModal").modal("open");
        }
      });
    });
  }

  features = MAP_DATA.features;

  infoWindow = new google.maps.InfoWindow();
  markerCluster = new MarkerClusterer(map, markers, {
    imagePath: "icons/m",
    gridSize: 40,
    maxZoom: 15
  });

  loadMarkers();
}

// When the user clicks the button, open the modal
function vrModalOn() {
  vrModal.style.display = "block";
  $(".button-collapse").sideNav("hide");
}

function setDefaultType(type) {
  var optionBuild = document.getElementById("data-type");
  var optionRef = optionBuild.querySelectorAll("option");
  optionRef.forEach(function(option) {
    // console.log(option);
    if (option.value === type) {
      option.setAttribute("selected", "");
    } else {
      option.removeAttribute("selected");
    }
    $("select").material_select();
  });
}

function buildIconSelect() {
  var optionBuild = document.getElementById("data-type");
  // console.log(optionBuild);
  optionBuild.innerHTML = "";
  Object.keys(icons).forEach(function(key) {
    var item = icons[key];
    var option =
      `<option value = "` + key + `">` + item.description + `</option>`;

    optionBuild.innerHTML += option;
  });
  $("select").material_select();
}

function dataModalOn() {
  dataEntryModal.style.display = "block";
  // $('#data-entry-modal').modal('open');
}

// When the user clicks on <span> (x), close the modal
vrClose.onclick = function() {
  vrModal.style.display = "none";
};

function closeData() {
  // marker.setMap(null);
  dataEntryModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   console.log(event.target);
//   if (event.target == vrModal) {
//     console.log(event);
//     vrModal.style.display = "none";
//   } else if (event.target == dataEntryModal) {
//     // dataEntryModal.style.display = "none";
//   }
// };

function getLocation() {
  //Start of Location code
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var gpsIcon = document.getElementById("gps-icon");
        gpsIcon.classList.remove("red");
        gpsIcon.classList.add("light-blue");
        gpsIcon.classList.add("lighten-2");
        infoWindow.setPosition(pos);
        infoWindow.setContent("You");
        infoWindow.open(map);
        map.panTo(pos);
        if (map.getZoom() < 15) {
          map.setZoom(15);
          // map.setCenter(pos);
        }
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      },
      options
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function loadMarkers() {
  loadDataBase();
  features.forEach(function(feature) {
    createMarker(feature);
  });
}

function createMarker(feature) {
  var tmpType = feature.type;
  var iconImg = MAP_DATA.settings.iconBase;
  if (tmpType == undefined || tmpType == null) {
    tmpType = "info";
  }
  if (!icons.hasOwnProperty(tmpType)) {
    tmpType = "info";
  }

  if (feature.enhanced == true) {
    iconImg += icons[tmpType].enhanced;
  } else {
    iconImg += icons[tmpType].icon;
  }
  var marker = new google.maps.Marker({
    title: feature.title,
    position: feature.position,
    icon: iconImg,
    map: map,
    id: feature.id
  });

  markers.push(marker);

  marker.addListener("mouseover", function() {
    var mouseoverHTML = document.querySelector("#mouseover").cloneNode(true);
    mouseoverHTML.querySelector("#mouseover-title").textContent = this.title;
    var imagePreview = "";
    if (feature.vrPreviewImage !== undefined) {
      imagePreview = feature.vrPreviewImage;
    } else if (feature.images !== undefined) {
      imagePreview = feature.images[0];
    }
    if (imagePreview !== "") {
      var imgPath =
        MAP_DATA.settings.imagePath + MAP_DATA.settings.preview + imagePreview;
      mouseoverHTML
        .querySelector("#map-mouseover-img")
        .classList.toggle("hide");
      mouseoverHTML
        .querySelector("#map-mouseover-img")
        .setAttribute("src", imgPath);
    }

    mouseoverHTML.addEventListener("click", function() {
      getSideNav(feature);
    });

    infoWindow.setContent(mouseoverHTML);
    infoWindow.open(map, marker);
  });

  marker.addListener("click", function() {
    // infoWindow.close(map, marker);
    getSideNav(feature);
  });

  markerCluster.addMarkers(markers);
}

function getSideNav(feature) {
  // console.log(feature);
  var lat = parseFloat(feature.position.lat).toFixed([5]);
  var lng = parseFloat(feature.position.lng).toFixed([5]);
  data.position = {
    lat: feature.position.lat,
    lng: feature.position.lng
  };
  var sideNav = document.getElementById("slide-out");
  sideNav.querySelector("#nav-title").textContent = feature.title;
  sideNav.querySelector("#nav-description").textContent = feature.description;
  // sideNav.querySelector("#nav-position-lat").textContent = lat;
  // sideNav.querySelector("#nav-position-lng").textContent = lng;
  var dmsCoords = ddToDms(feature.position.lat, feature.position.lng);
  sideNav.querySelector("#nav-position-dms").textContent = dmsCoords;

  if (feature.VRUrl !== undefined) {
    var imgPath =
      MAP_DATA.settings.imagePath +
      MAP_DATA.settings.preview +
      feature.vrPreviewImage;
    sideNav.querySelector("#nav-imagevr").classList.remove("hide");
    sideNav.querySelector("#nav-imagevr").src = imgPath;
    var vr = document.getElementById("vr");
    vr.src = feature.VRUrl;
  } else {
    sideNav.querySelector("#nav-imagevr").classList.add("hide");
    sideNav.querySelector("#nav-imagevr").src = "";
  }

  if (feature.images !== undefined) {
    var imgPath =
      MAP_DATA.settings.imagePath +
      MAP_DATA.settings.preview +
      feature.images[0];
    sideNav.querySelector("#nav-image").classList.remove("hide");
    sideNav.querySelector("#nav-image").src = imgPath;
  } else {
    sideNav.querySelector("#nav-image").classList.add("hide");
    sideNav.querySelector("#nav-image").src = "";
  }

  if (feature.url !== undefined) {
    sideNav.querySelector("#nav-url").href = feature.url;
    sideNav.querySelector("#nav-url").classList.remove("hide");
    if (feature.url.includes("wikipedia")) {
      sideNav.querySelector("#nav-url").textContent = "wikipedia";
    } else {
      sideNav.querySelector("#nav-url").textContent = "website";
    }
  } else {
    sideNav.querySelector("#nav-url").href = "";
    sideNav.querySelector("#nav-url").classList.add("hide");
  }

  loadEditData(feature);

  $(".button-collapse").sideNav("show");
}

function loadEditData(feature) {
  // console.log(feature);
  var lat = parseFloat(feature.position.lat).toFixed([5]);
  var lng = parseFloat(feature.position.lng).toFixed([5]);
  document.getElementById("data-entry-pos-lat").textContent = lat;
  document.getElementById("data-entry-pos-lng").textContent = lng;
  document.getElementById("data-title").value = feature.title;
  if (feature.url !== undefined) {
    document.getElementById("data-url").value = feature.url;
  }
  document.getElementById("data-description").value = feature.description;
  setDefaultType(feature.type);
  // document.getElementById("data-type").value = feature.type;

  document.getElementById("data-id").value = feature.id;
  Materialize.updateTextFields();
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
  db
    .collection("markers")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var dbData = doc.data();
        dbData.id = doc.id;
        createMarker(dbData);
      });
    });
}

function setLatLng(e) {
  var lat = e.latLng.lat();
  var lng = e.latLng.lng();
  var pos = {
    lat: lat,
    lng: lng
  };
  return pos;
}

function deleteData() {
  var docId = document.getElementById("data-id").value;

  if ((docId !== "") & (docId !== undefined)) {
    db
      .collection("markers")
      .doc(docId)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  }
  deleteMarkers();
  loadMarkers();

  closeData();
}

function saveData() {
  var docId = document.getElementById("data-id").value;
  // console.log("data-id", docId);
  data.title = document.getElementById("data-title").value;
  data.userId = uid;
  data.description = document.getElementById("data-description").value;
  data.type = document.getElementById("data-type").value;
  data.url = document.getElementById("data-url").value;
  if (data.url === "") {
    data.url = undefined;
  }
  dataEntryModal.style.display = "none";
  data.timestamp = Date.now();
  if (docId === undefined) {
    docId = "";
  }
  if (docId === "") {
    // if (data.title !== "") {
    db
      .collection("markers")
      .add(data)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  } else {
    // var updateRef = db.collection("markers").doc(docId);

    // Set the "capital" field of the city 'DC'
    // return updateRef
    db
      .collection("markers")
      .doc(docId)
      .update({
        title: data.title,
        description: data.description,
        type: data.type,
        url: data.url,
        "position.lat": data.position.lat,
        "position.lng": data.position.lng
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
  console.log("deleteMarkers");
  deleteMarkers();
  loadMarkers();
}

// This function returns the coordinate
// conversion string in DD to DMS.
function ddToDms(lat, lng) {
  var lat = lat;
  var lng = lng;
  var latResult, lngResult, dmsResult;

  lat = parseFloat(lat);
  lng = parseFloat(lng);

  latResult = lat >= 0 ? "N" : "S";

  // Call to getDms(lat) function for the coordinates of Latitude in DMS.
  // The result is stored in latResult variable.
  latResult += getDms(lat);

  lngResult = lng >= 0 ? "E" : "W";

  // Call to getDms(lng) function for the coordinates of Longitude in DMS.
  // The result is stored in lngResult variable.
  lngResult += getDms(lng);

  // Joining both variables and separate them with a space.
  dmsResult = latResult + " " + lngResult;

  // Return the resultant string
  return dmsResult;
}

function getDms(val) {
  var valDeg, valMin, valSec, result;

  val = Math.abs(val);

  valDeg = Math.floor(val);
  result = valDeg + "º";

  valMin = Math.floor((val - valDeg) * 60);
  result += valMin + "'";

  valSec = Math.round((val - valDeg - valMin / 60) * 3600 * 1000) / 1000;
  result += valSec + '"';

  return result;
}

function initApp() {
  initMap();
  setupEventListeners();
  buildIconSelect();
  setTimeout(function() {
    areWeLoggedin();
    $(".tooltipped").tooltip({ delay: 350 });
  }, 2000);
}
