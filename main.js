var SONGS =  
{

	1:{
		name:"Lego house",
		artist:"Ed Sheeran",
		file:"lego_house",
		image:"plus"
	},

	2:{
		name:"Burning In The Skies",
		artist:"Linkin Park",
		file:"burning_in_the_skies",
		image:"a_thousand_suns"
	},
	3:{
		name:"Powerless",
		artist:"Linkin Park",
		file:"powerless",
		image:"living_things"
	},
	4:{
		name:"What I've Done",
		artist:"Linkin Park",
		file:"what_ive_done",
		image:"minutes_to_midnight"
	},
	5:{
		name:"Into You",
		artist:"Dead By Sunrise",
		file:"into_you",
		image:"dead_by_sunrise"
	},
	6:{
		name:"Castle On The Hill",
		artist:"Ed Sheeran",
		file:"castle_on_the_hill",
		image:"divide"
	},
	7:{
		name:"Nancy Mulligan",
		artist:"Ed Sheeran",
		file:"nancy_mulligan",
		image:"divide"
	},
	8:{
		name:"What Do I know?",
		artist:"Ed Sheeran",
		file:"what_do_i_know",
		image:"divide"
	},
	9:{
		name:"Supermarket Flowers",
		artist:"Ed Sheeran",
		file:"supermarket_flowers",
		image:"divide"
	},
	10:{
		name:"Safe & Sound",
		artist:"Different Heaven",
		file:"safe_and_sound",
		image:"ncs"
	},
	11:{
		name:"Barcelona",
		artist:"Ed Sheeran",
		file:"barcelona",
		image:"divide"
	},
	12:{
		name:"Photograph",
		artist:"Ed Sheeran",
		file:"photograph",
		image:"multiply"
	},
	13:{
		name:"War",
		artist:"Linkin Park",
		file:"war",
		image:"the_hunting_party"
	},
	14:{
		name:"One",
		artist:"Ed Sheeran",
		file:"one",
		image:"multiply"
	},
	15:{
		name:"Galway Girl",
		artist:"Ed Sheeran",
		file:"galway_girl",
		image:"divide"
	},
	16:{
		name:"The Office Theme",
		artist:"Michael Scott",
		file:"the_office_theme",
		image:"the_office"
	},
	17:{
		name:"Waiting For Love",
		artist:"Avicii",
		file:"waiting_for_love",
		image:"stories"
	},
	18:{
		name:"I Don't Care",
		artist:"Ed Sheeran",
		file:"i_dont_care",
		image:"collaborations"
	},
	19:{
		name:"Breaking The Habit",
		artist:"Linkin Park",
		file:"breaking_the_habit",
		image:"meteora"
	},
	20:{
		name:"The Days",
		artist:"Avicii",
		file:"the_days",
		image:"stories"
	},
	21:{
		name:"The Nights",
		artist:"Avicii",
		file:"the_nights",
		image:"stories"
	},
	22:{
		name:"Thinking Out Loud",
		artist:"Ed Sheeran",
		file:"thinking_out_loud",
		image:"multiply"
	},
	23:{
		name:"Tenerife Sea",
		artist:"Ed Sheeran",
		file:"tenerife_sea",
		image:"multiply"
	},
	24:{
		name:"Dream Of Something Sweet",
		artist:"K-391",
		file:"dream_of_something_sweet",
		image:"ncs2"
	}


}

//TECHNICAL

var CLIENT_HEIGHT = $(window).height();
var CLIENT_WIDTH = $(window).width();
var IS_MOBILE = false;
//

var songTitle = document.getElementById("song_title");
var artistName = document.getElementById("artist_name");
var songImage = document.getElementById("img");


var currentSong = 1;
var fillBar = document.getElementById("fill");
var SONGS_BACKUP = SONGS;
var song = new Audio();
var shuffle = false;
var loop = false;
var filterStatus = false;
var filteredArtist = null;
var showLyrics = false;
var lyricsExists = false;

song.addEventListener('timeupdate',function(){

	var pos = song.currentTime / song.duration;
	fillBar.style.width = pos*100+"%";

	songCtime();

	if (showLyrics){
		if (lyricsExists){

			var ctime = Math.round(song.currentTime);
			var timestamps = Object.keys(LYRICS[currentSong]);
			if (timestamps.includes(`${ctime}`)){
				$("#lyrics-text-mobile").html(LYRICS[currentSong][ctime]);
			}		
		}

	}


});




song.addEventListener("ended",function(){
	if (!loop){
		currentSong += 1;
	}
	
	playSong()
})


var durationDisplayLag;


