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

var domian = new eigenLine(two, 60, 30, 440, 30, 4, "black");
var load = new eigenLine(two, ax, 5, ax, 25, 4, "black", "arrow", false, false);

//Upper blue rectangle inital
var points1 = [
  new Two.Anchor(60, sfy),
  new Two.Anchor(60, sfy-70),
  new Two.Anchor(ax, sfy-70),
  new Two.Anchor(ax, sfy),
];
//lower pink rectangle initial
var points2 = [
  new Two.Anchor(ax, sfy),
  new Two.Anchor(ax, sfy+70),
  new Two.Anchor(440, sfy+70),
  new Two.Anchor(440, sfy),
];
//third triangular reason
var points3 = [
    new Two.Anchor(60, bmy),
    new Two.Anchor(ax, bmy-50),
    new Two.Anchor(440, bmy),
  ];

// Create a new instance of the Graph class
var graph1 = new Graph(two, points1, "#276BB0", "#276BB0", 0.5, 4);
var graph2 = new Graph(two, points2, "#C2185B", "#C2185B", 0.5, 4);
var graph3 = new Graph(two, points3, "#C2185B", "#C2185B", 0.5, 4);

var slider = new eigenLine(two,60, slider_y, 440, slider_y, 4, "black");
// slider.draw(two);

var mouse = new Two.Vector();
var yaxis = two.makeLine(250, 30, 250, slider_y);
yaxis.linewidth = 4;
yaxis.dashes = [20,10];
yaxis.noFill();
yaxis.stroke = "#0000002E";

var yaxis1 = two.makeLine(60, 30, 60, slider_y);
yaxis1.linewidth = 4;
yaxis1.dashes = [20,10];
yaxis1.noFill();
yaxis1.stroke = "#0000002E";

var yaxis2 = two.makeLine(440, 30, 440, slider_y);
yaxis2.linewidth = 4;
yaxis2.dashes = [20,10];
yaxis2.noFill();
yaxis2.stroke = "#0000002E";

//add text
var xlabel1 = two.makeText("Bending Moment", 25, 150);
xlabel1.rotation = -Math.PI/2;
var xlabel3= two.makeText("Shear Force",25,350);
xlabel3.rotation=-Math.PI/2;
var pos = two.makeText("x",250,50);
pos.size = 40;


two.add(xlabel1);


// Create a circle
var circle = two.makeCircle(250, slider_y, 10);

// Set the fill color of the circle
circle.fill = "#FFF";

circle.stroke = "#000000";
circle.linewidth = 3;

// Create a new instance of the Line class
var sf_y_axis = new eigenLine(two,40, sfy-80, 40, sfy+80, 4, "black");
var sf_x_axis = new eigenLine(two,60, sfy, 440, sfy, 4, "black");


// Create a new instance of the Line class
var bm_y_axis = new eigenLine(two,40, bmy-80, 40, bmy+80, 4, "black");
var bm_x_axis = new eigenLine(two,60, bmy, 440, bmy, 4, "black");

two.update();


//add text in canvas

// slider 
ob2.addEventListener("pointerdown",pointerdown);
function pointerdown (e) {
   ob2.addEventListener("pointermove", pointermove );
   ob2.addEventListener("pointerup", pointerup);
}

function pointermove(e) {
  mouse.x = e.clientX - getOffset(ob2).left;

  mouse.x = Math.min(mouse.x, 440);
  mouse.x = Math.max(mouse.x, 60);
  
  pos.translation.set(mouse.x,50);

  yaxis.translation.set(mouse.x - 250, 0);
  circle.translation.set(mouse.x, slider_y);
  ax = mouse.x;

  // Update the points of your path
  points1[2].x = ax;
  points1[3].x = ax;

  points2[0].x = ax;
  points2[1].x = ax;

  points3[1].x = ax;
  load.update(ax);
}

function pointerup(e){
  ob2.removeEventListener('pointermove', pointermove);
}


function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}
