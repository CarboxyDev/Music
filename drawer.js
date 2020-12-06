
function drawer(){

	var html = `<div id="drawer"> 
	<div id="drawer-main">
	<i id="home" class="fa fa-home" 
	onclick="player()"></i>
	</div>`;


	for (var id in SONGS){

		let obj = SONGS[id];

		let img_src = `images/${obj.image}.png`;
		let divHTML = `
		<div id="drawer-song-div" 
		onclick="drawerPlaySong(${id})">

			<img src="${img_src}" id="drawer-song-image" 
			alt="IMAGE ERROR"/>
			<div id="drawer-details"><br>
				<span id="drawer-song-name" 
				class="drawer-song-${id}">
				${obj.name}</span><br>
				<span id="drawer-artist-name">
				${obj.artist}</span>
			</div>
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
	<div id="drawer-blank">
	</div>
	<div id="miniplayer" class="">

		<img id="miniplayer-image" />
		<span id="miniplayer-song"></span>
		<span id="miniplayer-btn" 
		class="" onclick="playPauseMiniplayer()">
		<i class="fa fa-${mp_icon}"></i>
		</span>


	</div>
	`

	html += "</div>";

	$("#main").hide();
	$("body").append(html);

	$(`.drawer-song-${currentSong}`).css("color","#10c326");
	miniplayer();
}








function player(){

	$("#drawer").remove();
	$("#main").show();

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
	$("#miniplayer-image").attr("src",`images/${songObj.image}.png`);
	$("#miniplayer-song").html(`${songObj.name}`);
	$("#miniplayer-image").click(function(){
		player();
	});
}





function playPauseMiniplayer(){
	if (song.paused){
		song.play();
		$("#play").html(`<i class="fa fa-pause "></i>`);
		$("#miniplayer-btn").html(`<i class="fa fa-pause"></i>`);
		isPaused = false;
	}
	else {
		song.currentTime -= 1;
		song.pause();
		$("#play").html(`<i class="fa fa-play "></i>`);
		$("#miniplayer-btn").html(`<i class="fa fa-play"></i>`);
		isPaused = true;
	}
}
