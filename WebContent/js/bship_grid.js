
//function show_grid()
//{
	var i;
	var j; 
	var grid = document.getElementById('bship_grid');
	//grid.innerHTML = "TESTERINO22222222";
	//alert("coucou");
	grid.innerHTML = grid.innerHTML + "<tr>";
	$.get("bsg",
			{		
			},
			function(data, status){
				//alert("sup");
				for(i = 0; i < data.grid_size; i++)
					{
						for(j = 0; j < data.grid_size; j++)
							{
								grid.innerHTML = grid.innerHTML + "<td> hello world </td>"; 
							}
					}
			}
	);
	grid.innerHTML = grid.innerHTML + "</tr>";
	
	
	
	
//}