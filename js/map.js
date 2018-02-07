var MAP_DATA = window.MAP_DATA;
var MAP_BASE = window.MAP_BASE;
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
var icons = MAP_DATA.icons;
const CLOUDNAME = MAP_DATA.settings.imageCloudName;
const UPLOADPRESET = MAP_DATA.settings.uploadPreset;
const imagePath = MAP_DATA.settings.imagePath;
const imagePreview = MAP_DATA.settings.preview;
const thumbnail = MAP_DATA.settings.thumbnail;

function setupEventListeners() {
  document
    .getElementById("imagefileInput")
    .addEventListener("change", handleFileSelect, false);
}

// firebase.initializeApp({
//   apiKey: "AIzaSyArhLbX05ll-bTM_WrvrPgpnsQtFWLPZlg",
//   authDomain: "yotstop-1512497608857.firebaseapp.com",
//   databaseURL: "https://yotstop-1512497608857.firebaseio.com",
//   projectId: "yotstop-1512497608857",
//   storageBucket: "yotstop-1512497608857.appspot.com"
// });

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var storage = firebase.storage();
var storageRef = firebase.storage().ref();

function setLoginIcon() {
  var loginIcon = document.querySelector("#map-login-icon");
  // var loginIcon = document.querySelector("#login-icon");
  loginIcon.classList.remove("red");
  stopPulse(loginIcon);
  // loginIcon.classList.remove("pulse");
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

    // loginIcon.classList.add("pulse");
    startPulse(loginIcon);
    loginIcon.setAttribute("data-tooltip", "Login");
  }
  $(".tooltipped").tooltip({
    delay: 350
  });
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
        //  loadMarkers();
        setLoginIcon();

        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;

        document.querySelector("#map-fab-main-btn").classList.remove("pulse");
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
  if (userAuth) {
    firebase.auth().signOut();
    Materialize.toast("You have logout", 5000, "light-blue lighten-2");
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
  FABText.querySelector("#fab-main-btn").id = "map-fab-main-btn";
  FABText.classList.toggle("hide");
  controlUI.appendChild(FABText);
}

function authorised(permission) {
  // console.log(permission);
  if (userAuth) {
    return true;
  }
  return false;
}

