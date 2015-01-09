//la taille d'une case sera de 35*35
var i_case_size = 35;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var grid_array = [];


window.addEventListener('click', alert_pos, false);
window.addEventListener('click', getMousePos, false);
window.addEventListener('click', change_status, false);

//cette fonction trace les bordures et notre tableau et stock toutes les cases dans un array.
//TODO tout reecrire dans le servlet, pour que les operations se fassent coté server
function draw_grid(size)
{
	var x = 0,y = 0;
	var i = 0;
				
				
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
	x = 0;
	y = 0;
	do{
		for(x = 0; x < canvas.width; x = x + i_case_size)
		{
			var grid_array_case = {x:0, y:0, status:0};
			grid_array_case.x = x;
			grid_array_case.y = y;
			grid_array_case.status = 0;
			grid_array.push(grid_array_case);
			//alert("x is equal to " + x);
			if(x + i_case_size == canvas.width){
				y = y + i_case_size;
				//alert("y is equal to " + y);
			}
		}
	}while(y<canvas.width);
					
		/*for(i = 0; i < grid_array.length; i++)
		{
			alert("Grid " + i + "(x;y;status) is (" + grid_array[i].x + ";" + grid_array[i].y + ";" + grid_array[i].status + ")");			
		}*/
}

//fonction useless qui affiche en alert la position du clique souris
function alert_pos(e)
{
	var pos = getMousePos(e);
    posx = pos.x;
    posy = pos.y;
	//alert(posx);
	//alert(posy);
}

function change_status(e)
{
	/*grid_array[5].status = 1;
	grid_array[6].status = 1;
	grid_array[7].status = 1;
	grid_array[19].status = 1;
	grid_array[20].status = 1;*/
	
	var pos = getMousePos(e);
	posx = pos.x;
	posy = pos.y;
	for(i = 0; i < grid_array.length; i++)
	{
		//alert("Grid " + i + "(x;y;status) is (" + grid_array[i].x + ";" + grid_array[i].y + ";" + grid_array[i].status + ")");
		if( (posx > grid_array[i].x) && (posx < grid_array[i].x + i_case_size) && (posy > grid_array[i].y) && (posy < grid_array[i].y + i_case_size) )
		{
			ctx.beginPath();
			ctx.rect(grid_array[i].x, grid_array[i].y, i_case_size, i_case_size);
			if(grid_array[i].status == 0)
			{
				ctx.fillStyle = "blue";
			}
			if(grid_array[i].status == 1)
			{
				ctx.fillStyle = "red";
			}
			ctx.fill();
		}
	}
	//on envoie notre array au servlet en JSON. 
	//on adapte le format de l'array pour que le stringify fonctionne
	var grid_JSON = [];
	function func_grid_JSON()
	{
		return{
			JSONx:"",
			JSONy:"",
			JSONstatus:"",
		}
	};
	for(i = 0; i < grid_array.length; i++)
	{
		var gr = func_grid_JSON();
		
		gr.JSONx = grid_array[i].x;
		gr.JSONy = grid_array[i].y;
		gr.JSONstatus = grid_array[i].status;
		grid_JSON.push(gr);
	}
	
	
	$.post("bsg",
		{
			grid: JSON.stringify(grid_JSON),
		});
			
	
	
}


//fonction permettant de recuperer la position du clique souris
function getMousePos(e) {
	var x, y;
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}

