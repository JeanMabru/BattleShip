//la taille d'une case sera de 35*35
var i_case_size = 35;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var grid_array = [];

var canvas_num = document.getElementById("ligne_chiffre");
var canvas_letters = document.getElementById("colomn_letter");
var ctx_num = canvas_num.getContext("2d");
var ctx_letter = canvas_letters.getContext("2d");


var img1 = new Image();
var img2 = new Image();
var img3 = new Image();
img1.src = "./images/boat1_1.png";
img2.src = "./images/boat1_2.png";
img3.src = "./images/boat1_3.png";



canvas.addEventListener('click', alert_pos, false);
canvas.addEventListener('click', getMousePos, false);
canvas.addEventListener('click', change_status, false);

var Alph = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var Numer = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26"];
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

function draw_grid_outlines(size)
{
	var i;
	var j = 0;
	canvas_num.width = (size+1)*i_case_size;
	canvas_num.height = i_case_size;
	canvas_letters.width = i_case_size;
	canvas_letters.height = size*i_case_size;
	
	for(i = i_case_size; i < canvas_num.width; i = i + i_case_size)
	{
		ctx_num.font = "20px Arial";
		//alert(Numer[j]);
		ctx_num.fillText(Numer[j],i+12,30);
		j++;
	}
	j = 0;
	for(i = 1; i <= canvas_letters.height; i = i + i_case_size)
	{
		ctx_letter.font = "20px Arial";
		//alert(Numer[j]);
		ctx_letter.fillText(Alph[j],10,i+23);
		j++;
	}
	
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


function place_ship(ship_id, ship_num, size)
{
	var b_horizontal = true;
	var div = document.getElementById("formulaire_ship_"+ship_id+"_"+ship_num);
	var b_can_i_place = 0;

	
	//le bateau sera t-il placé horizontalement (bateau taille 2,4 et 5)
	if(document.getElementById('place_ship_'+ship_id+'_'+ship_num+'_1').checked) {
		b_horizontal = true;
	}
	//else -> si pas horizontal => vertical forcement
	else{
		b_horizontal = false;
	}	
	var cases = document.getElementById('place_ship_'+ship_id+'_'+ship_num+'_3');
	var placage = cases.options[cases.selectedIndex].value;
	var x = grid_array[placage].x;
	var y = grid_array[placage].y;
	var i,j,k;
	placage = parseInt(placage);
	x = parseInt(x);
	ship_id = parseInt(ship_id);
	y = parseInt(y);
	

	//test de si le bateau rentrera sur le tableau
		//horizontal
		if(b_horizontal == true)
		{
			
			//DEBUT DES CONDITIONS DE PLACAGE DE BOAT
			if((x + i_case_size*ship_id) > canvas.width)
			{
				alert("You cannot place your ship here. More space is required");
				b_can_i_place = 1;
			}
			//on test ce if a chaque fois pour eviter les boucles for lorsqu'elles sont inutiles
			if(b_can_i_place == 0)
			{
				//test si la case possede deja un bateau
				for(k = 0; k < ship_id; k++)
				{
					//si la case choisi possede deja un bateau (comparer en passant par les id marche que pour l'horizontal)
					if(grid_array[(placage + k)].status == 3)
					{
						b_can_i_place = 1;
						//to show alert only once
						if(k+1 == ship_id)
						{
							alert("The boat you are trying to place has a position that is already occupied by another boat. Please place it elsewhere.");
						}
					}
				}
			}
			if(b_can_i_place == 0)
			{
				//test pour voir si un bateau est trop pres de celui qu l'on veux placer
				for(k = 0; k < ship_id; k++)
				{
					for(i = 0; i < grid_array.length; i++)
					{
						if(((grid_array[(placage + k)].y + i_case_size) == grid_array[i].y) && (grid_array[(placage + k)].x == grid_array[i].x) && b_can_i_place == 0)
						{
							if(grid_array[i].status == 3)
							{
								b_can_i_place = 1;
							}
						}
						if(((grid_array[(placage + k)].y - i_case_size) == grid_array[i].y) && (grid_array[(placage + k)].x == grid_array[i].x) && b_can_i_place == 0)
						{
							if(grid_array[i].status == 3)
							{
								b_can_i_place = 1;
							}
						}
						if(((grid_array[(placage + k)].y) == grid_array[i].y) && (grid_array[(placage + k)].x - i_case_size == grid_array[i].x) && b_can_i_place == 0)
						{
							if(grid_array[i].status == 3)
							{
								b_can_i_place = 1;
							}
						}
						if(((grid_array[(placage + k)].y) == grid_array[i].y) && (grid_array[(placage + k)].x + i_case_size == grid_array[i].x) && b_can_i_place == 0)
						{
							if(grid_array[i].status == 3)
							{
								b_can_i_place = 1;
							}
						}
					}
				}
				if(b_can_i_place == 1)
				{
					alert("The boat you are trying to place would be to close to an existing boat. Please place it elsewhere.");
				}
			}
			
			
			
			
					//tte les conditions sont respectés. on place le bateau (horizontal)
					if(b_can_i_place == 0)
					{
						for(i = 0; i < ship_id ; i++)
						{
							if(i == 0)
							{
								ctx.drawImage(img1,x + i*i_case_size, y);
								//les 'for' change les status des cases a 3 -> un bateau est present sur la case.
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
						div.innerHTML = null;
					}
		}
		//vertical
		else{
			if((y + i_case_size*ship_id) > canvas.width)
			{
				alert("You cannot place your ship here. More space is required");
				b_can_i_place = 1;
			}
			
			if(b_can_i_place == 0)
			{
				//test si la case possede deja un bateau
				for(k = 0; k < ship_id; k++)
				{
					//alert("valeur: " + grid_array[(placage + k*size)].status);
					//si la case choisi possede deja un bateau (comparer en passant par les id marche que pour l'horizontal)
					if(grid_array[(placage + k*size)].status == 3)
					{
						b_can_i_place = 1;
						//to show alert only once
						if(k+1 == ship_id)
						{
							alert("The boat you are trying to place has a position that is already occupied by another boat. Please place it elsewhere.");
						}
					}
				}
			}
			if(b_can_i_place == 0)
			{
				//test pour voir si un bateau est trop pres de celui qu l'on veux placer
				for(k = 0; k < ship_id; k++)
				{
					for(i = 0; i < grid_array.length; i++)
					{
						if(((grid_array[(placage + k*size)].y + i_case_size) == grid_array[i].y) && (grid_array[(placage + k*size)].x == grid_array[i].x) && b_can_i_place == 0)
						{
							if(grid_array[i].status == 3)
							{
								b_can_i_place = 1;
							}
						}
						if(((grid_array[(placage + k*size)].y - i_case_size) == grid_array[i].y) && (grid_array[(placage + k*size)].x == grid_array[i].x) && b_can_i_place == 0)
						{
							//alert("numero1");
							if(grid_array[i].status == 3)
							{
								b_can_i_place = 1;
							}
						}
						if(((grid_array[(placage + k*size)].y) == grid_array[i].y) && (grid_array[(placage + k*size)].x - i_case_size == grid_array[i].x) && b_can_i_place == 0)
						{
							if(grid_array[i].status == 3)
							{
								b_can_i_place = 1;
							}
						}
						if(((grid_array[(placage + k*size)].y) == grid_array[i].y) && (grid_array[(placage + k*size)].x + i_case_size == grid_array[i].x) && b_can_i_place == 0)
						{
							if(grid_array[i].status == 3)
							{
								b_can_i_place = 1;
							}
						}
					}
				}
				if(b_can_i_place == 1)
				{
					alert("The boat you are trying to place would be to close to an existing boat. Please place it elsewhere.");
				}
			}
			
			
			
					//tte les conditions sont respectés. on place le bateau (vertical)
					if(b_can_i_place == 0)
					{
						for(i = 0; i < ship_id ; i++)
						{
							if(i == 0)
							{
								ctx.drawImage(img1,x, y + i*i_case_size);
								//les 'for' change les status des cases a 3 -> un bateau est present sur la case.
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
						div.innerHTML = null;
					}
		}
	b_can_i_place = 0;
}

function place_ship_position(html_elem_id)
{
	var i = 0;
	var j = 0;
	var y = 0;
	var id_case = 0;
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


