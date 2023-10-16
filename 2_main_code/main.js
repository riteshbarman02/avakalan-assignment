import eigenLine from "../1_workshop/1_custom_line/js/line.js";
import Graph from "../1_workshop/1_custom_line/js/graph.js";



var ob2 = document.getElementById("canvas_1");

var sfy = 150;
var bmy = 360;
var slider_y = 490;


// Create a Two.js instance
var two = new Two({
  fullscreen: false,
  width: 500,
  height: 800,
}).appendTo(ob2);

var ax = 250;

var domian = new eigenLine(two, 50, 30, 450, 30, 4, "black");
var load = new eigenLine(two, ax, 5, ax, 25, 4, "black", "arrow", false, false);

//Upper blue rectangle inital
var points1 = [
  new Two.Anchor(50, sfy),
  new Two.Anchor(50, sfy-70),
  new Two.Anchor(ax, sfy-70),
  new Two.Anchor(ax, sfy),
];
//lower pink rectangle initial
var points2 = [
  new Two.Anchor(ax, sfy),
  new Two.Anchor(ax, sfy+70),
  new Two.Anchor(450, sfy+70),
  new Two.Anchor(450, sfy),
];
//third triangular reason
var points3 = [
    new Two.Anchor(50, bmy),
    new Two.Anchor(ax, bmy-50),
    new Two.Anchor(450, bmy),
  ];

// Create a new instance of the Graph class
var graph1 = new Graph(two, points1, "#276BB0", "#276BB0", 0.5, 4);
var graph2 = new Graph(two, points2, "#C2185B", "#C2185B", 0.5, 4);
var graph3 = new Graph(two, points3, "#C2185B", "#C2185B", 0.5, 4);

var slider = new eigenLine(two,50, slider_y, 450, slider_y, 4, "black");
// slider.draw(two);

var mouse = new Two.Vector();
var yaxis = two.makeLine(250, 30, 250, slider_y);
yaxis.linewidth = 4;
yaxis.noFill();
yaxis.stroke = "#0000002E";

// Create a circle
var circle = two.makeCircle(250, slider_y, 10);

// Set the fill color of the circle
circle.fill = "#FFF";

circle.stroke = "#000000";
circle.linewidth = 3;

// Create a new instance of the Line class
var sf_y_axis = new eigenLine(two,50, sfy-100, 50, sfy+100, 4, "black");
var sf_x_axis = new eigenLine(two,50, sfy, 450, sfy, 4, "black");


// Create a new instance of the Line class
var bm_y_axis = new eigenLine(two,50, bmy-100, 50, bmy+100, 4, "black");
var bm_x_axis = new eigenLine(two,50, bmy, 450, bmy, 4, "black");


// Render the Two.js instance
two.update();
// slider 
ob2.addEventListener("pointermove", pointermove , false);

function pointermove(e) {
  mouse.x = e.clientX - getOffset(ob2).left;
  mouse.y = e.clientY - getOffset(ob2).top;
  console.log(mouse.x, mouse.y);

  mouse.x = Math.min(mouse.x, 450);
  mouse.x = Math.max(mouse.x, 50);

  yaxis.translation.set(mouse.x - 250, 0);
  circle.translation.set(mouse.x, slider_y);
  ax = mouse.x;

  // Update the points of your path
  points1[2].x = ax;
  points1[3].x = ax;

  points2[0].x = ax;
  points2[1].x = ax;

  points3[1].x = ax;
  load.update(two,ax,ax);

  // Update the rendering
  graph1.update(points1);
  graph2.update(points2);
  graph3.update(points3);

  two.update();// update the renderer
}
// Add a resize event listener to the window object
window.addEventListener('resize', resize);

// Resize function
function resize() {
 // Calculate the new width and height of the graph
 var newWidth = window.innerWidth;
 var newHeight = window.innerHeight;

  // Update the width and height of the Two.js instance
  two.width = newWidth;
  two.height = newHeight;
 
 // Render the Two.js instance
 two.update();
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}
