// secondOrder.js
class SecondOrderDynamics {
  constructor(f, z, r, x0) {
    // Store parameters
    this.f = f;
    this.z = z;
    this.r = r;
    this.x0 = x0.copy();

    // Initialize state variables
    this.xp = x0.copy(); // Previous input
    this.y = x0.copy();  // Current position
    this.yd = createVector(0, 0); // Current velocity

    // Compute dynamics constants (handle edge cases)
    this.computeConstants();
  }

  computeConstants() {
    if (this.f === 0) {
      // If frequency is zero, the system does not respond
      this.k1 = 0;
      this.k2 = 0;
      this.k3 = 0;
    } else {
      // Compute dynamics constants
      this.k1 = this.z / (PI * this.f);
      this.k2 = 1 / ((2 * PI * this.f) * (2 * PI * this.f));
      this.k3 = (this.r * this.z) / (2 * PI * this.f);
    }
  }

  update(T, x, xd = null) {
    if (this.f === 0) {
      // If frequency is zero, the system remains at its initial position
      this.y = this.x0.copy();
      return this.y.copy();
    }

    // Estimate velocity if not provided
    if (xd === null) {
      xd = p5.Vector.sub(x, this.xp).div(T);
    }
    this.xp = x.copy();

    // Integrate position by velocity
    this.y.add(p5.Vector.mult(this.yd, T));

    // Integrate velocity by acceleration
    let acceleration = p5.Vector.sub(x, this.y)
      .add(p5.Vector.mult(xd, this.k3))
      .sub(p5.Vector.mult(this.yd, this.k1))
      .div(this.k2);
    this.yd.add(p5.Vector.mult(acceleration, T));

    return this.y.copy();
  }

  setParameters(f, z, r) {
    // Update parameters and recompute constants
    this.f = f;
    this.z = z;
    this.r = r;
    this.computeConstants();
  }
}