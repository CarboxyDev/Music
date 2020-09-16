
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

	html += "</div>";

	$("#main-mobile").hide();
	$("body").append(html);

	$(`.drawer-song-${currentSong}`).css("color","#10c326");

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

}