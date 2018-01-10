var MAP_DATA = window.MAP_DATA;
var infoWindow;
var map;
var markers = [];
var markerCluster;
var features = [];
var userAuth = false;
var uid;
var vrModal = document.getElementById("vr-modal");
var noEditModal = document.getElementById("noEditModal");
var dataEntryModal = document.getElementById("data-entry-modal");
var vrClose = document.getElementById("vrClose");
var dataClose = document.getElementById("dataClose");
var appUser = new User();
var icons = window.MAP_DATA.icons;

function setupEventListeners() {
  // document.querySelector("#edit").addEventListener("click", function() {
  // console.log("edit button clicked ", feature.id);
  // $(".button-collapse").sideNav("hide");
  // dataModalOn();
  // });
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

function setLoginIcon() {
  var loginIcon = document.querySelector("#map-login-icon");
  loginIcon.classList.remove("red");
  loginIcon.classList.remove("pulse");
  loginIcon.classList.remove("light-blue");
  loginIcon.classList.remove("lighten-2");
  loginIcon.classList.remove("yellow");
  loginIcon.classList.remove("accent-3");
  if (userAuth) {
    loginIcon.setAttribute("data-tooltip", "Logout");

    if (appUser.isMod()) {
      loginIcon.classList.add("yellow");
      loginIcon.classList.add("accent-3");
      loginIcon.setAttribute("data-tooltip", "Admin Logout");
    } else {
      loginIcon.classList.add("light-blue");
      loginIcon.classList.add("lighten-2");
    }
  } else {
    loginIcon.classList.add("red");

    loginIcon.classList.add("pulse");
    loginIcon.setAttribute("data-tooltip", "Login");
  }
  $(".tooltipped").tooltip({ delay: 350 });
}

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

        appUser.init(user.uid);
        // loadMarkers();
        setLoginIcon();
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;

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
        appUser.reset();
        loadMarkers();
        setLoginIcon();
        // data.userId = "";
        // var loginIcon = document.getElementById("login-icon");

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
  // var loginIcon = document.getElementById("map-login-icon");
  // if (!loginIcon.classList.contains("red")) {
  if (userAuth) {
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

function authorised(permission) {
  console.log(permission);
  if (userAuth) {
    return true;
  }
  return false;
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
      if (!authorised()) {
        $("#noEditModal").modal("open");
      } else {
        if (
          document.getElementById("data-entry-modal").style.display == "block"
        ) {
          // no more markers if data entry in progress
          return;
        }

        var pos = setLatLng(e);

        marker = new google.maps.Marker({
          position: pos,
          draggable: true,
          animation: google.maps.Animation.DROP,
          map: map,
          id: generateUUID()
        });

        markers.push(marker);

        google.maps.event.addListener(marker, "click", function(e) {
          var newData = {
            id: marker.id,
            position: setLatLng(e),
            title: "",
            description: "",
            type: "",
            url: "",
            new: true
          };
          map.panTo(setLatLng(e));
          if (map.getZoom() < 15) {
            map.setZoom(15);
          }

          google.maps.event.addListener(marker, "position_changed", function() {
            var dmsCoords = ddToDms(
              marker.position.lat(),
              marker.position.lng()
            );
            document.getElementById(
              "data-entry-pos-dms"
            ).textContent = dmsCoords;
          });

          loadEditData(newData);
          dataModalOn();
        });
      }
    });
  }

  infoWindow = new google.maps.InfoWindow();
  markerCluster = new MarkerClusterer(map, markers, {
    imagePath: "icons/m",
    gridSize: 40,
    maxZoom: 15
  });

  // loadMarkers();
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
  features = JSON.parse(JSON.stringify(MAP_DATA.features));
  deleteMarkers();
  loadLocalMarkers();
  loadDataBase();
  // features.forEach(function(feature) {
  //   createMarker(feature);
  // });
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
  if (feature.live) {
    if (feature.enhanced == true) {
      iconImg += icons[tmpType].enhanced;
    } else {
      iconImg += icons[tmpType].icon;
    }
  } else {
    iconImg += MAP_DATA.settings.reviewIcon;
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
      getSideNav(getFeature(marker.id));
      // getSideNav(feature);
    });

    infoWindow.setContent(mouseoverHTML);
    infoWindow.open(map, marker);
  });

  marker.addListener("rightclick", function(e) {
    getSideNav(getFeature(marker.id));
  });

  marker.addListener("click", function(e) {
    // console.log(e);
    map.panTo(setLatLng(e));
    if (map.getZoom() < 15) {
      map.setZoom(15);
    } else {
      getSideNav(getFeature(marker.id));
    }
  });

  markerCluster.addMarkers(markers);
}

function getFeature(id) {
  var item = features.find(function(item) {
    return item.id === id;
  });

  return item;
}

function getMarker(id) {
  var item = markers.find(function(item) {
    return item.id === id;
  });

  return item;
}

function getSideNav(feature) {
  console.log(feature);
  // var lat = parseFloat(feature.position.lat).toFixed([5]);
  // var lng = parseFloat(feature.position.lng).toFixed([5]);
  // data.position = {
  //   lat: feature.position.lat,
  //   lng: feature.position.lng
  // };
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
  var editFunction = `editData("` + feature.id + `")`;
  document.querySelector("#edit").setAttribute("onclick", editFunction);
  // loadEditData(feature);

  $(".button-collapse").sideNav("show");
}

