//la taille d'une case sera de 35*35
var i_case_size = 35;


// width="500" height="500"
//style="border:1px solid #000000;"

	

function draw_grid(size)
{
	var x = 0,y = 0;
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	c.width = size*i_case_size;
	c.height = size*i_case_size;
	
	for(x = 0; x < c.width ; x = x+i_case_size)
	{
		ctx.moveTo(x,0);
		ctx.lineTo(x,c.width);
		ctx.stroke();
	}
	for(y = 0; y < c.width ; y = y+i_case_size)
	{
		ctx.moveTo(0,y);
		ctx.lineTo(c.width,y);
		ctx.stroke();
	}

}

function grid_click()
{
	

}
