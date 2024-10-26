let G = 6.67408e-11; //N*m^2/kg^2

class Particle {
  constructor(x, y, r, mass, color = "#FFFFFF") {
    this.pos = createVector(x, y);
    this.posPx = createVector(x * SCALE, y * SCALE * -1);
    this.r = r;
    this.vel = createVector(0, 0);
    this.accel = createVector(0, 0);
    this.force = createVector(0, 0);
    this.mass = mass; //KG
    this.color = color;
  }
  update(deltaTime) {
    this.calcAc();
    this.calcVel(deltaTime);
    this.calcPos(deltaTime);
  }
  calcAc() {
    this.accel = p5.Vector.div(this.force, this.mass);
  }
  calcVel(deltaTime) {
    this.vel.add(p5.Vector.mult(this.accel, deltaTime));
  }
  calcPos(deltaTime) {
    this.pos.add(p5.Vector.mult(this.vel, deltaTime));
    this.posPx = createVector(this.pos.x * SCALE, this.pos.y * SCALE * -1);
  }
  calcGravForce(planet) {
    let Ft =
      (G * this.mass * planet.mass) /
      p5.Vector.sub(this.pos, planet.pos).magSq();
    angleMode(DEGREES);
    let angle = p5.Vector.sub(planet.pos, this.pos).heading();
    //console.log(Ft, angle);

    this.force.add(createVector(Ft * cos(angle), Ft * sin(angle)));
  }

  draw(deltaTime) {
    this.update(deltaTime);
    fill(this.color);
    circle(
      this.posPx.x,
      this.posPx.y,
      this.r * (this.mass == 1.989e30 ? SUN_MULTSIZE : MULTSIZE) * SCALE,
    );
    fill(255);
  }
  showStats() {
    text("ForceX: " + this.force.x + " N", 10 - 260, 40 - 260);
    text("ForceY: " + this.force.y + " N", 10 - 260, 55 - 260);
    text("AccelX: " + this.accel.x.toFixed(7) + " m/s^2", 10 - 260, 70 - 260);
    text("AccelY: " + this.accel.y.toFixed(7) + " m/s^2", 10 - 260, 85 - 260);
    text("VelX: " + this.vel.x + " m/s", 10 - 260, 100 - 260);
    text("VelY: " + this.vel.y + " m/s", 10 - 260, 115 - 260);
    text("PosX: " + this.pos.x + " m", 10 - 260, 130 - 260);
    text("PosY: " + this.pos.y + " m", 10 - 260, 145 - 260);
  }
}