function playSong(){
	if (filterStatus == true){

		SONGS = {};
		var counter = 0;
		for (var x in SONGS_BACKUP){

			var search = Object.values(SONGS_BACKUP);
			if (SONGS_BACKUP[x]["artist"]  == filteredArtist){
				counter += 1;
				
				SONGS[counter] = SONGS_BACKUP[x];
			}
			
		}
		



	}
	if (!filterStatus){
		SONGS = SONGS_BACKUP;
	}
	if (!loop){

		if (shuffle){
			let tempCurrentSong = currentSong;
			currentSong = randint(1,Object.keys(SONGS).length);
			while (currentSong == tempCurrentSong){
				playSong();
			}
		}


	}


	var songObj = SONGS[currentSong];
	
	if (songObj == undefined){
		if (currentSong < 1){
			currentSong = Object.keys(SONGS).length;
		}
		else {
			currentSong = 1;
		}
		
		songObj = SONGS[currentSong];

	}
	if (!songObj.image){
		songObj.image = "main"
	}
	songImage.src = `images/${songObj.image}.png`;
	song.src = `songs/${songObj.file}.mp3`;
	song.play();


	if (!IS_MOBILE){
		$("#song_title").text(songObj.name);
	}
	else if (IS_MOBILE){
		$("#song_title-mobile").text(songObj.name);
		$("#artist_name-mobile").text(songObj.artist);
		
		
		durationDisplayLag = setInterval(function(){
			let ct = duration();
			$("#song_time-mobile").text(ct);

			clearInterval(durationDisplayLag);


		},500)
	}
	

	


}

function duration(){
		
	let dur = Math.round(song.duration,1);

	let mins = Math.floor(dur/60);

	let sec = dur -(mins*60);

	if (sec < 10){
		sec = `0${sec}`;
	}
	let val = `${mins}:${sec}`;
	if (isNaN(dur)){
		duration();
	}
	return val;
}




function songCtime(){
	let t = Math.round(song.currentTime,1);
	let mins = Math.floor(t/60);
	let sec = t - (mins*60);

	if (sec < 10){
		sec = `0${sec}`;
	}
	let val = `${mins}:${sec}`;
	
	if (IS_MOBILE){
		$("#current_time-mobile").text(val);
	}
}


// remember to fix the XX:YY issue ok;
function toggleShuffle(){
	
	if (shuffle){
		shuffle = false;
		if (IS_MOBILE){
			$("#shuffle-mobile").css("color","#867f7f");
		}
		
	}
	else {
		shuffle = true;
		if (IS_MOBILE){
			$("#shuffle-mobile").css("color","#289c22");
		}
	}

}


function toggleLoop(){

	if (loop){
		loop = false;
		if (IS_MOBILE){
			$("#loop-mobile").css("color","#867f7f");
		}
		
	}
	else {
		loop = true;
		if (IS_MOBILE){
			$("#loop-mobile").css("color","royalblue");
		}
	}


}











function filter(){

	let html = `
	<button onclick="artistFilter('disable')"
	id="all-filter-btn" class="btn btn-success bal">
	All Songs</button><br><br><br>

	<button onclick="artistFilter('Ed Sheeran')" 
	id="ed-sheeran-filter-btn" class="btn btn-info bal">
	Ed Sheeran Songs
	</button><br><br>

	<button onclick="artistFilter('Linkin Park')" 
	id="linkin-parl-filter-btn" class="btn btn-info bal">
	Linkin Park Songs
	</button>



	`;
	Swal.fire({
		html:html,
		background:"#171617",
		position:"top-start",
		showConfirmButton:false,
		showCloseButton:true,
		grow:"column",
		width:"90%",
		customClass: {
    		popup: `
		      animate__animated
		      animate__fadeInLeft
		     
		    `
 		},
  		hideClass: {
    		popup: `
    			animate__animated
      			animate__fadeOutLeft
      			animate__faster
    		`
  		}

	})
}


function artistFilter(artist){
	if (artist == "disable"){
		filterStatus = false;
		toast.fire({
			title:"All songs visible",
			icon:"success"
		})
	}
	else {
		filterStatus = true;
		filteredArtist = artist;
		toast.fire({
			title:`Only ${artist} songs visible`,
			icon:"success"
		})
	}

	
}





const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true
 
})














function back(){
	currentSong -= 1;
	playSong();
}
function next(){
	currentSong += 1;
	playSong()
}


function playPause(){
	if (song.paused){
		song.play();
		$("#play").html(`<i class="fa fa-pause "></i>`);
	}
	else {
		song.currentTime -= 1;
		song.pause();
		$("#play").html(`<i class="fa fa-play "></i>`);
	}

}






function playFirst(){
	if (!IS_MOBILE){

		$("#start").html(`<i class="fa fa-pause"></i>`);
		$("#start").attr("onclick",null);
		$("#start").attr("id","play");
		$("#back").css("visibility","visible");
		$("#next").css("visibility","visible");
		$("#seekbar").css("visibility","visible");
	}
	else if (IS_MOBILE){

		$("#start-mobile").html(`<i class="fa fa-pause"></i>`)
		$("#start-mobile").attr("onclick",null);
		$("#start-mobile").attr("id","play");
		$("#back-mobile").css("visibility","visible");
		$("#next-mobile").css("visibility","visible");
		$("#play").addClass("play-mobile");
		$("#seekbar-mobile").css("visibility","visible");
		$("#time-mobile").css("visibility","visible");
		$("#shuffle-mobile").css("visibility","visible");
		$("#filter-mobile").css("visibility","visible");
		$("#loop-mobile").css("visibility","visible");
		$("#lyrics-mobile").css("visibility","visible");
		$("#drawer-mobile").css("visibility","visible");

	}

	$("#play").attr("onclick","playPause()");

	playSong();
}