function initMap() {
  return new Promise((resolve, reject) => {
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

    map.addListener("drag", function() {
      $(".fixed-action-btn").closeFAB();
    });
    map.addListener("click", function() {
      infoWindow.close(map);
      $(".fixed-action-btn").closeFAB();
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

            google.maps.event.addListener(
              marker,
              "position_changed",
              function() {
                var dmsCoords = ddToDms(
                  marker.position.lat(),
                  marker.position.lng()
                );
                document.getElementById(
                  "data-entry-pos-dms"
                ).textContent = dmsCoords;
              }
            );

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

    //  loadMarkers();
    resolve(true);
  });
}

// When the user clicks the button, open the modal
function vrModalOn() {
  vrModal.style.display = "block";
  $(".button-collapse").sideNav("hide");
}

async function setDefaultType(type) {
  return new Promise((resolve, reject) => {
    var optionBuild = document.getElementById("data-type");
    var optionRef = optionBuild.querySelectorAll("option");
    optionRef.forEach(function(option) {
      // console.log(option);
      if (option.value === type) {
        option.setAttribute("selected", "");
      } else {
        option.removeAttribute("selected");
      }
      // $("select").material_select();
    });
    $("select").material_select();
    resolve(true);
  });
}

function buildIconSelect() {
  var optionBuild = document.getElementById("data-type");

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
}

// When the user clicks on <span> (x), close the modal
vrClose.onclick = function() {
  vrModal.style.display = "none";
};

function closeData() {
  // marker.setMap(null);
  dataEntryModal.style.display = "none";
}

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
        var dmsCoords = ddToDms(pos.lat, pos.lng);
        var content =
          '<div class="center-align">Your Location <br><strong>' +
          dmsCoords +
          "</strong></div>";
        infoWindow.setContent(content);
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
  features = JSON.parse(JSON.stringify(MAP_BASE.features));
  deleteMarkers();
  loadLocalMarkers();
  loadDataBase();
  // markerCluster.addMarkers(markers);
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
      // iconImg += icons[tmpType].enhanced;
      iconImg += icons[tmpType].icon;
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

  markerCluster.addMarker(marker);

  markers.push(marker);

  marker.addListener("mouseover", function() {
    var mouseoverHTML = document.querySelector("#mouseover").cloneNode(true);
    mouseoverHTML.querySelector("#mouseover-title").textContent = this.title;
    var imagePreview = "";

    if (feature.images !== undefined) {
      var infoImage = mouseoverHTML.querySelector("#map-mouseover-img");
      var imageUrl = imagePath + thumbnail + feature.images[0];
      infoImage.src = imageUrl;

      infoImage.classList.toggle("hide");
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

    if (map.getZoom() < 15) {
      map.setZoom(15);
    } else {
      getSideNav(getFeature(marker.id));
    }
    map.panTo(setLatLng(e));
  });
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
  // var lat = parseFloat(feature.position.lat).toFixed([5]);
  // var lng = parseFloat(feature.position.lng).toFixed([5]);
  // data.position = {
  //   lat: feature.position.lat,
  //   lng: feature.position.lng
  // };
  var sideNav = document.getElementById("slide-out");
  sideNav.dataset.id = feature.id;
  sideNav.querySelector("#nav-title").textContent = feature.title;
  sideNav.querySelector("#nav-description").textContent = feature.description;
  // sideNav.querySelector("#nav-position-lat").textContent = lat;
  // sideNav.querySelector("#nav-position-lng").textContent = lng;
  var dmsCoords = ddToDms(feature.position.lat, feature.position.lng);
  sideNav.querySelector("#nav-position-dms").textContent = dmsCoords;

  if (feature.gEarthImage !== undefined) {
    var imgPath = imagePath + feature.gEarthImage;
    sideNav.querySelector("#nav-gearth-image").classList.remove("hide");
    sideNav.querySelector("#nav-gearth-image").src = imgPath;
  } else {
    sideNav.querySelector("#nav-gearth-image").classList.add("hide");
    sideNav.querySelector("#nav-gearth-image").src = "";
  }

  if (feature.VRUrl !== undefined) {
    // var imgPath = imagePath + imagePreview + feature.vrPreviewImage;
    // sideNav.querySelector("#nav-imagevr").classList.remove("hide");
    // sideNav.querySelector("#nav-imagevr").src = imgPath;
    // sideNav
    // .querySelector("#nav-imagevr-div")
    // .setAttribute("onClick", "vrModalOn()");
    // sideNav.querySelector("#nav-imagevr-div").style.cursor = "pointer";
    var vr = document.getElementById("vr");
    vr.src = feature.VRUrl;
    sideNav.querySelector("#photo-360-btn").classList.remove("disabled");
    sideNav.querySelector("#no-gephoto-nav-icon").classList.add("hide");
  } else {
    sideNav.querySelector("#photo-360-btn").classList.add("disabled");
    sideNav.querySelector("#no-gephoto-nav-icon").classList.remove("hide");
    // sideNav.querySelector("#nav-imagevr").classList.add("hide");
    // sideNav.querySelector("#nav-imagevr").src = "";
    // sideNav.querySelector("#nav-imagevr-div").setAttribute("onClick", "");
    // sideNav.querySelector("#nav-imagevr-div").style.cursor = "auto";
  }

  if (feature.images !== undefined) {
    var imgPath = imagePath + imagePreview + feature.images[0];
    // var imgPathFull = MAP_DATA.settings.imagePath + MAP_DATA.settings.full + feature.images[0];
    // var imgPathFull = feature.images[0];
    sideNav.querySelector("#nav-image").classList.remove("hide");
    sideNav.querySelector("#no-photo-nav-icon").classList.add("hide");
    sideNav.querySelector("#nav-image").src = imgPath;
    sideNav.querySelector("#nav-photo").classList.remove("hide");
    sideNav.querySelector("#nav-photo").src = imgPath;
  } else {
    sideNav.querySelector("#nav-image").classList.add("hide");
    sideNav.querySelector("#nav-image").src = "";
    sideNav.querySelector("#no-photo-nav-icon").classList.remove("hide");
    sideNav.querySelector("#nav-photo").classList.add("hide");
    sideNav.querySelector("#nav-photo").src = "";
  }

  if (feature.url !== undefined) {
    sideNav.querySelector("#nav-url").href = feature.url;
    sideNav.querySelector("#nav-web-btn").classList.remove("disabled");
    sideNav.querySelector("#nav-url").classList.remove("disabled");
    // if (feature.url.includes("wikipedia")) {
    // sideNav.querySelector("#nav-web-description").textContent = "wikipedia";
    // } else {
    // sideNav.querySelector("#nav-web-description").textContent = "website";
    // }
  } else {
    sideNav.querySelector("#nav-url").href = "";
    sideNav.querySelector("#nav-url").classList.add("disabled");
    sideNav.querySelector("#nav-web-btn").classList.add("disabled");
    // sideNav.querySelector("#nav-web").classList.add("hide");
  }

  if (feature.type == "anchor") {
    sideNav.querySelector("#anchorage-details").classList.remove("hide");
  } else {
    sideNav.querySelector("#anchorage-details").classList.add("hide");
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

async function loadEditData(feature) {
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

  if (feature.VRUrl !== undefined) {
    document.getElementById("data-VRurl").value = feature.VRUrl;
  } else {
    document.getElementById("data-VRurl").value = "";
  }

  document.getElementById("data-description").value = feature.description;
  document.getElementById("data-type").value = feature.type;
  await setDefaultType(feature.type);

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
  if (userAuth) {
    if (appUser.isMod()) {
      document.querySelector("#edit").classList.remove("disabled");
      document.querySelector("#add-gearth-photo").classList.remove("hide");
    } else {
      document.querySelector("#add-gearth-photo").classList.add("hide");
    }
    document.querySelector("#add-photo").classList.remove("disabled");
  } else {
    document.querySelector("#edit").classList.add("disabled");
    document.querySelector("#add-photo").classList.add("disabled");
    document.querySelector("#add-gearth-photo").classList.add("hide");
  }
}

function User() {
  var userId = "";
  var userData = {};

  this.getName = function() {
    return userData.name;
  };

  this.getUserData = function() {
    if (userId === "") {
      console.log("no user id try User.init");
      return;
    }
    db
      .collection("users")
      .doc(userId)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          userData = doc.data();
          // console.log(userData.myImages);
          // return userData.myImages;
        } else {
          userData = {};
        }
      });
  };

  this.addImage = function(uploadedImage) {
    // push.userData.myImages(uploadedImage);
    db
      .collection("users")
      .doc(userId)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          userData = doc.data();
          // console.log(userData.myImages);
          // return userData.myImages;
        } else {
          userData = {
            myImages: []
          };
        }
        console.log(userData.myImages);
        userData.myImages.push(uploadedImage);
        db
          .collection("users")
          .doc(userId)
          .update({
            myImages: userData.myImages
          })
          .then(function(doc) {
            console.log(
              "user " + userId + " images updated " + userData.myImages
            );
          });
      });
  };

  this.init = function(id) {
    userId = id;
    db
      .collection("users")
      .doc(userId)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          userData = doc.data();
        } else {
          userData = {
            name: "Boatless",
            mod: false,
            myImages: []
          };
          db
            .collection("users")
            .doc(userId)
            .set(userData)
            .then(function(doc) {
              console.log("new " + userId + " added to users");
            });
        }
        if (userData.name != undefined) {
          Materialize.toast(
            "Logged in as " + userData.name,
            4000,
            "light-blue lighten-2"
          );
        } else {
          Materialize.toast("Logged in", 4000, "light-blue lighten-2");
        }
        editInit();
        loadMarkers();
        setLoginIcon();
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

