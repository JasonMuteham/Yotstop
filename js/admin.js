console.log("admin connected");

function download(text, name, type) {
  var a = document.createElement("a");
  var file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
}


function adminEdit(collect = "markers") {
  if (!appUser.isMod()) {
    return;
  }

  var id = "537c3fe8-6f0d-4d97-bbdc-90f3cd2903a8"
  var dbSelect = db.collection(collect).doc(id);
  // console.log(!appUser.isMod());

  //  dbSelect = dbSelect.where("type", "==", "marina").where("base", "==", false);
  // dbSelect = dbSelect.where("live", "==", false);
  // dbSelect = db.collection(collect);

  dbSelect
    .get()
    .then(function(doc) {
      // querySnapshot.forEach(function(doc) {
        var dbData = doc.data();
        dbData.id = doc.id;
        console.log(dbData);
        console.log("making edits");
        // dbData.base = false;
        delete dbData.images;

        console.log(dbData);
        if (true) {
          db
            .collection("markers")
            .doc(doc.id)
            .set(dbData)
            .then(function() {
              console.log("Document updated with ID: ", doc.id);
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            });
        }
      // })
     
    })
    .catch(function(error) {
      console.error("Error loading markers: ", error);
    });
}

function adminDownload(collect = "markers") {
  if (!appUser.isMod()) {
    return;
  }

  var jsonData = [];
  var dbSelect = db.collection(collect);
  // console.log(!appUser.isMod());

  //  dbSelect = dbSelect.where("type", "==", "marina").where("base", "==", false);
  // dbSelect = dbSelect.where("live", "==", false);

  dbSelect
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var dbData = doc.data();
        dbData.id = doc.id;
         dbData.base = false;

        jsonData.push(dbData);
        if (true) {
          db
            .collection("markers")
            .doc(doc.id)
            .set(dbData)
            .then(function() {
              console.log("Document updated with ID: ", doc.id);
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            });
        }
      });
      jsonData = JSON.stringify(jsonData);
      download(jsonData, "features.json", "text/plain");
    })
    .catch(function(error) {
      console.error("Error loading markers: ", error);
    });
}

function adminMarinaBase(collect = "markers") {
  if (!appUser.isMod()) {
    return;
  }

  var jsonData = [];
  var dbSelect = db.collection(collect);
  // console.log(!appUser.isMod());

   dbSelect = dbSelect.where("type", "==", "marina").where("base", "==", false);
  // dbSelect = dbSelect.where("live", "==", false);

  dbSelect
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var dbData = doc.data();
        dbData.id = doc.id;
         dbData.base = true;

        jsonData.push(dbData);
        if (true) {
          db
            .collection("markers")
            .doc(doc.id)
            .set(dbData)
            .then(function() {
              console.log("Document updated with ID: ", doc.id);
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            });
        }
      });
      jsonData = JSON.stringify(jsonData);
      download(jsonData, "features.json", "text/plain");
    })
    .catch(function(error) {
      console.error("Error loading markers: ", error);
    });
}

// var cl = new cloudinary.Cloudinary({cloud_name: "yotstop", secure: true});
function cloudImageLoad(){
  cloudinary.openUploadWidget({ cloud_name: 'yotstop', upload_preset: 'l2fptshe', theme: 'white', sources:['local','google_photos']}, 
      function(error, result) { console.log(error, result) });
  
}
