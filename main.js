var SONGS =  
{

	1:{
		name:"Lego house",
		artist:"Ed Sheeran",
		file:"lego_house",
		image:"lego_house"
	},

	2:{
		name:"Burning In The Skies",
		artist:"Linkin Park",
		file:"burning_in_the_skies",
		image:"burning_in_the_skies"
	}

}

var songTitle = document.getElementById("song_title");
var songImage = document.getElementById("img");
var currentSong = 1;

var song = new Audio();






function playSong(){

	song_obj = SONGS[currentSong];
	song.src = `songs/${song_obj.file}.mp3`;
	songImage.src = `images/${song_obj.image}.png`;
	console.log(song.src);
	$("#song_title").text(song_obj.name);

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




function playFirst(){
	$("#start").text("Pause");
	$("#start").attr("onclick",null);
	$("#start").attr("id","pause");
	$("#back").css("visibility","visible");
	$("#next").css("visibility","visible");

	playSong();
}






function main(){


}






$("document").ready(main());