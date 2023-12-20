import eigenLine from "../1_workshop/1_custom_line/js/line.js";
import Graph from "../1_workshop/1_custom_line/js/graph.js";



var ob2 = document.getElementById("canvas_1");
var sfy = 150;
var bmy = 360;
var slider_y = 490;



// Create a Two.js instance
var two = new Two({
  fullscreen: false,
  height:600,
}).appendTo(ob2);


var domian = new eigenLine(two, 50, 30, 420, 30, 4, "black");
var load = new eigenLine(two, 230, 5, 230, 25, 4, "black", "arrow", false, false);

//Upper blue rectangle inital
var points1 = [
  new Two.Anchor(50, sfy),
  new Two.Anchor(50, sfy-70),
  new Two.Anchor(230, sfy-70),
  new Two.Anchor(230, sfy),
];
//lower pink rectangle initial
var points2 = [
  new Two.Anchor(230, sfy),
  new Two.Anchor(230, sfy+70),
  new Two.Anchor(420, sfy+70),
  new Two.Anchor(420, sfy),
];
//third triangular reason
var points3 = [
    new Two.Anchor(50, bmy),
    new Two.Anchor(230, bmy-50),
    new Two.Anchor(420, bmy),
  ];

// Create a new instance of the Graph class
var graph1 = new Graph(two, points1, "#276BB0", "#276BB0", 0.5, 4);
var graph2 = new Graph(two, points2, "#C2185B", "#C2185B", 0.5, 4);
var graph3 = new Graph(two, points3, "#C2185B", "#C2185B", 0.5, 4);

var slider = new eigenLine(two,50, slider_y, 420, slider_y, 4, "black");
// slider.draw(two);

var mouse = new Two.Vector();
var yaxis = two.makeLine(230, 30, 230, slider_y);
yaxis.linewidth = 4;
yaxis.dashes = [20,10];
yaxis.noFill();
yaxis.stroke = "#0000002E";

var yaxis1 = two.makeLine(50, 30, 50, slider_y);
yaxis1.linewidth = 4;
yaxis1.dashes = [20,10];
yaxis1.noFill();
yaxis1.stroke = "#0000002E";

var yaxis2 = two.makeLine(420, 30, 420, slider_y);
yaxis2.linewidth = 4;
yaxis2.dashes = [20,10];
yaxis2.noFill();
yaxis2.stroke = "#0000002E";

//add text
var xlabel1 = two.makeText("Bending Moment", 25, 150);
xlabel1.rotation = -Math.PI/2;
var xlabel3= two.makeText("Shear Force",25,350);
xlabel3.rotation=-Math.PI/2;
var pos = two.makeText("x",230,50);
pos.size = 40;


two.add(xlabel1);


// Create a circle
var circle = two.makeCircle(230, slider_y, 10);

// Set the fill color of the circle
circle.fill = "#FFF";

circle.stroke = "#000000";
circle.linewidth = 3;

// Create a new instance of the Line class
var sf_y_axis = new eigenLine(two,35, sfy-80, 35, sfy+80, 4, "black");
var sf_x_axis = new eigenLine(two,50, sfy, 420, sfy, 4, "black");


// Create a new instance of the Line class
var bm_y_axis = new eigenLine(two,35, bmy-80, 35, bmy+80, 4, "black");
var bm_x_axis = new eigenLine(two,50, bmy, 420, bmy, 4, "black");

two.update();
// add touch events
ob2.addEventListener("touchstart", touchstart);
ob2.addEventListener("touchmove", touchmove);
ob2.addEventListener("touchend", touchend);

function touchstart(e) {
  e.preventDefault(); // prevent default touch behavior
  var touch = e.touches[0];
  pointerdown(touch);
}

function touchmove(e) {
  e.preventDefault(); // prevent default touch behavior
  var touch = e.touches[0];
  pointermove(touch);
}

function touchend(e) {
  e.preventDefault(); // prevent default touch behavior
  pointerup();
}


//add text in canvas

ob2.addEventListener("touchstart", pointerdown);
// slider 
ob2.addEventListener("pointerdown",pointerdown);
function pointerdown (e) {
   ob2.addEventListener("mousemove", pointermove );
   ob2.addEventListener("mouseup", pointerup);
}

function pointermove(e) {
  mouse.x = e.clientX - getOffset(ob2).left;
  mouse.y = e.clientY - getOffset(ob2).top;

  mouse.x = Math.min(mouse.x, 420);
  mouse.x = Math.max(mouse.x, 50);

  // var scale_y = (two.height - 4) / 3; // y will be -1.5 to 1.5
  // x = mouse.x / (two.width - 4) * 2 * Math.PI;
  // yy = (two.height - 4) / 2 + scale_y * Math.sin(x);

  yaxis.translation.set(mouse.x - 230, 0);
  circle.translation.set(mouse.x, slider_y);
  // dot.translation.set(mouse.x, yy);
  var ax = mouse.x;

  // Update the points of your path
  points1[2].x = ax;
  points1[3].x = ax;

  points2[0].x = ax;
  points2[1].x = ax;

  points3[1].x = ax;

  // Update the rendering
  //    curveFill.vertices = points;
  //    curvePath.vertices = points;

  two.update();
}


function pointerup(e){
  ob2.removeEventListener('mousemove', pointermove);
}


function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}


