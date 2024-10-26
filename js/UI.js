function showTime() {
  textSize(20);
  text(
    (time / 3600 / 24).toFixed(2) + " days",
    -width / 2 + 50,
    -height / 2 + 50,
  );

  text(
    (time / 3600 / 24 / 365.25).toFixed(2) + " years",
    -width / 2 + 50,
    -height / 2 + 100,
  );
}

function showStats() {
  textSize(20);
  text(
    "Simulation speed: " + ((dt * 60) / 3600 / 24).toFixed(2) + " days/sec",
    -width / 2 + 50,
    -height / 2 + 150,
  );
  text("Size multiplier: ", -width / 2 + 50, -height / 2 + 200);
  text("Sun size multiplier: ", -width / 2 + 50, -height / 2 + 250);
  text("Zoom: ", -width / 2 + 50, -height / 2 + 300);
}

function initSliders() {
  let speedSlider = createSlider(sqrt(1 / frameRate), sqrt(2e6), sqrt(dt));
  speedSlider.size(200);
  speedSlider.position(370, 182);
  speedSlider.input(() => {
    dt = speedSlider.value() * speedSlider.value();
  });
  let zoomSlider = createSlider(5e-11 * 1e12, 1e-8 * 1e12, SCALE * 1e12);
  zoomSlider.size(200);
  zoomSlider.position(120, 330);
  zoomSlider.input(() => {
    SCALE = zoomSlider.value() / 1e12;
  });
}

function initTextBox() {
  let sizeBox = createInput();
  sizeBox.size(100);
  sizeBox.position(200, 230);
  sizeBox.value(MULTSIZE);
  sizeBox.input(() => {
    MULTSIZE = parseFloat(sizeBox.value());
  });
  let sunSizeBox = createInput();
  sunSizeBox.size(100);
  sunSizeBox.position(230, 280);
  sunSizeBox.value(SUN_MULTSIZE);
  sunSizeBox.input(() => {
    SUN_MULTSIZE = parseFloat(sunSizeBox.value());
  });
}

function UI() {
  showTime();
  showStats();
}
