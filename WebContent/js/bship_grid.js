
//function show_grid()
//{
	var grid = document.getElementById('bship_grid');
	//grid.innerHTML = "TESTERINO22222222";
	//alert("coucou");
	$.get("bsg",
			{		
			},
			function(data, status){
				//alert("sup");
				alert(data.grid_size);
			}
	);
	
	
	
	
//}