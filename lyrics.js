var CLIENT_HEIGHT = $(window).height();
var CLIENT_WIDTH = $(window).width();
var IS_MOBILE = false;


function page_load(){
	if (CLIENT_WIDTH > 1200 && CLIENT_HEIGHT > 400){
		console.log("PC DEVICE");
	}
	else if (CLIENT_WIDTH < 800){
		console.log("MOBILE DEVICE");
		mobileDisplay();
	}
	else {
		document.write("Site is not supported for your device");
	}
}



function mobileDisplay(){
	IS_MOBILE = true;

	$("#main").attr("id","main-mobile");
	$("#lyrics-container").attr("id","lyrics-container-mobile");
	$("#lyrics").attr("id","lyrics-mobile");
}



var SONGS = {
	1:{
		name:"Lego House",
		artist:"Ed Sheeran",
		src:"songs/lego_house.mp3"
	}
}



var song = new Audio();




function playSong(){

	var songObj = SONGS[1];
	song.src = songObj.src;
	song.play();
	displaySong(songObj);
	displayLyrics();


}


function displaySong(songObj){
	if (IS_MOBILE){
		$("#lyrics-mobile").text(songObj.name);
		$("#lyrics-mobile").css("color","royalblue")
	}
	
}



lyrics = {

	7:"I'm gonna pick up the pieces",
	11:"And build a lego house",
	14:"When things go wrong we can knock it down",
	19:"My three words have two meanings",
	23:"There's one thing on my mind, it's all for you",
	31:"And it's dark in a cold December, but I've got ya to keep me warm",
	36:"And if you're broken I'll mend ya",
	38:"And keep you sheltered from the storm that's raging on now"
	44:"COMING SOON..."
}





song.addEventListener('timeupdate',function(){
	var ctime = Math.round(song.currentTime);

	// memory wasting stuff

	var timestamps = Object.keys(lyrics);
	if (timestamps.includes(`${ctime}`)){
		let text = lyrics[ctime];
		$("#lyrics-mobile").text(text);
		$("#lyrics-mobile").css("color","white");
		console.log(lyrics[ctime])
	}

});

function displayLyrics(){

	if (IS_MOBILE){

	}


}





function main(){
	page_load();


}

$("document").ready(main());