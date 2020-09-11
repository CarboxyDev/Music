
function randint(min,max){
	let int = Math.floor(Math.random()*(max-min+1))+min;
	return int;

};




function shuffle(array) {
   	for (let i = array.length - 1; i > 0; i--) {
      	const j = Math.floor(Math.random() * (i + 1));
      	[array[i], array[j]] = [array[j], array[i]];
   	}
};



function clearSelection() {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
}




var colors = {red:"#ee2a13",blue:"#107ae4",green:"#0add37",
purple:"#7344b4",black:"#231c1c",lime:"#83f50a",pink:"#f50ac7",
yellow:"#ecf70d",wizard:"#581845",orangered:"#FF5733",
cyan:"#0df7de",darkgreen:"#188722",darkpurple:"#188722",
sky:"#8deee2",darkred:"#ff0000",bluegreen:"#00ffa6",
darkblue:"#0025dc",orange:"#fc8b03",bluepurple:"#9e49ef"
}

function random_color(){

  var color_list  = Object.keys(colors);
  var rnum = Math.random();
  var index  = Math.floor(rnum * color_list.length);

  var rkey    = color_list[index];

  return colors[rkey];
  

}




function blink(id,interval=1000){

  blink_obj = document.getElementById(id);
  let blinking = setInterval(function(){
    $(`#${id}`).css("visibility","hidden");
    setTimeout(function(){
      $(`#${id}`).css("visibility","visible");
    },500);
  },interval)
}












