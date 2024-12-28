// graph.js
function drawGraph(targetHistory, currentHistory) {
  // Draw the visualization box on the right
  let graphWidth = 250; // Decreased size
  let graphHeight = 150; // Decreased size
  let graphX = width - graphWidth - 50; // Shifted 100 pixels to the left
  let graphY = height - graphHeight - 20;

  // Draw the graph background with rounded corners
  fill(255);
  noStroke(); // Remove the black frame
  rect(graphX, graphY, graphWidth, graphHeight, 12); // Rounded corners with radius 12

  // Draw the x, y history of the red ball (target position)
  noFill();
  stroke(234, 67, 53); // Google red
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < targetHistory.length; i++) {
    let x = map(i, 0, targetHistory.length, graphX, graphX + graphWidth);
    let y = map(targetHistory[i].y, 0, height, graphY + graphHeight, graphY);
    vertex(x, y);
  }
  endShape();

  // Draw the x, y history of the blue ball (current position)
  noFill();
  stroke(66, 133, 244); // Google blue
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < currentHistory.length; i++) {
    let x = map(i, 0, currentHistory.length, graphX, graphX + graphWidth);
    let y = map(currentHistory[i].y, 0, height, graphY + graphHeight, graphY);
    vertex(x, y);
  }
  endShape();
}