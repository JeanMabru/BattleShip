function send(){
$.get(
		"test",
		{pseudo:$("#message").val()},
		function(result){
			$("#response").html(result.replace("<","&lt;").replace(">","&gt;"));});
}
function get(){
		$.get(
				"test",
				null,
				function(result){
					$("#response").html(result.replace("<","&lt;").replace(">","&gt;"));});
}
function getMap(){
	return $.ajax({
			type:"GET",
			url:"test",
			data:null,
			async:false
	}).responseJSON;
}