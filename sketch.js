let time = 0,
  dt = 1e5;
let SCALE = 1e-9; /* 5e-11 */
let MULTSIZE = 3000;
let SUN_MULTSIZE = 10;
let celestialBodies = [];

function setup() {
  createCanvas(windowWidth, windowHeight - 50);

  initSliders();
  initTextBox();

  sun = new Particle(0, 0, 695700e3, 1.989e30, "#FFD700");
  mercury = new Particle(57909050e3, 0, 2439.7e3, 3.285e24, "#FFA500");
  mercury.vel = createVector(0, 47362);
  venus = new Particle(108208000e3, 0, 6051.8e3, 4.867e24, "#FF6347");
  venus.vel = createVector(0, 35020);
  earth = new Particle(149600000e3, 0, 6371e3, 5.972e24, "#00FFFF");
  earth.vel = createVector(0, 29783);
  moon = new Particle(
    149600000e3 + 384400e3,
    0,
    1737.1e3,
    7.34767309e22,
    "#FFFFFF",
  );
  moon.vel = createVector(0, 29783 + 1022);
  mars = new Particle(227939100e3, 0, 3389.5e3, 6.39e23, "#FF0000");
  mars.vel = createVector(0, 24007);
  jupiter = new Particle(778500000e3, 0, 69911e3, 1.898e27, "#FFA500");
  jupiter.vel = createVector(0, 13070);
  saturn = new Particle(1433000000e3, 0, 58232e3, 5.683e26, "#FFD700");
  saturn.vel = createVector(0, 9670);
  uranus = new Particle(2877000000e3, 0, 25362e3, 8.681e25, "#00FFFF");
  uranus.vel = createVector(0, 6810);
  neptune = new Particle(4503000000e3, 0, 24622e3, 1.024e26, "#0000FF");
  neptune.vel = createVector(0, 5430);
  pluto = new Particle(5906000000e3, 0, 1188.3e3, 1.309e22, "#FFFFFF");
  pluto.vel = createVector(0, 4748);

  celestialBodies = [
    sun,
    mercury,
    venus,
    earth,
    moon,
    mars,
    jupiter,
    saturn,
    uranus,
    neptune,
    pluto,
  ];
}

function draw() {
  translate(width / 2, height / 2);
  background(0);
  stroke(255);
  fill(255);

  updateSystem();
  UI();
}

function updateSystem() {
  time += dt;
  for (let i = 0; i < celestialBodies.length; i++) {
    for (let j = 0; j < celestialBodies.length; j++) {
      if (i != j) {
        celestialBodies[i].calcGravForce(celestialBodies[j]);
      }
    }
  }
  for (let i = 0; i < celestialBodies.length; i++) {
    celestialBodies[i].draw(dt);

    celestialBodies[i].force = createVector(0, 0);
  }
}
