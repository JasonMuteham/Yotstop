console.log("admin connected");

function download(text, name, type) {
  var a = document.createElement("a");
  var file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
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
        // dbData.base = false;

        jsonData.push(dbData);
        if (!true) {
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
