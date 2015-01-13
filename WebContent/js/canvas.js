//la taille d'une case sera de 35*35
var i_case_size = 35;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var grid_array = [];

var img1 = new Image();
var img2 = new Image();
var img3 = new Image();
img1.src = "./images/boat1_1.png";
img2.src = "./images/boat1_2.png";
img3.src = "./images/boat1_3.png";




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
			
				
	for(x = 0; x < canvas.width ; x = x + i_case_size)
	{
		ctx.moveTo(x,0);
		ctx.lineTo(x,canvas.width);
		ctx.stroke();
	}
	for(y = 0; y < canvas.width ; y = y + i_case_size)
	{
		ctx.moveTo(0,y);
		ctx.lineTo(canvas.width,y);
		ctx.stroke();
	}
	x = 0;
	y = 0;
	i = 0;
	do{
		for(x = 0; x < canvas.width; x = x + i_case_size)
		{
			var grid_array_case = {id:0, x:0, y:0, status:0};
			grid_array_case.id = i;
			grid_array_case.x = x;
			grid_array_case.y = y;
			grid_array_case.status = 1;
			i++;
			grid_array.push(grid_array_case);
			//alert("x is equal to " + x);
			if(x + i_case_size == canvas.width){
				y = y + i_case_size;
				//alert("y is equal to " + y);
			}
		}
	}while(y<canvas.width);
}

//function for the boats, draws the colomns inside the boxes
function draw_ship_col(input_canvas)
{
	var canvas_inter = document.getElementById(input_canvas);
	var ctx_inter = canvas_inter.getContext("2d");
	
	var x = 0;
	for(x = 0; x < canvas_inter.width ; x = x + i_case_size)
	{
		//ctx_inter.rect(x, 0, i_case_size, i_case_size);
		if(x == 0)
		{
			ctx_inter.drawImage(img1,x,0);
		}
		if(x > 0 && x + i_case_size < canvas_inter.width)
		{
			ctx_inter.drawImage(img2,x,0);
		}
		if(x + i_case_size == canvas_inter.width)
		{
			ctx_inter.drawImage(img3,x,0);
		}
		
	}
	/*ctx_inter.beginPath();
	ctx_inter.rect(grid_array[0].x, grid_array[0].y, i_case_size, i_case_size);
	ctx_inter.drawImage(img,grid_array[0].x,grid_array[0].y);*/
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
		if( (posx > grid_array[i].x) && (posx < grid_array[i].x + i_case_size) && (posy > grid_array[i].y) && (posy < grid_array[i].y + i_case_size) )
		{
			//alert("la case modif est la : " + grid_array[i].id);
			
			//envoie de la case modifié uniquement au servlet en JSON
			var grid_JSON = [];
			function func_grid_JSON()
			{
				return{
					JSONid:"",
					JSONx:"",
					JSONy:"",
					JSONstatus:"",
				}
			};
			
			var gr = func_grid_JSON();
			
			gr.JSONid = grid_array[i].id;
			gr.JSONx = grid_array[i].x;
			gr.JSONy = grid_array[i].y;
			gr.JSONstatus = grid_array[i].status;
			grid_JSON.push(gr);
			
			$.post("bsg",
					{
						grid: JSON.stringify(grid_JSON),
					});			
			
			
			ctx.beginPath();
			ctx.rect(grid_array[i].x, grid_array[i].y, i_case_size, i_case_size);
			if(grid_array[i].status == 1 || grid_array[i].status == 2)
			{
				grid_array[i].status = 2
				//ctx.drawImage(img,grid_array[i].x,grid_array[i].y);
				ctx.fillStyle = "blue";
			}
			if(grid_array[i].status == 3 || grid_array[i].status == 4)
			{
				grid_array[i].status = 4;
				ctx.fillStyle = "red";
			}
			ctx.fill();
		}
	}
	//on envoie notre array au servlet en JSON. 
	//on adapte le format de l'array pour que le stringify fonctionne
	/*var grid_JSON = [];
	function func_grid_JSON()
	{
		return{
			JSONid:"",
			JSONx:"",
			JSONy:"",
			JSONstatus:"",
		}
	};
	for(i = 0; i < grid_array.length; i++)
	{
		var gr = func_grid_JSON();
		
		gr.JSONid = grid_array[i].id;
		gr.JSONx = grid_array[i].x;
		gr.JSONy = grid_array[i].y;
		gr.JSONstatus = grid_array[i].status;
		grid_JSON.push(gr);
	}
	
	$.post("bsg",
		{
			grid: JSON.stringify(grid_JSON),
		});
		*/
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


