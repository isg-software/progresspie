( function($) {
	var getSquareSize = function(args) {
		var x = args.radius;
		if (typeof args.maxSize === "number" && args.maxSize > 0) {
			x = Math.min(x, args.maxSize);
		}
		return x;
	};
	var setFill = function(obj, args) { 
		obj.setAttribute("style", "fill: " + args.color + "; stroke: none");
	};

	$.fn.progressPie.svgContentPlugin.stop = function(args) {
		var x = getSquareSize(args); //length of each side of the square
		var r = x/2; //"radius" of the square, i.e. half its size length
		var rect = args.newSvgElement("rect");
		rect.setAttribute("x", -r);
		rect.setAttribute("y", -r);
		rect.setAttribute("width", x);
		rect.setAttribute("height", x);
		setFill(rect, args);
	};

	$.fn.progressPie.svgContentPlugin.pause = function(args) {
		var x = getSquareSize(args);
		var r = x/2;
		var rect = args.newSvgElement("rect");
		rect.setAttribute("x", -r);
		rect.setAttribute("y", -r);
		rect.setAttribute("width", r * 0.7);
		rect.setAttribute("height", x);
		setFill(rect, args);
	
		rect = args.newSvgElement("rect");
		rect.setAttribute("x", r * 0.3);
		rect.setAttribute("y", -r);
		rect.setAttribute("width", r * 0.7);
		rect.setAttribute("height", x);
		setFill(rect, args);
	};

	$.fn.progressPie.svgContentPlugin.play = function(args) {
		var x = getSquareSize(args);
		var r = x/2;
		var play = args.newSvgElement("path");
		//pythagoras: (2r)^2 = r^2 + w^2   with w being the horizontal width of the triangle and r being half the length of its sides.
		// w^2 = 3 r^3
		//   w = sqrt(3) r = 1.732 r
		// left = w - r = 0.732 r:
		var left = -0.732 * r;
		r = r * 1.2; //Since the triangle is only half in area compared to the "stop" square, enlarge it "a bit"
		//(Even if the minimum circle surrounding this triangle is now greater in diameter than those of the "stop" or "pause" symbol,
		// it's still smaller than the inner radius of the ring.)
		play.setAttribute("d", "M"+left+",-"+r+" L"+r+",0 L"+left+","+r+" Z");
		setFill(play, args);
	};
} (jQuery));