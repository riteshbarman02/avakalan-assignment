// line.js
export default class eigenLine {
  constructor(two, x1, y1, x2, y2, lineWidth, color, lineEndsType="bar",startLineEnd=true,endLineEnd=true)
   {

    this.two = two;

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.lineWidth = lineWidth;
    this.color = color;
    this.lineEndsType = lineEndsType;
    this.startLineEnd = startLineEnd;
    this.endLineEnd = endLineEnd;


    // Create a Two.js path for the line
    this.line = two.makeLine(this.x1, this.y1, this.x2, this.y2);
    this.line.linewidth = this.lineWidth; // Line width
    this.line.stroke = this.color; // Line color
    this.line.opacity = 1;

    // Create a new instance of the eigenLineEnds class
   this.lineEnds = new eigenLineEnds(this.x1, this.y1, this.x2, this.y2, this.lineWidth, this.color,this.startLineEnd,this.endLineEnd);

    // Draw the line ends
    // lineEnds.draw_arrow(two);
    if (this.lineEndsType=="arrow") {
      this.lineEnds.draw_arrow(two);
    }
    else if (this.lineEndsType=="bar") {
    this.lineEnds.draw_bar(two);
    }

    this.two.update();
 }


  update(two,x1,x2){
    this.line.vertices[0].x=x1;
    this.line.vertices[1].x=x2;
    this.lineEnds.x1=x1;
    this.lineEnds.x2=x2;
    // if (this.lineEndsType=="arrow") {
    //   this.lineEnds.draw_arrow(two);
    // }
    // else if (this.lineEndsType=="bar") {
    // this.lineEnds.draw_bar(two);
    // }

    this.two.update();
  }

}

class eigenLineEnds {
  constructor(x1, y1, x2, y2, lineWidth, color,startLineEnd=true,endLineEnd=true) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.lineWidth = lineWidth;
    this.color = color;
    this.startLineEnd = startLineEnd;
    this.endLineEnd = endLineEnd;
  }

  draw_bar(two) {
    // Calculate the angle of the line
    var angle = Math.atan2(this.y2 - this.y1, this.x2 - this.x1) + Math.PI / 2;
  
    // Calculate the bar length at each end
    var barLength = this.lineWidth * 2;
  
    // Calculate the coordinates of the bar ends
    var bar1_x1 = this.x1 - barLength * Math.cos(angle);
    var bar1_y1 = this.y1 - barLength * Math.sin(angle);
    var bar1_x2 = this.x1 + barLength * Math.cos(angle);
    var bar1_y2 = this.y1 + barLength * Math.sin(angle);
  
    var bar2_x1 = this.x2 - barLength * Math.cos(angle);
    var bar2_y1 = this.y2 - barLength * Math.sin(angle);
    var bar2_x2 = this.x2 + barLength * Math.cos(angle);
    var bar2_y2 = this.y2 + barLength * Math.sin(angle);
  
    // Create bars at the starting and ending points
    var bar;
    if (this.startLineEnd) {
      bar = two.makeLine(bar1_x1, bar1_y1, bar1_x2, bar1_y2);
      bar.linewidth = this.lineWidth; // Bar width
      bar.stroke = this.color; // Bar color
    }
    if (this.endLineEnd) {
      bar = two.makeLine(bar2_x1, bar2_y1, bar2_x2, bar2_y2);
      bar.linewidth = this.lineWidth; // Bar width
      bar.stroke = this.color; // Bar color
    }
  }

  draw_arrow(two) {
    // Calculate the angle of the line
    var angle = Math.atan2(this.y2 - this.y1, this.x2 - this.x1);
  
    // Calculate the length of the arrow
    var arrowLength = this.lineWidth * 2;
  
    // Calculate the coordinates of the arrow points
    var arrow1_x1 = this.x1 + arrowLength * Math.cos(angle - Math.PI / 4);
    var arrow1_y1 = this.y1 + arrowLength * Math.sin(angle - Math.PI / 4);
    var arrow1_x2 = this.x1 - this.lineWidth/2 * Math.cos(angle - Math.PI / 4);
    var arrow1_y2 = this.y1 - this.lineWidth/2 * Math.sin(angle - Math.PI / 4);
    var arrow1_x3 = this.x1 + arrowLength * Math.cos(angle + Math.PI / 4);
    var arrow1_y3 = this.y1 + arrowLength * Math.sin(angle + Math.PI / 4);

   var arrow2_x1 = this.x2 - arrowLength * Math.cos(angle - Math.PI / 4);
   var arrow2_y1 = this.y2 - arrowLength * Math.sin(angle - Math.PI / 4);
   var arrow2_x2 = this.x2 + this.lineWidth/2 * Math.cos(angle - Math.PI / 4);
   var arrow2_y2 = this.y2 + this.lineWidth/2 * Math.sin(angle - Math.PI / 4);
   var arrow2_x3 = this.x2 - arrowLength * Math.cos(angle + Math.PI / 4);
   var arrow2_y3 = this.y2 - arrowLength * Math.sin(angle + Math.PI / 4);
  
   
    // Create arrows at the starting and ending points
    var bar1, bar2;
    if (this.startLineEnd) {
      bar1 = two.makeLine(arrow1_x1, arrow1_y1, arrow1_x2, arrow1_y2);
      bar2 = two.makeLine(arrow1_x3, arrow1_y3, this.x1, this.y1);
      bar1.linewidth = this.lineWidth; // Bar width
      bar1.stroke = this.color; // Bar color
      bar2.linewidth = this.lineWidth; // Bar width
      bar2.stroke = this.color; // Bar color
    }
    if (this.endLineEnd) {
      bar1 = two.makeLine(arrow2_x1, arrow2_y1, arrow2_x2, arrow2_y2);
      bar2 = two.makeLine(arrow2_x3, arrow2_y3, this.x2, this.y2);

      bar1.linewidth = this.lineWidth; // Bar width
      bar1.stroke = this.color; // Bar color
      bar2.linewidth = this.lineWidth; // Bar width
      bar2.stroke = this.color; // Bar color
    }
  }
}