function featureAddImage(id, imageFileName) {
  db
    .collection("markers")
    .doc(id)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        var markerData = doc.data();
        if (markerData.images == undefined) {
          markerData.images = [];
        }
        markerData.images.push(imageFileName);
        db
          .collection("markers")
          .doc(id)
          .update({
            images: markerData.images
          })
          .then(function(doc) {
            console.log(
              "new image " + imageFileName + " added to marker " + id
            );
          });
      }
    });
}

function loadDataBase() {
  if (!userAuth) {
    preloader(false);
    return;
  }
  var dbSelect = db.collection("markers");
  // console.log(!appUser.isMod());
  dbSelect = dbSelect.where("base", "==", false);
  if (!appUser.isMod()) {
    dbSelect = dbSelect.where("live", "==", true).where("base", "==", false);
  }
  dbSelect
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var dbData = doc.data();
        dbData.id = doc.id;
        createMarker(dbData);
        features.push(dbData);
      });
      preloader(false);
    })
    .catch(function(error) {
      console.error("Error loading markers: ", error);
      preloader(false);
    });
}

function preloader(start) {
  if (!start) {
    document.querySelector("#preloader").classList.add("hide");
  } else {
    document.querySelector("#preloader").classList.remove("hide");
  }
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
  // markerCluster.addMarkers(markers);
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
  feature.VRUrl = document.getElementById("data-VRurl").value;
  if (feature.url === undefined) {
    feature.url = "";
  }
  if (feature.url === "") {
    delete feature.url;
  }
  if (feature.VRUrl === undefined) {
    feature.VRUrl = "";
  }
  if (feature.VRUrl === "") {
    delete feature.VRUrl;
  } else {
    if (feature.vrPreviewImage === undefined) {
      feature.vrPreviewImage = feature.images[0];
    }
  }

  return feature;
}

