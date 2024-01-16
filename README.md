# Interactive Two.js Graph with Perpendicular Bar Ends

This project showcases an interactive graph using the Two.js library, allowing users to manipulate lines and shapes with perpendicular bar ends. The graph represents bending moments, shear forces, and a triangular region.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Responsive Design](#responsive-design)
- [Variables](#variables)
- [Touch Events](#touch-events)
- [Contributing](#contributing)
- [License](#license)

## Installation

To run the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/riteshbarman02/avakalan-assignment
    ```

2. Open the `2_main_code` file in your editor.

## Usage

The graph consists of three components: upper blue rectangle, lower pink rectangle, and a triangular region.
A movable slider allows users to interactively adjust the position of a point on the graph.
Bending moments and shear forces are represented on the graph.
Responsive design ensures a consistent experience on various devices.

## Responsive Design

The graph has a responsive design that adapts to different screen sizes. Media queries are used to adjust the layout for smaller screens, providing an optimal viewing experience.

## Variables
1. **`ob2` (DOM element):**
   - Represents the DOM element with the id "canvas_1".
   - Obtained using `document.getElementById("canvas_1")`.

2. **`sfy, bmy, slider_y` (Numeric values):**
   - Initial values for specific y-coordinates used in the project.

3. **`two` (Two.js instance):**
   - Represents the Two.js drawing context.
   - Created with a specified height and appended to the DOM element `ob2`.

4. **`domian` (Instance of `eigenLine` class):**
   - Represents a line or graphical element on the canvas.
   - Created using the `eigenLine` class, which is presumably a custom class defined in the "line.js" file.
   - Parameters passed during creation: `two` (Two.js instance), coordinates for start and end points (50, 30, 420, 30), line thickness (4), color ("black").

5. **`load` (Instance of `eigenLine` class):**
   - Similar to `domian`, it represents another line or graphical element.
   - Created with additional parameters: an arrowhead ("arrow") and boolean values for specifying if the line is dashed or filled.

6. **`graph1, graph2, graph3` (Instances of `Graph` class):**
   - Represent graphs or paths on the canvas.
   - Created using the `Graph` class, which is presumably a custom class defined in the "graph.js" file.
   - Parameters passed during creation: `two` (Two.js instance), an array of `Two.Anchor` objects (`points1, points2, points3`), stroke color, fill color, opacity (0.5), and line thickness (4).

7. **`slider` (Instance of `eigenLine` class):**
   - Represents a line or slider on the canvas.
   - Similar to `domian`, created with specific coordinates, line thickness, and color.

8. **`sf_y_axis, sf_x_axis` (Instances of `eigenLine` class):**
   - Represent lines corresponding to the shear force diagram.
   - Created using the `eigenLine` class with specific coordinates and styling.

9. **`bm_y_axis, bm_x_axis` (Instances of `eigenLine` class):**
   - Represent lines corresponding to the bending moment diagram.
   - Similar to `sf_y_axis` and `sf_x_axis`, created with specific coordinates and styling.

10. **`points1` (Array of Two.js `Anchor` objects for the upper blue rectangle):**
    - Represents the vertices of the upper blue rectangle.
    - Each `Two.Anchor` object represents a point with x and y coordinates.
    - The rectangle is defined by the sequence of these points.

11. **`points2` (Array of Two.js `Anchor` objects for the lower pink rectangle):**
    - Represents the vertices of the lower pink rectangle.

12. **`points3` (Array of Two.js `Anchor` objects for the third triangular region):**
    - Represents the vertices of the third triangular region.

13. **`mouse` (Two.js `Vector`):**
    - Represents the current mouse position on the canvas.

14. **`yaxis, yaxis1, yaxis2` (Two.js `Line` objects):**
    - Vertical lines representing y-axes on the canvas.

15. **`xlabel1, xlabel3, pos` (Two.js `Text` objects):**
    - Text labels displayed on the canvas.

16. **`circle` (Two.js `Circle` object):**
    - Represents a draggable circle on the canvas.

# Functions

## `touchstart(e)`
- **Description:**
  - Event handler for the "touchstart" event.
  - Prevents the default touch behavior.
  - Retrieves the touch information and calls `pointerdown(touch)`.

## `touchmove(e)`
- **Description:**
  - Event handler for the "touchmove" event.
  - Prevents the default touch behavior.
  - Retrieves the touch information and calls `pointermove(touch)`.

## `touchend(e)`
- **Description:**
  - Event handler for the "touchend" event.
  - Prevents the default touch behavior.
  - Calls `pointerup()` to handle the touch end event.

## `pointerdown(e)`
- **Description:**
  - Event handler for the "pointerdown" event.
  - Adds event listeners for mouse move and mouse up events to enable dragging functionality.

## `pointermove(e)`
- **Description:**
  - Event handler for the mouse move event.
  - Updates the `mouse` vector with the current mouse position.
  - Ensures that the x-coordinate of the mouse is within the canvas boundaries (50 to 420).
  - Updates the position of the vertical line (`yaxis`), the draggable circle (`circle`), and adjusts relevant points of the paths (`points1`, `points2`, `points3`).
  - Updates the rendering with `two.update()`.

## `pointerup(e)`
- **Description:**
  - Event handler for the mouse up event.
  - Removes the mouse move event listener to stop tracking movement.

## `getOffset(el)`
- **Description:**
  - Takes a DOM element as a parameter.
  - Calculates the offset of the element relative to the window, accounting for scrolling.
  - Returns an object with `left` and `top` properties representing the offset.

**Note:**
- These functions are designed to handle touch and mouse events for interactive manipulation of the graph.
- The `pointermove` function, in particular, plays a crucial role in updating the graph elements and rendering in response to user interaction.


## Touch Events

The project includes touch event handling for mobile devices, allowing users to interact with the graph using touch gestures.

## Contributing

Feel free to contribute to this project by submitting bug reports, feature requests, or code improvements. Follow the provided contribution guidelines in the readme.

## License

This project is licensed under the MIT License.
