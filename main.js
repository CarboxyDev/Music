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

var song = new Audio();


song.addEventListener('timeupdate',function(){
	console.log(song.currentTime);
	var pos = song.currentTime / song.duration;
	fillBar.style.width = pos*100+"%";


});

song.addEventListener("ended",function(){

	playSong()
})





function playSong(){

	song_obj = SONGS[currentSong];
	console.log(song_obj);
	if (song_obj == undefined){
		if (currentSong < 1){
			currentSong = Object.keys(SONGS).length;
		}
		else {
			currentSong = 1;
		}
		
		song_obj = SONGS[currentSong];

	}
	if (!song_obj.image){
		song_obj.image = "main"
	}
	songImage.src = `images/${song_obj.image}.png`;
	song.src = `songs/${song_obj.file}.mp3`;
	
	if (!IS_MOBILE){
		$("#song_title").text(song_obj.name);
	}
	else if (IS_MOBILE){
		$("#song_title-mobile").text(song_obj.name);
		$("#artist_name-mobile").text(song_obj.artist);
	}
	

	song.play();


}




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
		$("#play").html(`<i class="fa fa-pause"></i>`);
	}
	else {
		song.pause();
		$("#play").html(`<i class="fa fa-play"></i>`);
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
	}

	$("#play").attr("onclick","playPause()");

	playSong();
}






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



	songTitle = document.getElementById("song_title-mobile");
	songImage = document.getElementById("img-mobile");
	var fillBar = document.getElementById("fill-mobile");

}

















function main(){
	page_load();
	


}






$("document").ready(main());