function place_ship(ship_id, ship_num)
{
	var horizontal = true;
	var div = document.getElementById("formulaire_ship_"+ship_id+"_"+ship_num);
	
		//le bateau sera t-il placé horizontalement (bateau taille 2,4 et 5)
		if(document.getElementById('place_ship_'+ship_id+'_'+ship_num+'_1').checked) {
			horizontal = true;
		}
		//else -> si pas horizontal => vertical forcement
		else{
			horizontal = false;
		}	
		var cases = document.getElementById('place_ship_'+ship_id+'_'+ship_num+'_3');
		var placage = cases.options[cases.selectedIndex].value;

		var x = grid_array[placage].x;
		var y = grid_array[placage].y;
		var i,j;
		if(horizontal == true)
		{
			for(i = 0; i < ship_id ; i++)
			{
				if(i == 0)
				{
					ctx.drawImage(img1,x + i*i_case_size, y);
					for(j = 0; j < grid_array.length; j++)
					{
						if((grid_array[j].x == (x + i*i_case_size)) && (grid_array[j].y == y))
						{
							grid_array[j].status = 3;
						}
					}
				}
				if(i > 0 && i < ship_id)
				{
					ctx.drawImage(img2,x + i*i_case_size, y);
					for(j = 0; j < grid_array.length; j++)
					{
						if((grid_array[j].x == (x + i*i_case_size)) && (grid_array[j].y == y))
						{
							grid_array[j].status = 3;
						}
					}
				}
				if(i + 1 == ship_id)
				{
					ctx.drawImage(img3,x + i*i_case_size, y);
					for(j = 0; j < grid_array.length; j++)
					{
						if((grid_array[j].x == (x + i*i_case_size)) && (grid_array[j].y == y))
						{
							grid_array[j].status = 3;
						}
					}
				}
			}
		}
		else{
			for(i = 0; i < ship_id ; i++)
			{
				if(i == 0)
				{
					ctx.drawImage(img1,x, y + i*i_case_size);
					for(j = 0; j < grid_array.length; j++)
					{
						if((grid_array[j].x == x) && (grid_array[j].y == ((y + i*i_case_size))))
						{
							grid_array[j].status = 3;
						}
					}
				}
				if(i > 0 && i < ship_id)
				{
					ctx.drawImage(img2,x, y + i*i_case_size);
					for(j = 0; j < grid_array.length; j++)
					{
						if((grid_array[j].x == x) && (grid_array[j].y == ((y + i*i_case_size))))
						{
							grid_array[j].status = 3;
						}
					}
				}
				if(i + 1 == ship_id)
				{
					ctx.drawImage(img3,x, y + i*i_case_size);
					for(j = 0; j < grid_array.length; j++)
					{
						if((grid_array[j].x == x) && (grid_array[j].y == ((y + i*i_case_size))))
						{
							grid_array[j].status = 3;
						}
					}
				}
			}
			
		}
		div.innerHTML = null;		
}

function place_ship_position(html_elem_id)
{
	var i = 0;
	var j = 0;
	var y = 0;
	var id_case = 0;
	var Alph = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var div = document.getElementById(html_elem_id);
	
	
	do{
		for(x = 0; x < canvas.width ; x = x + i_case_size)
		{
			
			div.innerHTML = div.innerHTML + "<option value='"+id_case+"'>"+Alph[j]+(i+1)+"</option>";
			//alert("<option value='"+id_case+"'>"+Alph[j]+(i+1)+"</option>");
			i++;
			id_case++;
			
		}
		j++;
		i = 0;
		y = y + i_case_size;
		
	}while(y < canvas.width);	
}


