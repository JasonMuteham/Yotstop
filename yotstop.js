var imageArr = []; 


var ImageIDvalue = "body-back-img";
var ImageCoverId = "back-img-cover";    

var TransitionIncrement = 0.1;

var IncrementInterval = 50;

var PauseBeforeNextImage = 10000;


          
imageArr.push('url("/images/cover-1.jpg")');
imageArr.push('url("/images/pyefleet-creek-1.jpg")');
imageArr.push('url("/images/sharfleet-creek.jpg")');  
imageArr.push('url("/images/boy-on-bow.jpg")');
imageArr.push('url("/images/red-sands-fort.jpg")');
imageArr.push('url("/images/old-lady.jpg")');
imageArr.push('url("/images/fort-darnet.jpg")');



var opacity = 1;
var currentImage = 0;
var topImage = imageArr.length - 1;
var image = document.getElementById(ImageIDvalue);
var cover = document.getElementById(ImageCoverId);   

var timerthing;

function FadeIn() {
    opacity -= TransitionIncrement;
    if( opacity <= 0 ) { opacity = 0; }
    cover.style.backgroundColor = 'rgba(0,0,0,' + opacity + ')';
    if( opacity == 0 ) {
        clearInterval(timerthing);
        setTimeout("StartFadeOut()",PauseBeforeNextImage);
    }
}

function FadeOut() {
    opacity += TransitionIncrement;
    if( opacity >= 1 ) { opacity = 1; }
    cover.style.backgroundColor = 'rgba(0,0,0,' + opacity + ')';
    if( opacity == 1 ) {
        clearInterval(timerthing);
        currentImage++;
        if( currentImage > topImage ) { currentImage = 0; }
        image.style.backgroundImage = imageArr[currentImage];
        timerthing = setInterval("FadeIn()",IncrementInterval);
    }
}

function StartFadeOut() { timerthing = setInterval("FadeOut()",IncrementInterval); }

function StartSlideShowTransition() {
    setTimeout("StartFadeOut()",PauseBeforeNextImage);
}

StartSlideShowTransition();

//Start of Location code 

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crds = pos.coords;
    var GPSHtml = document.getElementById("GPS");
    GPSHtml.innerHTML = "lat: " + crds.latitude + "<br>long: " + crds.longitude;

};

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.watchPosition(success, error, options);

// End of Location code