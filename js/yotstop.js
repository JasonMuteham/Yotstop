var imageArr = []; 


var ImageIDvalue = "body-back-img";
var ImageCoverId = "back-img-cover";    

var TransitionIncrement = 0.1;

var IncrementInterval = 50;

var PauseBeforeNextImage = 5000;

var imagePrefix = "https://res.cloudinary.com/yotstop/image/upload/f_auto,dpr_auto,w_auto/";
imagePrefix = "";
          
imageArr.push('url("' + imagePrefix + 'images/1920px/cover-1.jpg")');
imageArr.push('url("' + imagePrefix + 'images/1920px/pyefleet-creek-1.jpg")');
imageArr.push('url("' + imagePrefix + 'images/1920px/sharfleet-creek.jpg")');  
imageArr.push('url("' + imagePrefix + 'images/1920px/boy-on-bow.jpg")');
imageArr.push('url("' + imagePrefix + 'images/1920px/red-sands-fort.jpg")');
imageArr.push('url("' + imagePrefix + 'images/1920px/old-lady.jpg")');
imageArr.push('url("' + imagePrefix + 'images/1920px/fort-darnet.jpg")');
imageArr.push('url("' + imagePrefix + 'images/1920px/sealand.jpg")');



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
        // console.log(imageArr[currentImage]);
        timerthing = setInterval("FadeIn()",IncrementInterval);
    }
}

function StartFadeOut() { timerthing = setInterval("FadeOut()",IncrementInterval); }

function StartSlideShowTransition() {
    setTimeout("StartFadeOut()",PauseBeforeNextImage);
}

StartSlideShowTransition();

//Start of Location code 

/* var options = {
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
 */
// End of Location code