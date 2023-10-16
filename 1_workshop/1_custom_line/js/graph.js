export default class Graph {
    constructor(two, points, curveColor, fillColor, fillOpacity, lineWidth) {
      // Get the canvas element and create a Two.js instance
      this.two = two;
  
      // Create Two.js paths for the curve and area
      this.curveFill = new Two.Path(points);
      this.curveFill.fill = fillColor;
      this.curveFill.opacity = fillOpacity;
  
      this.curvePath = new Two.Path(points);
      this.curvePath.stroke = curveColor;
      this.curvePath.linewidth = lineWidth;
      this.curvePath.noFill();
  
      // Add the paths to the Two.js instance and update the canvas
      this.two.add(this.curveFill);
      this.two.add(this.curvePath);
      this.two.update();
    }

    update(points) {
      // Update the points of your path
      this.curveFill.vertices = points;
      this.curvePath.vertices = points;
  
      // Update the rendering
      this.two.update();
    }
  }