function updateData(id) {
  dataEntryModal.style.display = "none";
  feature = getFeature(id);
  marker = getMarker(id);
  feature = updateFeature(feature);
  if (feature.base === undefined) {
    feature.base = false;
  }
  if (appUser.isMod()) {
    feature.live = true;
  } else {
    feature.live = false;
  }

  deleteMarkers();
  loadLocalMarkers();
  // markerCluster.addMarkers(markers);
  updateDB(feature);
}

function updateDB(feature) {
  db
    .collection("markers")
    .doc(feature.id)
    .set(feature)
    .then(function() {
      console.log("Document updated with ID: ", feature.id);
      if (appUser.isMod()) {
        console.log(feature);
      }
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

function saveData(id) {
  if (!appUser.isMod()) {
    // $("#ReviewModal").modal("open");
    Materialize.toast(
      "Subject to review your submission will be live soon",
      5000,
      "light-blue lighten-2"
    );
  }
  var marker = getMarker(id);
  dataEntryModal.style.display = "none";
  var feature = {
    id: id,
    live: false,
    base: false,
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

function getDD2DM(dms, type) {
  var sign = 1,
    Abs = 0;
  var days, minutes, secounds, direction;

  if (dms < 0) {
    sign = -1;
  }
  Abs = Math.abs(Math.round(dms * 1000000));

  if (type == "lat" && Abs > 90 * 1000000) {
    return false;
  } else if (type == "lon" && Abs > 180 * 1000000) {
    return false;
  }

  days = Math.floor(Abs / 1000000);
  minutes = ((Abs / 1000000 - days) * 60).toFixed(3);
  secounds = (
    Math.floor(((Abs / 1000000 - days) * 60 - minutes) * 100000) *
    60 /
    100000
  ).toFixed();
  days = days * sign;
  if (type == "lat") direction = days < 0 ? "S" : "N";
  if (type == "lng") direction = days < 0 ? "W" : "E";
  //else return value
  return days * sign + "º " + minutes + direction;
}

function ddToDms(lat, lng) {
  return getDD2DM(lat, "lat") + " , " + getDD2DM(lng, "lng");
}

// function imageError(theImg) {
//   // theImg.style.display = "none";
//   theImg.classList.add("hide");
// }

function getImageURL(imageId) {
  storageRef
    .child("images/" + imageId)
    .getDownloadURL()
    .then(function(url) {
      console.log(url);
      return url;
    })
    .catch(function(error) {
      console.log(error + imageId);
    });
}

function getInfoWindowImage(imageDiv, imageId) {
  storageRef
    .child("images/" + imageId)
    .getDownloadURL()
    .then(function(url) {
      imageDiv.src = url;
      imageDiv.classList.toggle("hide");
    })
    .catch(function(error) {
      console.log(error + imageId);
    });
}

function uploadImage(imgOpt = "images") {
  cloudinary.openUploadWidget(
    {
      cloud_name: CLOUDNAME,
      upload_preset: UPLOADPRESET,
      theme: "white",
      sources: ["local", "google_photos"],
      multiple: false,
      resource_type: "image",
      client_allowed_formats: ["jpeg"],
      cropping: "server",
      cropping_aspect_ratio: 1.78,
      cropping_show_dimensions: false,
      cropping_coordinates_mode: "custom",
      cropping_show_back_button: true,
      max_image_width: 1920,
      context: {
        "user id": uid,
        "user name": appUser.getName()
      }
    },
    function(error, result) {
      console.log(error, result);
      if (error === null) {
        var featureId = document.getElementById("slide-out").dataset.id;
        var feature = getFeature(featureId);
        var imageFileName = result[0].public_id;
        imageFileName += ".jpg";
        appUser.addImage(imageFileName);

        if (imgOpt === "images") {
          if (feature.images == undefined) {
            feature.images = [];
          }
          feature.images.push(imageFileName);
          featureAddImage(featureId, imageFileName);
          var url = imagePath + imagePreview + imageFileName;
          document.querySelector("#nav-photo").classList.remove("hide");
          document.querySelector("#nav-photo").src = url;
          document.querySelector("#nav-image").src = url;
          document.querySelector("#nav-image").classList.remove("hide");
        }
        if(imgOpt==="gEarthImage"){
          feature.gEarthImage = imageFileName;
          var url = imagePath + imageFileName;
          document.querySelector("#nav-gearth-image").src = url;
          document.querySelector("#nav-gearth-image").classList.remove("hide");
        }
      }
    }
  );
}

function handleFileSelect(evt) {
  console.log(evt);
  evt.stopPropagation();
  evt.preventDefault();
  var file = evt.target.files[0];
  var storageId = generateUUID();
  var metadata = {
    contentType: file.type,
    customMetadata: {
      user: uid,
      name: file.name
    }
  };
  // Push to child path.
  // [START oncomplete]
  storageRef
    .child("images/" + storageId)
    .put(file, metadata)
    .then(function(snapshot) {
      console.log("Uploaded", snapshot.totalBytes, "bytes.");
      console.log(snapshot.metadata);
      var url = snapshot.downloadURL;
      console.log("File available at", url);
      var featureId = document.getElementById("slide-out").dataset.id;
      var feature = getFeature(featureId);
      if (feature.images == undefined) {
        feature.images = [];
      }
      if (feature.imageNames == undefined) {
        feature.imageNames = [];
      }
      feature.images.push(url);
      // feature.imageNames.push(storageId);
      document.querySelector("#nav-photo").classList.remove("hide");
      document.querySelector("#nav-photo").src = url;
      document.querySelector("#nav-image").src = url;
      document.querySelector("#nav-image").classList.remove("hide");
      console.log(feature);
      // [START_EXCLUDE]
      // document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
      // [END_EXCLUDE]
    })
    .catch(function(error) {
      // [START onfailure]
      console.error("Upload failed:", error);
      // [END onfailure]
    });
  // [END oncomplete]
}

function stopPulse(div) {
  div.classList.remove("pulse");
}
function startPulse(div) {
  div.classList.add("pulse");
}

function expandToggle(div) {
  var iconDiv = div.querySelector(".material-icons");
  if (iconDiv.innerHTML === "expand_more") {
    iconDiv.innerHTML = "expand_less";
  } else {
    iconDiv.innerHTML = "expand_more";
  }
}

function initApp() {
  initMap();

  buildIconSelect();
  // setupEventListeners();
  setTimeout(function() {
    areWeLoggedin();
    $(".tooltipped").tooltip({
      delay: 350
    });
  }, 3000);
}
