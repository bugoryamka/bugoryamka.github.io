let system;
let targetPosition;
let currentPosition;
let movementSpeed = 200;
let fSlider, zSlider, rSlider; // Sliders for parameters
let targetHistory = []; // Stores the history of the red ball (target position)
let currentHistory = []; // Stores the history of the blue ball (current position)

// Store the previous values of the sliders
let prevFValue, prevZValue, prevRValue;

function setup() {
  const canvas = createCanvas(800, 600);
  canvas.parent('sketch');

  // Get slider elements
  fSlider = document.getElementById('fSlider');
  zSlider = document.getElementById('zSlider');
  rSlider = document.getElementById('rSlider');

  // Initialize the second-order system with slider values
  let initialPosition = createVector(width / 2, height / 2);
  system = new SecondOrderDynamics(
    parseFloat(fSlider.value),
    parseFloat(zSlider.value),
    parseFloat(rSlider.value),
    initialPosition
  );

  // Initialize target and current positions
  targetPosition = initialPosition.copy();
  currentPosition = initialPosition.copy();

  // Store initial slider values
  prevFValue = parseFloat(fSlider.value);
  prevZValue = parseFloat(zSlider.value);
  prevRValue = parseFloat(rSlider.value);

}

function draw() {
  background(240);


  // Update the system with the target position
  currentPosition = system.update(deltaTime / 1000, targetPosition);

  // Constrain positions to stay within the canvas
  targetPosition.x = constrain(targetPosition.x, 0, width);
  targetPosition.y = constrain(targetPosition.y, 0, height);
  currentPosition.x = constrain(currentPosition.x, 0, width);
  currentPosition.y = constrain(currentPosition.y, 0, height);

  // Add the current and target positions to their histories
  targetHistory.push(targetPosition.copy());
  currentHistory.push(currentPosition.copy());
  if (targetHistory.length > 200) {
    targetHistory.splice(0, 1); // Keep the history length fixed
    currentHistory.splice(0, 1);
  }

  // Draw the target position (red circle)
  fill(234, 67, 53); // Google red
  noStroke();
  ellipse(targetPosition.x, targetPosition.y, 20, 20);

  // Draw the current position (blue circle)
  fill(66, 133, 244); // Google blue
  noStroke();
  ellipse(currentPosition.x, currentPosition.y, 30, 30);

  // Handle WASD input to update the target position
  handleWASDInput(targetPosition, movementSpeed);

  // Draw the x, y graph in the right visualization box
  drawGraph(targetHistory, currentHistory);
}