$.fn.progressPie.svgContentPlugin.stop = function(args) {
	var x = args.radius / 2;
	var rect = args.newSvgElement("rect");
	rect.setAttribute("x", -x);
	rect.setAttribute("y", -x);
	rect.setAttribute("width", 2*x);
	rect.setAttribute("height", 2*x);
	rect.setAttribute("style", "fill: " + args.color + "; stroke: none");
};

$.fn.progressPie.svgContentPlugin.pause = function(args) {
	var x = args.radius / 2;
	var rect = args.newSvgElement("rect");
	rect.setAttribute("x", -x);
	rect.setAttribute("y", -x);
	rect.setAttribute("width", x * 0.7);
	rect.setAttribute("height", 2*x);
	rect.setAttribute("style", "fill: " + args.color + "; stroke: none");
	
	rect = args.newSvgElement("rect");
	rect.setAttribute("x", x * 0.3);
	rect.setAttribute("y", -x);
	rect.setAttribute("width", x * 0.7);
	rect.setAttribute("height", 2*x);
	rect.setAttribute("style", "fill: " + args.color + "; stroke: none");
};