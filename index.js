$(document).ready(function() {
	var windowView = {'width': window.screen.availWidth,
					  'height': window.screen.availHeight};
	var cubeSpan   = {'x': 4,
				      'y': 4};

	var universe = new Universe(windowView, cubeSpan);
});

var Universe = function(windowView, cubeSpan) {
	// Constants of nature.
	this.x_span    = cubeSpan.x;
	this.y_span    = cubeSpan.y;
	this.x_horizon = windowView.width;
	this.y_horizon = windowView.height;

	this.x_unit = parseInt(this.x_horizon / this.x_span);
	this.y_unit = parseInt(this.y_horizon / this.y_span);
	
	this.viewport = $('#viewport');
	this.god = new CubeGod(this);
};

var CubeGod = function(laws) {
	this.on = genesis();

	function genesis() {
		var x, y    = 0;
		var reciept = [];
		while ((x < laws.x_span) || (y < laws.y_span)) {
			var row = 'row_' + y;
			if (x >= laws.x_span) {
				y++;
				x = 0;
			} else {
				// Create div tray and fill with cubes.
				jQuery('<div/>', {'id': row}).appendTo(this.viewport);
				for (x = 0; x < laws.x_span; x++) {
					this.seed = {'x': laws.x_unit,
				 		         'y': laws.y_unit,
				     		    'id': x + '.' + y,
						      'name': 'cube.' + x + '.' + y,
							 'fresh': true,
						    'nodeID': x + '.' + y};
					reciept.push(CubeBuild(this));
				}
			}
		}
		return reciept;
	};
};

var CubeBuild = function() {
	this.style = Style(seed);
	jQuery('<div/>', {'id': this.seed.name,
				   'style': this.style}).appendTo(this.viewport);	
	var result = $(seed.name);
	console.log(result);
	return result;
};

var Style = function(seed) {
	var style_list = [{'name': 'width:',  'key': 'x'}, 
					  {'name': 'height:', 'key': 'y'}];
	return (function() {
		var style = 'style=\"';
		for (var i = 0; i < style_list.length; i++) {
			var e = style_list[i];
			var value = seed[e['key']];
			style += e['name'] + value + ';';
		}

		return style += '\" ';
	});
}