import eigenLine from "./js/line.js";
import Graph from "./js/graph.js";

var ob2 = document.getElementById("canvas_1");

var sfy = 150;
var bmy = 360;
var slider_y = 490;

// Create a Two.js instance
var two = new Two({
  fullscreen: true,
  fitted: true,
}).appendTo(ob2);

var ax = 250;

var domian = new eigenLine(two, 60, 30, 440, 30, 4, "black");
var load = new eigenLine(two, ax, 5, ax, 25, 4, "black", "arrow", false, false);

//domian.draw(two);
// load.draw(two)
// Define the points for the line

var points1 = [
  new Two.Anchor(60, sfy),
  new Two.Anchor(60, sfy-70),
  new Two.Anchor(ax, sfy-70),
  new Two.Anchor(ax, sfy),
];

var points2 = [
  new Two.Anchor(ax, sfy),
  new Two.Anchor(ax, sfy+70),
  new Two.Anchor(440, sfy+70),
  new Two.Anchor(440, sfy),
];

var points3 = [
    new Two.Anchor(60, bmy),
    new Two.Anchor(ax, bmy-50),
    new Two.Anchor(440, bmy),
  ];

// Create a new instance of the Graph class
var graph1 = new Graph(two, points1, "#276BB0", "#276BB0", 0.5, 4);
var graph2 = new Graph(two, points2, "#C218B", "#C2185B", 0.5, 4);
var graph3 = new Graph(two, points3, "#C218B", "#C2185B", 0.5, 4);

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
circle.fill = "#FFf";

circle.stroke = "#000000";
circle.linewidth = 3;

// Create a new instance of the Line class
var sf_y_axis = new eigenLine(two,50, sfy-100, 50, sfy+100, 4, "black");
var sf_x_axis = new eigenLine(two,50, sfy, 450, sfy, 4, "black");

// Draw the line on the Two.js canvas
// sf_x_axis.draw(two);
// sf_y_axis.draw(two);

// Create a new instance of the Line class
var bm_y_axis = new eigenLine(two,50, bmy-100, 50, bmy+100, 4, "black");
var bm_x_axis = new eigenLine(two,50, bmy, 450, bmy, 4, "black");

// Draw the line on the Two.js canvas
// bm_x_axis.draw(two);
// bm_y_axis.draw(two);

// Render the Two.js instance
two.update();

ob2.addEventListener("pointermove", pointermove, false);

function pointermove(e) {
  mouse.x = e.clientX - getOffset(ob2).left;
  mouse.y = e.clientY - getOffset(ob2).top;

  mouse.x = Math.min(mouse.x, 440);
  mouse.x = Math.max(mouse.x, 60);

  // var scale_y = (two.height - 4) / 3; // y will be -1.5 to 1.5
  // x = mouse.x / (two.width - 4) * 2 * Math.PI;
  // yy = (two.height - 4) / 2 + scale_y * Math.sin(x);

  yaxis.translation.set(mouse.x - 250, 0);
  circle.translation.set(mouse.x, slider_y);
  // dot.translation.set(mouse.x, yy);
  ax = mouse.x;

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

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}
