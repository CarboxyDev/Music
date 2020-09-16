
function drawer(){
	let html = `<div id="drawer-main-mobile">
	<i id="home-mobile" class="fa fa-home" 
	onclick="player()"></i>
	</div>`;


	for (var id in SONGS){
		let obj = SONGS[id]
		let img_src = `images/${obj.image}.png`;
		let divHTML = `
		<div id="drawer-song-div-mobile">
			<img src="${img_src}" id="drawer-song-image-mobile" 
			alt="IMAGE ERROR"/>

			<span id="drawer-song-name-mobile">
			${obj.name}</span><br>
			<span id="drawer-artist-name-mobile">
			${obj.artist}</span><br>
		</div>
		`

		html += divHTML
	}



	$("body").html("");
	$("body").html(html);

}




















function player(){
	let html = `



	`;
	$("body").html("");
	$("body").html("in progress");


}