function editData(id) {
  if (!authorised()) {
    $("#noEditModal").modal("open");
  } else {
    loadEditData(getFeature(id));
    $(".button-collapse").sideNav("hide");
    dataModalOn();
  }
}

function loadEditData(feature) {
  if (feature.new) {
    // console.log("new", feature.new);
    document.getElementById("data-entry-modal-title").textContent =
      "Add Feature";
    var saveFunction = `saveData("` + feature.id + `")`;
  } else {
    var saveFunction = `updateData("` + feature.id + `")`;
    document.getElementById("data-entry-modal-title").textContent =
      "Edit Feature";
  }
  document.querySelector("#save-data").setAttribute("onclick", saveFunction);
  var deleteFunction = `deleteData("` + feature.id + `")`;
  document
    .querySelector("#delete-data")
    .setAttribute("onclick", deleteFunction);

  var dmsCoords = ddToDms(feature.position.lat, feature.position.lng);
  document.getElementById("data-entry-pos-dms").textContent = dmsCoords;
  document.getElementById("data-title").value = feature.title;
  if (feature.url !== undefined) {
    document.getElementById("data-url").value = feature.url;
  } else {
    document.getElementById("data-url").value = "";
  }
  document.getElementById("data-description").value = feature.description;
  setDefaultType(feature.type);

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
  // features = [];
  //console.log(markers);
}

function editInit() {
  if (appUser.isMod()) {
    document.querySelector("#edit").classList.remove("disabled");
  } else {
    document.querySelector("#edit").classList.add("disabled");
  }
}

function User() {
  var userId;
  var userData = {};

  this.init = function(id) {
    userId = id;
    db
      .collection("users")
      .doc(userId)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          // console.log(this);
          // console.log(userId, "Document data:", doc.data());
          userData = doc.data();
          editInit();
          loadMarkers();
        } else {
          console.log(id, "No such user!");
          // userData.mod = false;
        }
      });
  };

  this.reset = function() {
    userId = null;
    userData = {};
    editInit();
  };

  this.isMod = function() {
    // console.log(userData);
    if (userData.mod) {
      return true;
    }
    return false;
  };
}

function loadDataBase() {
  var dbSelect = db.collection("markers");
  console.log(!appUser.isMod());
  if (!appUser.isMod()) {
    dbSelect = dbSelect.where("live", "==", true);
  }
  dbSelect.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var dbData = doc.data();
      dbData.id = doc.id;
      createMarker(dbData);
      features.push(dbData);
    });
  });

  // db
  // .collection("markers")
  // .onSnapshot(function(querySnapshot) {
  //   querySnapshot.forEach(function(doc) {
  //     var dbData = doc.data();
  //     console.log(doc.type,doc.id);
  //     dbData.id = doc.id;
  //     createMarker(dbData);
  //     features.push(dbData);
  //   });
  // });
}

function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = ((d + Math.random() * 16) % 16) | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
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

function deleteData(docId) {
  // var docId = document.getElementById("data-id").value;

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
  // delMarker(docId);

  var removeIndex = features
    .map(function(item) {
      return item.id;
    })
    .indexOf(docId);
  // console.log(removeIndex);
  // remove object
  if (removeIndex >= 0) {
    features.splice(removeIndex, 1);
  }

  deleteMarkers();
  // loadMarkers();
  loadLocalMarkers();
  closeData();
}

function delMarker(id) {
  getMarker(id).setMap(null);
}

function updateFeature(feature) {
  feature.title = document.getElementById("data-title").value;
  feature.description = document.getElementById("data-description").value;
  feature.type = document.getElementById("data-type").value;
  feature.url = document.getElementById("data-url").value;
  if (feature.url === undefined) {
    feature.url = "";
  }
  if (feature.url === "") {
    delete feature.url;
  }
  return feature;
}

function updateData(id) {
  dataEntryModal.style.display = "none";
  feature = getFeature(id);
  marker = getMarker(id);
  feature = updateFeature(feature);
  if (appUser.isMod()) {
    feature.live = true;
  } else {
    feature.live = false;
  }

  deleteMarkers();
  loadLocalMarkers();
  updateDB(feature);
}

function updateDB(feature) {
  db
    .collection("markers")
    .doc(feature.id)
    .set(feature)
    .then(function() {
      console.log("Document updated with ID: ", feature.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

function saveData(id) {
  if (!appUser.isMod()) {
    $("#ReviewModal").modal("open");
  }
  var marker = getMarker(id);
  dataEntryModal.style.display = "none";
  var feature = {
    id: id,
    live: false,
    position: {
      lat: marker.position.lat(),
      lng: marker.position.lng()
    }
  };
  // console.log(feature.position);
  if (appUser.isMod()) {
    feature.live = true;
  } else {
    feature.live = false;
  }
  feature = updateFeature(feature);

  feature.timestamp = Date.now();
  feature.userId = uid;

  features.push(feature);
  deleteMarkers();
  loadLocalMarkers();
  updateDB(feature);
}

function loadLocalMarkers() {
  features.forEach(function(item) {
    createMarker(item);
  });
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
  loadMarkers();
  setupEventListeners();
  buildIconSelect();
  // setTimeout(function() {
  areWeLoggedin();
  // loadMarkers();
  $(".tooltipped").tooltip({ delay: 350 });
  // }, 2000);
}
