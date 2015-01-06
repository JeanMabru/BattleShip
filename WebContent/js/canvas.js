//la taille d'une case sera de 35*35
var i_case_size = 35;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

window.addEventListener('mousedown', alert_pos, false);
window.addEventListener('mousedown', getMousePos, false);

// width="500" height="500"
//style="border:1px solid #000000;"

	

function draw_grid(size)
{
	var x = 0,y = 0;
	
	
	canvas.width = size*i_case_size;
	canvas.height = size*i_case_size;

	
	for(x = 0; x < canvas.width ; x = x+i_case_size)
	{
		ctx.moveTo(x,0);
		ctx.lineTo(x,canvas.width);
		ctx.stroke();
	}
	for(y = 0; y < canvas.width ; y = y+i_case_size)
	{
		ctx.moveTo(0,y);
		ctx.lineTo(canvas.width,y);
		ctx.stroke();
	}

}


function alert_pos(e)
{
	var pos = getMousePos(e);
    posx = pos.x;
    posy = pos.y;
	alert(posx);
	alert(posy);
}



function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

