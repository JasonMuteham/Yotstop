Vue.component("yotstop-message", {
  props: ["modalId", "header", "message"],
  template: `
  
  <div v-bind:id="modalId" class="modal modal-fixed-footer blue lighten-4">
  <div class="modal-content center-align blue lighten-4">
  <div class="z-depth-2 red pt-5 pb-5 mb-10">
  <h5 class="white-text">{{header}}</h5>
      </div>
    
    <p>{{message}}</p>
  </div>
  <div class="modal-footer blue lighten-4">
    <a href="#!" class="modal-action modal-close btn-floating waves-effect waves-light red">
      <i class="material-icons">close</i>
    </a>
  </div>
</div>
      
  `
});

var noEditMsg = new Vue({
  el: "#vue-noEdit-msg",
  data: {
    header: "Please Login",
    message: "Only registered users may add or edit data."
  },
  methods: {
    show: function() {
      $("#noEdit").modal("open");
    }
  }
});

var search = new Vue({
  el: "#vue-search",
  data: {
    searchString: "",
    matchMessage: " matches",
    matchCount: -1,
    isVisable: false,
    isClosing: false
  },
  methods: {
    show: function() {
      if (this.matchCount < 0) {
        this.matchCount = markers.length;
      }
      this.matchMessage = this.matchCount + " matches";
    
      this.isVisable = true;
    },
    close: function() {
   
      this.isClosing = true;
      setTimeout(() => {
        this.isVisable = false;
        this.isClosing = false;
      }, 600);
    },
    search: function(event) {
      var matchCount, filter;
      filter = this.searchString.toUpperCase();
      this.matchCount = 0;
      setMapOnAll(null);
      markerCluster.clearMarkers();
      for (var i = 0; i < markers.length; i++) {
        var feature = getFeature(markers[i].id);
        if (feature.title.toUpperCase().indexOf(filter) > -1) {
          this.matchCount++;
          markers[i].setMap(map);
          markerCluster.addMarker(markers[i]);
        }
      }
      if (this.matchCount > 0) {
        this.matchMessage = this.matchCount + " matches";
      } else {
        this.matchMessage = "No matches";
      }
    },

    reset: function() {
      this.searchString = "";
      $("#searchstring").val(null);
      Materialize.updateTextFields();
      this.matchCount = markers.length;
      this.matchMessage = this.matchCount + " matches";
      setMapOnAll(null);
      markerCluster.clearMarkers();
      for (var i = 0; i < markers.length; i++) {
        var feature = getFeature(markers[i].id);

        markers[i].setMap(map);
        markerCluster.addMarker(markers[i]);
      }
    }
  }
});

function searchShow() {
  if (search.isVisable) {
    search.close();
  } else {
    search.show();
  }
}

$("#searchstring").on("keyup", function(e) {
  
  var inputValue = e.target.value;
  search.searchString = inputValue;
  var matchCount, filter;
  filter = inputValue.toUpperCase();
  search.matchCount = 0;
  setMapOnAll(null);
  markerCluster.clearMarkers();
  for (var i = 0; i < markers.length; i++) {
    var feature = getFeature(markers[i].id);
    if (feature.title.toUpperCase().indexOf(filter) > -1) {
      search.matchCount++;
      markers[i].setMap(map);
      markerCluster.addMarker(markers[i]);
    }
  }
  if (search.matchCount > 0) {
    search.matchMessage = search.matchCount + " matches";
  } else {
    search.matchMessage = "No matches";
  }
});
