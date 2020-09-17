
function drawer(){
	let html = `<div id="drawer"> 
	<div id="drawer-main-mobile">
	<i id="home-mobile" class="fa fa-home" 
	onclick="player()"></i>
	</div>`;


	for (var id in SONGS){
		let obj = SONGS[id];

		let img_src = `images/${obj.image}.png`;
		let divHTML = `
		<div id="drawer-song-div-mobile" 
		onclick="drawerPlaySong(${id})">

			<img src="${img_src}" id="drawer-song-image-mobile" 
			alt="IMAGE ERROR"/>

			<span id="drawer-song-name-mobile" 
			class="drawer-song-${id}">
			${obj.name}</span><br>
			<span id="drawer-artist-name-mobile">
			${obj.artist}</span>
		</div>
		`
	

		

		html += divHTML
	}
	if (isPaused){
		var mp_icon = "play";

	}
	else {
		var mp_icon = "pause";
	}
	html += `
	<div id="drawer-blank-mobile">
	</div>
	<div id="miniplayer-mobile" class="">

		<img id="miniplayer-image-mobile" />
		<span id="miniplayer-song-mobile"></span>
		<span id="miniplayer-btn-mobile" 
		class="" onclick="playPauseMiniplayer()">
		<i class="fa fa-${mp_icon}"></i>
		</span>


	</div>
	`

	html += "</div>";

	$("#main-mobile").hide();
	$("body").append(html);

	$(`.drawer-song-${currentSong}`).css("color","#10c326");
	miniplayer();
}








function player(){

	$("#drawer").remove();
	$("#main-mobile").show();

}


function drawerPlaySong(id){
	$(`.drawer-song-${currentSong}`).css("color","white");
	currentSong = id;
	$(`.drawer-song-${currentSong}`).css("color","#10c326");
	playSong();
	miniplayer();
}



function miniplayer(){
	let songObj = SONGS[currentSong];
	$("#miniplayer-image-mobile").attr("src",`images/${songObj.image}.png`);
	$("#miniplayer-song-mobile").html(`${songObj.name}`);
	$("#miniplayer-image-mobile").click(function(){
		player();
	});
}





function playPauseMiniplayer(){
	if (song.paused){
		song.play();
		$("#play").html(`<i class="fa fa-pause "></i>`);
		$("#miniplayer-btn-mobile").html(`<i class="fa fa-pause"></i>`);
		isPaused = false;
	}
	else {
		song.currentTime -= 1;
		song.pause();
		$("#play").html(`<i class="fa fa-play "></i>`);
		$("#miniplayer-btn-mobile").html(`<i class="fa fa-play"></i>`);
		isPaused = true;
	}
}
