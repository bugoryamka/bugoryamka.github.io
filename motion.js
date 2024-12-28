// motion.js
function handleWASDInput(targetPosition, movementSpeed) {
  let moveX = 0;
  let moveY = 0;

  if (keyIsDown(87)) { // W key (up)
    moveY -= 1;
  }
  if (keyIsDown(83)) { // S key (down)
    moveY += 1;
  }
  if (keyIsDown(65)) { // A key (left)
    moveX -= 1;
  }
  if (keyIsDown(68)) { // D key (right)
    moveX += 1;
  }

  // Normalize the movement vector to ensure consistent speed in all directions
  let movement = createVector(moveX, moveY).normalize().mult(movementSpeed * deltaTime / 1000);

  // Update the target position based on input
  targetPosition.add(movement);
}