/*
function imageAnimation(){
	var opacity = 1;
	opac_order = "dec";
	var imageAnim = setInterval(function(){
		
		if (opacity >= 1){
			opac_order = "dec";
		}
		else if (opacity <= 0.5){
			opac_order = "inc"
		}

		if (opac_order == "dec"){
			opacity -= 0.05;
		}
		if (opac_order == "inc"){
			opacity += 0.05;
		}
		opacity = (opacity*100)/10;
		console.log(opacity);
		$("#img").css("opacity",opacity);
	},250);
}



*/












































function page_load(){
	if (CLIENT_WIDTH > 1200 && CLIENT_HEIGHT > 400){
		console.log("PC DEVICE");
		pcDisplay();
	
	}
	else if (CLIENT_WIDTH < 800){
		console.log("MOBILE DEVICE");
		mobileDisplay();
	}
	else {
		document.write("Site is not supported for your device")
	}



}

function pcDisplay(){
	let html = 
	`
	<div class="w3-display-middle">
	<h2 class="w3-text-amber casual">Please use a mobile to access this site.</h2>
	<br><br>
	<h5 class="w3-text-gray casual">Alternatively, you could use mobile display on PC</h5>
	</div>
	`
	$("body").html(html);
	$("body").css("background-color","black");
}


function mobileDisplay(){
	IS_MOBILE = true;

	$("#main").attr("id","main-mobile");
	$("#image").attr("id","image-mobile");
	$("#img").attr("id","img-mobile");
	$("#player").attr("id","player-mobile");
	$("#song_title").attr("id","song_title-mobile");
	$("#artist_name").attr("id","artist_name-mobile");
	$("#buttons").attr("id","buttons-mobile");
	$("#back").attr("id","back-mobile");
	$("#next").attr("id","next-mobile");
	$("#start").attr("id","start-mobile");
	$("#seekbar").attr("id","seekbar-mobile");
	$("#fill").attr("id","fill-mobile");
	$("#handle").attr("id","handle-mobile");
	$("#time").attr("id","time-mobile");
	$("#current_time").attr("id","current_time-mobile");
	$("#song_time").attr("id","song_time-mobile");
	$("#shuffle").attr("id","shuffle-mobile");
	$("#filter").attr("id","filter-mobile");
	$("#loop").attr("id","loop-mobile");

	$("#lyrics").attr("id","lyrics-mobile");
	$("#lyrics-mobile").attr("onclick","lyricsMobile()");
	$("#drawer").attr("id","drawer-mobile");

	songTitle = document.getElementById("song_title-mobile");
	songImage = document.getElementById("img-mobile");
	var fillBar = document.getElementById("fill-mobile");

}






song.addEventListener('timeupdate',function(){

	var pos = song.currentTime / song.duration;
	fillBar.style.width = pos*100+"%";

	songCtime();


});

function extra(){

	$("#seekbar-mobile").click(function(){
		var x = event.clientX;
		var goto = x-50;
		
		songManipulate(goto);
	});
}



function songManipulate(goto){

	let reverseWidth  = Math.round((goto/$("#seekbar-mobile").width())*100);
	 
	song.currentTime = (song.duration*reverseWidth)/100;


	
}





function lyricsMobile(){

	var lyricsObj = LYRICS[currentSong];
	if (lyricsObj == undefined){
		lyricsExists = false;
	}
	else {
		lyricsExists = true;
	}

	let html = `
	<span id="lyrics-text-mobile"></span>
	
	`;


	Swal.fire({
		background:"#171617",
		html:html,
		position:"top",
		grow:"row",
		showConfirmButton:false,
		customClass:{
			popup:`lyrics-popup-mobile`
		},
		onOpen:() => {
			showLyrics = true;
			//$("#lyrics-mobile").css("color","green");
			$("#lyrics-mobile").css("visibility","hidden");
		},
		onClose:() => {
			showLyrics = false;
			//$("#lyrics-mobile").css("color","#867f7f");
			$("#lyrics-mobile").css("visibility","visible");
		},
		onDestroy:() => {
			showLyrics = false;
			//$("#lyrics-mobile").css("color","#867f7f");
			$("#lyrics-mobile").css("visibility","visible");
		}

	});

	$(".swal2-popup").css("height","50vh");


	if (lyricsExists){
		let songObj = SONGS[currentSong];
		$("#lyrics-text-mobile").html(`<span id="temp-song-name" class="w3-text-blue">${songObj.name}</span><br>`);
		$("#lyrics-text-mobile").append(`<br><span id="temp-artist-name" class="w3-text-gray artist-name">By ${songObj.artist}</span>`);
		$("#temp-song-name").css("font-size","2.5rem");
		$("#temp-artist-name").css("font-size","1.1rem");
	}
	if (!lyricsExists){
		$("#lyrics-text-mobile").html(`<span class="w3-text-danger">No lyrics for this song in our database</span>`)
	}



}


















function main(){
	page_load();
	extra();


}






$("document").ready(main());